import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next/types";
import { NextRequest } from "next/server";
import { connectToDB } from "@/lib/database";
import logger from "@/lib/logger";
import { hashSync } from "bcrypt-ts";

export async function POST(req: NextRequest) {
    const {fullName, email, password: pass} = await req.json()

    try {
        await connectToDB()

        if(!pass) {
            return NextResponse.json({ message: 'Password is missing!'}, {status: 404})
        }

        if(!fullName) {
            return NextResponse.json({ message: 'Name is missing!'}, {status: 404})
        }

        if(!email) {
            return NextResponse.json({ message: 'Email is missing!'}, {status: 404})
        }
        
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
    
        if(existingUser) {
            return NextResponse.json({ message: 'You are already a user. Try and login!'}, {status: 409})
        }
    
        const hashedPassword = hashSync(pass, 10)
    
        const newUser = await prisma.user.create({
            data: {
                name: fullName as string,
                email: email as string,
                password: hashedPassword as string,
                role: 'CLIENT'
            }
        })
        logger.info('User created!')
        return NextResponse.json(newUser, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}