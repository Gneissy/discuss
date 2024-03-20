"use server";

import * as auth from "@/auth";

export async function signIn(){
    return auth.signIn("github");
} 

//? signIn("github")
// This might be google, github, facebook etc.