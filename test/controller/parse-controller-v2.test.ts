import request from "supertest";
import app from "../../src/app";
import { WRONG_INPUT_EXAMPLES } from "./parse-controller-v1.test";

describe("POST /parse/v2", () => {
    it("should return 200 OK", () => {
        return request(app)
            .post("/parse/v2")
            .send({
                data: "JOHN0000MICHAEL0009994567"
            })
            .expect(200)
            .expect({
                statusCode: 200,
                data: {
                    firstName: "JOHN",
                    lastName: "MICHAEL",
                    clientId: "999-4567"
                }
            });
    });
    it("should return 400 when no body provided", () => {
        return request(app)
            .post("/parse/v1")
            .expect(400)
            .expect({ statusCode: 400 });
    });
    test.each(WRONG_INPUT_EXAMPLES)("should return 400 when wrong data format provided %s", (data) => {
        return request(app)
            .post("/parse/v1")
            .send({ data })
            .expect(400)
            .expect({ statusCode: 400 });
    });
});
