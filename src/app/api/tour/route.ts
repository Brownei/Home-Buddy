import { NextApiRequest, NextApiResponse } from "next";
import redisClient from "@/lib/redis";
import { connectToDB } from "@/lib/database";
import logger from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";


export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const redisKey = 'tour'
    const session = await getServerSession(authOptions)
    let results;

    if (!session) {
        return NextResponse.json({ message: "You must be logged in." }, { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            email: session.user.email!
        }
    })

    if(owner?.role === 'CLIENT') {
        return NextResponse.json({ message: "Only an agent can view his/her tours!" }, { status: 401});
    }

    try {
        if(redisClient) {
            logger.info('Cache Hit!');
            const cachedResults = await redisClient.get(redisKey);
            
            if(cachedResults) {
                results = JSON.parse(cachedResults);
            } 
        }

        logger.info('Cache Miss!');
        await connectToDB()

        const tours = await prisma.property.findMany({
            where: {
                agentId: owner!.id
            }, include: {
                tours: true
            }
        })
        results = tours

        if(redisClient) {
            logger.info('Tours are cached!');
            await redisClient.set(redisKey, JSON.stringify(results),  "EX", 60 * 60 * 2);
        }

        return NextResponse.json(results)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}


export async function POST(req: NextApiRequest, res: NextApiResponse) {
    await connectToDB()
    const session = await getServerSession(authOptions)
    const {propertyId} = req.body
    
    if (!session) {
        return NextResponse.json({ message: "You must be logged in." }, { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            email: session.user.email!
        }
    })

    if(owner?.role === 'AGENT') {
        return NextResponse.json({ message: "You cannot book a tour in your own property!" }, { status: 401});
    }

    try {
        const existingTour = await prisma.tour.findFirst({
            where: {
                userId: owner!.id,
            }
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