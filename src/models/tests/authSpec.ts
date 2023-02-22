import UserModel from "../user.model";
import db from "../../database";
import User from "../../types/user.type";

const userModel = new UserModel();

describe("Authentication Module", () => {
  describe("Test method exists", () => {
    it("should have an authentica user method", () => {
      expect(userModel.authenticateUser).toBeDefined();
    });
  });
  describe("Test Authentication Logic", () => {
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

    it("Authenticate method should return the Authenticated user ", async () => {
      const authenticateUser = await userModel.authenticateUser(
        user.email as string,
        user.password as string
      );
      expect(authenticateUser?.email).toBe(user.email);
      expect(authenticateUser?.user_name).toBe(user.user_name);
      expect(authenticateUser?.first_name).toBe(user.first_name);
      expect(authenticateUser?.last_name).toBe(user.last_name);
    });

    it("Authenticate method should return null for wrong user", async () => {
      const authenticateUser = await userModel.authenticateUser(
        "ziad@ziad.com",
        "apappapapa"
      );
      expect(authenticateUser).toBe(null);
    });
  });
});
