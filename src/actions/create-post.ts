"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { Post } from "@prisma/client";
import { z } from "zod";

interface CreatePostFormState{
    errors: {
        title?: string[],
        content?: string[],
        _form?: string[],
    }
}

const createPostSchema = z.object({
    title: z.string().min(3).regex(/^[a-z-]+$/, {message: "Only letters, minimum 3, dash allowed."}),
    content: z.string().min(10),
});

export async function createPost(
    formState: CreatePostFormState,
    formData: FormData
): Promise<CreatePostFormState>{
    
    // Validation schema via Zod
    const result = createPostSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content")
    });

    // Control if it's valid
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        };
    }

    // Control if user has an account
    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
               _form: ["You must be logged in for this action"],
            },
        }
    }

    // TODO Create action

    return {
        errors: {}
    }

    //TODO Revalidate topic show page
    //TODO Redirect to topic show page
}





// export async function createPost(){
    
//     //TODO Revalidate topic show page
// }