import { Post, Body, JsonController, BadRequestError } from "routing-controllers";

import { ParseController } from "./parse-controller";
import { ParseInput } from "./parse-input";
import { Client } from "../../model/client";

@JsonController()
export class ParseControllerV2 implements ParseController {
    @Post("/parse/v2")
    parse(@Body({ required: true }) body: ParseInput): Client {
        const client = body.parse();
        const [, id0, id1] = client.clientId.match(/(\d{3})(\d{4})/);
        if (!id0 || !id1) {
            throw new BadRequestError("Incorrect clientId component format");
        }
        return new Client(
            client.firstName,
            client.lastName,
            `${id0}-${id1}`
        );
    }
}