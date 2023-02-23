import { NextApiResponse, NextApiRequest, NextPageContext } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

import PrismaAdapter from "../../../libs/auth/prisma-adapter";

export function buildNextAuthOptions(
  req: NextApiRequest | NextPageContext["req"],
  res: NextApiResponse | NextPageContext["res"]
): NextAuthOptions {
  return {
    adapter: PrismaAdapter(req, res),
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_SECRET_ID ?? "",
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
            scope:
              "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar",
          },
        },
        profile(prof: GoogleProfile) {
          return {
            id: prof.sub,
            name: prof.name,
            username: "",
            email: prof.email,
            avatar_url: prof.picture,
          };
        },
      }),
      // ...add more providers here
    ],

    callbacks: {
      async signIn({ account }) {
        if (
          !account?.scope?.includes("https://www.googleapis.com/auth/calendar")
        ) {
          return "/register/connect-calendar/?error=permissions";
        }

        return true;
      },

      async session({ session, user }) {
        return {
          ...session,
          user,
        };
      },
    },
  };
}

//código extraído da docu NextAuthjs
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, buildNextAuthOptions(req, res));
}
