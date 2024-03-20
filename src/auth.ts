import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";

//? How PrismaAdapter works:
// Whenever someone signs in or signs up for the first time,
// we need to store some information in our database about them.
// So whenever user signs up for the very first time, 
// This Prisma adapter is going to automatically reaches our database, 
// and tries to create a new User record. 


const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;


if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) throw new Error("Github OAuth credentials cannot be found");



//? handlers are related to our OAuth setup. They're gonna be called automatically by GitHub servers when user trying to sign in
//? auth function is gonna allow us to figure out the user is signed in to app, inside React component
//? signOut and signIn functions are, you know.
//? We will use them in time.

export const { handlers: {GET, POST}, auth, signOut, signIn } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Github({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET
        })
    ],
    callbacks: {
        //? This is called whenever we try to verify who a user is
        //! In a normal NextAuth project, we will never need this again. 
        //! Here we fix a bug in NextAuth temporarily (They either fixed it or will fix soon)
        async session({ session, user}: any){
            if (session && user) session.user.id = user.id;
            return session;
        }
    }
});