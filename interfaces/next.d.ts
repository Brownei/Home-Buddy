import { NextApiRequest } from "next";
import { JwtPayload } from "jsonwebtoken";

type User = string

declare module 'next' {
    interface NextApiRequest {
        user: User | JwtPayload
    }
}