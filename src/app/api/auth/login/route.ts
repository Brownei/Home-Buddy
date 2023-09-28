import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt-ts";
import logger from "@/lib/logger";
import { SignJWT } from "jose";


export async function POST(req: NextRequest, res: NextResponse) {
    const {email, password} = await req.json()
    const alg = "HS256"
    const signature = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
        if (!email || !password) {
            return NextResponse.json({ message: 'All fields are required' }, {status: 404})
        }
        
        const foundUser = await prisma.user.findFirst({
            where: {
                email
            }
        })
        
        if (!foundUser) {
            return NextResponse.json({ message: 'Unauthorized' }, {status: 409})
        }
        
        const match = await compare(password, foundUser.password!)
        
        if (!match) {
            return NextResponse.json({ message: 'Password incorrect!' }, {status: 409})
        }
        const token = await new SignJWT(foundUser).setProtectedHeader({ alg }).setExpirationTime("24h").sign(signature)
    
        const response =  NextResponse.json({foundUser}, {status: 200});

        response.cookies.set({
            name: 'jwt', 
            value: token,
            maxAge: 60 * 60 * 24,
            httpOnly: true
        });

        return response;
    } catch (error) {
        console.log(error)
        logger.info(error)
        return NextResponse.json({message: 'Error logging in!'})
    }
    
}