import { ParseInput } from "./parse-input";
import { Client } from "../../model/client";

export interface ParseController {
    parse(body: ParseInput): Client;
}