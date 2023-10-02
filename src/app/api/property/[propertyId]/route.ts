import redisClient from "@/lib/redis";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "@/lib/logger";
import { connectToDB } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { Features } from "@prisma/client";
import { verifyAuth } from "@/lib/verifyAuth";

export async function GET(req: NextApiRequest, { params }: { params: { propertyId: string } }) {
    const id = params.propertyId
    let result;

    try {
        await connectToDB()
        const property = await prisma.property.findUnique({
            where: {
                id
            }
        })

        if(!property) {
            return NextResponse.json({ message: "No such property found!"}, {status: 404})
        }
        result = property

        return NextResponse.json(result)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { laptopId: string } }) {
    await connectToDB()
    
    const token = req.cookies.get('jwt')?.value
    const userDetails = await verifyAuth(token!)
    const id = params.laptopId
    const {name, about, location, features, price, images} = await req.json()

    if (!userDetails || !token) {
        return NextResponse.json({ message: "You must be logged in." }, { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            email: userDetails.email as string
        }
    })

    if(owner?.role === 'AGENT') {
        return NextResponse.json({ message: "Only an agent can create a new property!" }, { status: 401});
    }

    try {
        const existingProperty = await prisma.property.findUnique({
            where: {
                agentId: owner!.id,
                id
            }
        })

        if(!existingProperty) {
            return NextResponse.json({ message: "No such property found!"}, {status: 404})
        }

        const updateProperty = await prisma.property.update({
            where: {
                id
            }, 
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
        logger.info('Property updated!')
        return NextResponse.json(updateProperty, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }

}


export async function DELETE(req: NextRequest, { params }: { params: { propertyId: string } }) {
    await connectToDB()
    const token = req.cookies.get('jwt')?.value
    const userDetails = await verifyAuth(token!)
    const id = params.propertyId

    if (!userDetails || !token) {
        return NextResponse.json({ message: "You must be logged in." }, { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            email: userDetails.email as string
        }
    })

    if(owner?.role === 'AGENT') {
        return NextResponse.json({ message: "Only an agent can create a new property!" }, { status: 401});
    }

    try {
        const existingProperty = await prisma.property.findUnique({
            where: {
                agentId: owner!.id,
                id
            }
        })
        if(!existingProperty) {
            return NextResponse.json({ message: "No such property found!"}, {status: 404})
        }

        await prisma.property.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ message: `${existingProperty.name} is successfully deleted!`})

    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}