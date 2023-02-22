import supertest from "supertest";
import db from "../../database";
import UserModel from "../../models/user.model";
import User from "../../types/user.type";
import app from "../../index";

const userModel = new UserModel();
const req = supertest(app);
let token = "";

describe("Test User API endpoints", () => {
  const user = {
    email: "testo@test.com",
    user_name: "TestUser",
    first_name: "Test",
    last_name: "User",
    password: "test123",
  } as User;

  beforeAll(async () => {
    const createUser = await userModel.createuser(user);
    user.id = createUser.id;
  });
  afterAll(async () => {
    const connection = await db.connect();
    const sql = `DELETE FROM users;`;
    await connection.query(sql);
    connection.release();
  });

  describe("Test Authenticate method ", () => {
    it("should be able to authenticate to get token", async () => {
      const res = await req
        .post("/api/users/authenticate")
        .set("Content-type", "application/json")
        .send({
          email: "testo@test.com",
          password: "test123",
        });
      expect(res.status).toBe(200);
      const { id, email, token: userToken } = res.body.userInfo;
      expect(id).toBe(user.id);
      expect(email).toBe("testo@test.com");
      token = userToken;
    });

    it("should be failed to authenticate whith wrong email", async () => {
      const res = await req
        .post("/api/users/authenticate")
        .set("Content-type", "application/json")
        .send({
          email: "wrong@test.com",
          password: "test123",
        });
      expect(res.status).toBe(404);
    });
  });
  describe("Test CRUD API method for users", () => {
    it("should create new user", async () => {
      const res = await req
        .post("/api/users/")
        .set("Content-type", "application/json")
        .send({
          email: "test2@test2.com",
          user_name: "test2user",
          first_name: "Test2",
          last_name: "User2",
          password: "test123",
        } as User);
      expect(res.status).toBe(200);
      const { email, user_name, first_name, last_name } = res.body.userInfo;
      expect(email).toBe("test2@test2.com");
      expect(user_name).toBe("test2user");
      expect(first_name).toBe("Test2");
      expect(last_name).toBe("User2");
    });

    it("should get list of users", async () => {
      const res = await req
        .get("/api/users/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);

      expect(Object.keys(res.body.users).length).toBe(2);
    });

    it("should get user info ", async () => {
      const res = await req
        .get(`/api/users/${user.id}`)
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.userInfo.user_name).toBe("TestUser");
      expect(res.body.userInfo.email).toBe("testo@test.com");
    });
  });
});
