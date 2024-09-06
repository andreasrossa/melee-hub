/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { db } from "./server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "./server/db/schema";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Discord],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  callbacks: {
    signIn: ({ profile }) => {
      console.log(profile);
      return profile?.username === "reeno_ssbm";
    },
  },
});
