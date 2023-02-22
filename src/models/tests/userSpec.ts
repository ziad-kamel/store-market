import UserModel from "../user.model";
import db from "../../database";
import User from "../../types/user.type";

const userModel = new UserModel();

describe("User Model", () => {
  describe("Test method exists ", () => {
    it("should have an get Many Users method ", () => {
      expect(userModel.getUsers).toBeDefined();
    });

    it("should have a get One User method ", () => {
      expect(userModel.getOneUser).toBeDefined();
    });

    it("should have a create User method ", () => {
      expect(userModel.createuser).toBeDefined();
    });

    it("should have a Authenticated User method ", () => {
      expect(userModel.authenticateUser).toBeDefined();
    });
  });

  describe("Test User Model Logic", () => {
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

    it("create should return a new user ", async () => {
      const createdUser = await userModel.createuser({
        email: "testii@test.com",
        user_name: "TestUser",
        first_name: "Test",
        last_name: "User",
        password: "test123",
      } as User);

      expect(createdUser).toEqual({
        id: createdUser.id,
        email: "testii@test.com",
        user_name: "TestUser",
        first_name: "Test",
        last_name: "User",
      } as User);
    });

    it("Get Many method should return all available users in DB", async () => {
      const users = await userModel.getUsers();
      expect(users.length).toBe(2);
    });

    it("Get one Method should return testo when called with ID", async () => {
      const returnedUser = await userModel.getOneUser(user.id as string);
      expect(returnedUser.id).toBe(user.id);
      expect(returnedUser.email).toBe(user.email);
      expect(returnedUser.user_name).toBe(user.user_name);
      expect(returnedUser.first_name).toBe(user.first_name);
      expect(returnedUser.last_name).toBe(user.last_name);
    });
  });
});
