import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  // callbacks: {
    // async session({ session, user, token }) {
    //     // if (session.user) session.user.id = user.id
    //     return user.id
    //   },
    //   // async redirect({ url, baseUrl }) { return baseUrl },
    // },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
})