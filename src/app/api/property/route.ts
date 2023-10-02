import { NextApiRequest, NextApiResponse } from "next";
import redisClient from "@/lib/redis";
import { connectToDB } from "@/lib/database";
import logger from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Features, Review } from "@prisma/client";
import { jwtVerify } from "jose";
import { getJwtSecretKey, verifyAuth } from "@/lib/verifyAuth";
import { AuthPayload } from "@/interfaces/auth";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    let results;

    try {
        await connectToDB()
        const properties = await prisma.property.findMany()
        results = properties

        return NextResponse.json(results)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}


export async function POST(req: NextRequest, res: NextResponse) {
    await connectToDB()

    const token = req.cookies.get('jwt')?.value
    const userDetails = await verifyAuth(token!)
    const {name, about, location, price, images, availability, type, cooling, yearBuilt, street, parkingSpace, size, kitchenCabinet} = await req.json()
    
    if (!userDetails  || !token) {
        return NextResponse.json({ message: "You must be logged in." }, { status: 401});
    }

    if(!name || !about || !location || !price || !images ||!type || !size || !cooling || !yearBuilt || !street) {
        return NextResponse.json({ message: "Information Missing!" }, { status: 404});
    }

    try {
        const owner = await prisma.user.findUnique({
            where: {
                email: userDetails.email as string
            }
        })

        if(!owner) {
            return NextResponse.json({ message: "Not a user please register!" }, { status: 401});
        }
    
        if(owner?.role === 'CLIENT') {
            return NextResponse.json({ message: "Only an agent can create a new property!" }, { status: 401});
        }

        const agentId = owner.id
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
                features: {
                    availability: availability as boolean,
                    type: type as string,
                    cooling: cooling as string,
                    location: street as string,
                    parkingSpace: parkingSpace as boolean,
                    size: size as number,
                    kitchenCabinet: kitchenCabinet as boolean,
                    yearBuilt: yearBuilt as number
                },
                price: price as number,
                images: images.map((i: string) => (i)),
                agent: {
                    connect: {
                        id: agentId
                    }
                }
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