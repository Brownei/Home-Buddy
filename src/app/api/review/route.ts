import { NextApiRequest, NextApiResponse } from "next";
import redisClient from "@/lib/redis";
import { connectToDB } from "@/lib/database";
import logger from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { verifyAuth } from "@/lib/verifyAuth";


export async function GET(req: NextApiRequest, res: NextApiResponse) {
    let results;

    try {
        await connectToDB()
        const reviews = await prisma.review.findMany()
        results = reviews

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
    const {stars, experience, propertyId} = await req.json()

    if(!stars || !experience || !propertyId) {
        return NextResponse.json({ message: "Missing Information." }, { status: 404});
    }
    
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
            return NextResponse.json({ message: "You cannot give a review for your property yourself!" }, { status: 401});
        }

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