import { NextApiRequest, NextApiResponse } from "next";
import redisClient from "@/lib/redis";
import { connectToDB } from "@/lib/database";
import logger from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";


export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const redisKey = 'review'
    let results;

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
        const reviews = await prisma.review.findMany()
        results = reviews

        if(redisClient) {
            logger.info('Reviews are cached!');
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
    const {stars, experience, propertyId} = req.body
    
    if (!session) {
        return NextResponse.json({ message: "You must be logged in." }, { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            email: session.user.email!
        }
    })

    if(owner?.role === 'AGENT') {
        return NextResponse.json({ message: "You cannot give a review for your property yourself!" }, { status: 401});
    }

    try {
        const existingReview = await prisma.review.findFirst({
            where: {
                userId: owner!.id,
            }
        })

        if(existingReview) {
            return NextResponse.json({ message: "You have already made a review, Thank you!"}, {status: 409})
        }

        const newReview = await prisma.review.create({
            data: {
                stars: stars as number,
                experience: experience as string,
                propertyId: propertyId as string,
                userId: owner!.id
            }
        })
        logger.info('New review created!')
        return NextResponse.json(newReview, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}