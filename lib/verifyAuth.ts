import { AuthPayload } from "@/interfaces/auth";
import { jwtVerify } from "jose"

export function getJwtSecretKey() {
    const secret = process.env.JWT_SECRET as string
    if(!secret || secret.length === 0) {
        throw new Error('JWT secret key is missing!')
    }
    return secret;
}

export const verifyAuth = async (token: string) => {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))
        console.log(verified.payload)
        return verified.payload as AuthPayload
    } catch (error) {
        throw new Error('Your token has expired!')
    }
}