import { Request } from "express";

declare global {
    export interface CustomRequest extends Request {
        uid:string;
    }
}