import supertest from "supertest";
import app from "../index";

const Request = supertest(app);

describe("test endpoint res", () => {
  it("get the endpoint", async () => {
    const Response = await Request.get("/");
    expect(Response.status).toBe(200);
  });
});
