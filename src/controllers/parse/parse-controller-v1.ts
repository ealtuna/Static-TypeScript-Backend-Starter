import { JsonController, Param, Body, Get, Post, Put, Delete } from "routing-controllers";

import { ParseInput } from "./parse-input";
import { ParseController } from "./parse-controller";
import { Client } from "../../model/client";

export const FIRST_NAME_SUFFIX = "0000";
export const LAST_NAME_SUFFIX = "000";

@JsonController()
export class ParseControllerV1 implements ParseController {
    @Post("/parse/v1")
    parse(@Body({ required: true }) body: ParseInput): Client {
        const originalClient = body.parse();
        return new Client(
            originalClient.firstName + FIRST_NAME_SUFFIX,
            originalClient.lastName + LAST_NAME_SUFFIX,
            originalClient.clientId
        );
    }
}
