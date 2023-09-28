import { JWTPayload, jwtVerify } from "jose"

function getJwtSecretKey() {
    const secret = process.env.JWT_SECRET as string
    if(!secret || secret.length === 0) {
        throw new Error('JWT secret key is missing!')
    }
    return secret;
}

export const verifyAuth = async (token: string) => {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))
        return verified.payload as JWTPayload
    } catch (error) {
        throw new Error('Your token has expired!')
    }
}