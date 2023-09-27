import { NextApiRequest, NextApiResponse } from "next";
import redisClient from "@/lib/redis";
import { connectToDB } from "@/lib/database";
import logger from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { Features, Review } from "@prisma/client";


export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const redisKey = 'property'
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
        const properties = await prisma.property.findMany()
        results = properties

        if(redisClient) {
            logger.info('Properties are cached!');
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
    const {name, about, location, features, price, images} = req.body
    
    if (!session) {
        return NextResponse.json({ message: "You must be logged in." }, { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            email: session.user.email!
        }
    })

    if(owner?.role === 'CLIENT') {
        return NextResponse.json({ message: "Only an agent can create a new property!" }, { status: 401});
    }

    try {
        const existingProperty = await prisma.property.findUnique({
            where: {
                agentId: owner!.id,
                name: name as string
            }
        })

        if(existingProperty) {
            return NextResponse.json({ message: "Existing property! Try adding another"}, {status: 409})
        }

        const newProperty = await prisma.property.create({
            data: {
                name: name as string,
                about: about as string,
                location: location as string,
                features: features as Features,
                price: price as number,
                images: images.map((i: string) => (i)),
                agentId: owner!.id
            }
        })
        logger.info('New property created!')
        return NextResponse.json(newProperty, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}