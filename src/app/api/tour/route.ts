import { NextApiRequest, NextApiResponse } from "next";
import redisClient from "@/lib/redis";
import { connectToDB } from "@/lib/database";
import logger from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { verifyAuth } from "@/lib/verifyAuth";


export async function GET(req: NextRequest, res: NextApiResponse) {
    const token = req.cookies.get('jwt')?.value
    const userDetails = await verifyAuth(token!)
    let results;

    if (!userDetails || !token) {
        return NextResponse.json({ message: "You must be logged in." }, { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            email: userDetails.email as string
        }
    })

    if(owner?.role === 'CLIENT') {
        return NextResponse.json({ message: "Only an agent can view his/her tours!" }, { status: 401});
    }

    try {
        await connectToDB()

        const tours = await prisma.property.findMany({
            where: {
                agentId: owner!.id
            }, include: {
                tours: true
            }
        })
        results = tours

        return NextResponse.json(results)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}


export async function POST(req: NextRequest, res: NextApiResponse) {
    await connectToDB()
    const token = req.cookies.get('jwt')?.value
    const userDetails = await verifyAuth(token!)
    const {propertyId} = await req.json()
    
    if (!userDetails || !token) {
        return NextResponse.json({ message: "You must be logged in." }, { status: 401});
    }
    
    
    try {
        const owner = await prisma.user.findUnique({
            where: {
                email: userDetails.email as string
            }
        })

        if(owner?.role === 'AGENT') {
            return NextResponse.json({ message: "You cannot book a tour in your own property!" }, { status: 401});
        }

        const existingTour = await prisma.tour.findFirst({
            where: {
                userId: owner!.id,
            },
        })

        if(existingTour) {
            return NextResponse.json({ message: "You have already booked a tour, Thank you!"}, {status: 409})
        }

        const newTour = await prisma.tour.create({
            data: {
                propertyId: propertyId,
                userId: owner!.id
            }
        })
        logger.info('New tour created!')
        return NextResponse.json(newTour, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}