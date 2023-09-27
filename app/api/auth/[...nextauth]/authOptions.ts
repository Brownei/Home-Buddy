import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../../lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "../../../../lib/database";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
        name: 'Credentials',
        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
        },

        async authorize(credentials) {
            await connectToDB()

            //Check if there is a email and password anywhere
            if(!credentials?.email || !credentials?.password) {
              console.log('No credentials')
              return null
            }

            //Check if there is a user
            const user = await prisma.user.findUnique({
              where: {
                email: credentials.email
              }
            })
            if(!user) {
              console.log('No admin with this email')
              return null
            }

            //Check if passwords match!
            const passwordMatch = await compare(credentials.password, user.password!)
            if(!passwordMatch) {
              console.log('Passwords do not match')
              return null
            }

            //Return the admin
            return user
        }
    })
  ],

  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({token, session}) {
      if(token) {
        session.user!.id = token.id
        session.user!.email = token.email
        session.user!.name = token.name
        session.user!.image = token.picture
        session.user!.role = token.role
      }

      return session;
    },

    async jwt({token, user}) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: token.email
        }
      })

      if(!existingUser) {
        token.id = user!.id
      }

      if(existingUser!.email === 'esitibrownson@gmail.com') {
        existingUser!.role = 'AGENT'
      }

      return {
        id: existingUser!.id,
        role: existingUser!.role,
        name: existingUser!.name,
        email: existingUser!.email,
        picture: existingUser!.image
      }
    }
  }
};