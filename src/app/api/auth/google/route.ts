import {LoginTicket, OAuth2Client, TokenPayload} from 'google-auth-library'
import { NextRequest, NextResponse } from 'next/server';
import { VerifyObjectTypes } from '@/interfaces/auth';
const controller = require('./controller');

const clientId = process.env.GOOGLE_CLIENT_ID as string;
const client = new OAuth2Client(clientId);

export async function POST(req: NextRequest, res: NextResponse) {
    const inputJSON = JSON.stringify(req.body);
    const parsedJSON = JSON.parse(inputJSON);
    const { tokenId } = parsedJSON;
    let verifyObject: VerifyObjectTypes = {idToken: '', audience: ''};

    verifyObject.audience = clientId
    verifyObject.idToken = tokenId

    const response = await client.verifyIdToken(verifyObject)


}


// .then((response: TokenPayload) => {
//     const { email_verified } = response.payload;
//     if (email_verified) {
//         controller.addUser(req, res, response.payload);
//     } else {
//         return NextResponse.json({ status: 403, message: 'Email Not Verified, use another method to login!' });
//     }
// });