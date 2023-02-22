import bycrypt from "bcrypt";
import db from "../database";
import User from "../types/user.type";
import configuration from "../configuration";

const hashPassword = (password: string) => {
  const salt = parseInt(configuration.salt as string, 10);
  return bycrypt.hashSync(`${password}${configuration.pepper}`, salt);
};

class UserModel {
  async createuser(user: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO users (email, user_name, first_name, last_name, password) 
      values ($1, $2, $3, $4, $5) returning id, email, user_name, first_name, last_name`;
      const result = await connection.query(sql, [
        user.email,
        user.user_name,
        user.first_name,
        user.last_name,
        hashPassword(user.password),
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create (${user.user_name}), ${(error as Error).message}`
      );
    }
  }
  async getUsers(): Promise<User[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT id, email, user_name, first_name, last_name from users`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error at retriving users ${(error as Error).message}`);
    }
  }
  async getOneUser(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `SELECT id, email, user_name, first_name, last_name FROM users WHERE id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `could not find user ${id} , ${(error as Error).message}`
      );
    }
  }
  async authenticateUser(
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      const connection = await db.connect();
      const sql = `SELECT password FROM users WHERE email=$1`;
      const result = await connection.query(sql, [email]);

      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0];
        const validpassword = bycrypt.compareSync(
          `${password}${configuration.pepper}`,
          hashPassword
        );
        if (validpassword) {
          const userinfo = await connection.query(
            `SELECT id, email, user_name,first_name, last_name FROM users WHERE email=($1)`,
            [email]
          );
          return userinfo.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error(`unable to login: ${(error as Error).message}`);
    }
  }
}

export default UserModel;
