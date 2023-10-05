import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt-ts";
import logger from "@/lib/logger";
import { SignJWT } from "jose";
import { User } from "@/interfaces/auth";

export async function POST(req: NextRequest, res: NextResponse) {
    const {email, password} = await req.json()

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
    
        return NextResponse.json<User>({
            id: foundUser.id,
            name: foundUser.name!,
            email: foundUser.email!,
            role: foundUser.role,
            phoneNumber: foundUser.phoneNumber!,
            image: foundUser.image!,
            emailVerified: foundUser.emailVerified!
        }, {status: 200});
        
    } catch (error) {
        console.log(error)
        logger.info(error)
        return NextResponse.json({message: 'Error logging in!'})
    }
    
}