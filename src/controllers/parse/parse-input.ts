import { Matches } from "class-validator";
import { BadRequestError } from "routing-controllers";

import { Client } from "../../model/client";

export const DATA_FORMAT = /^(\D+)0000(\D+)000(\d{7})$/;

export class ParseInput {
    @Matches(DATA_FORMAT)
    data: string;

    public parse(): Client {
        const [, firstName, lastName, clientId] = this.data.match(DATA_FORMAT);
        if (!firstName || !lastName || !clientId) {
            throw new BadRequestError("Incorrect data format");
        }
        return new Client(firstName, lastName, clientId);
    }
}