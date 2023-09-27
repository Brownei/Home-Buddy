import type { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/login"
  },

  callbacks: {
    async jwt({token, user}) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: token.email!
        }
      })
      
      if(!existingUser) {
        token.id = user!.id
      }
      
      if(existingUser!.email === 'esitibrownson@gmail.com' || existingUser!.email === '') {
        existingUser!.role = 'AGENT'
      }
      
      return {
        ...token,
        ...user
      }
    },


    async session({token, session}) {
      if(token) {
        session.user = token
      }

      return session;
    },

    redirect() {
      return '/admin'
    }
  }
};