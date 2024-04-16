"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/path";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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
    slug: string,
    formState: CreatePostFormState,
    formData: FormData
): Promise<CreatePostFormState>{
    
    // Validation schema via Zod
    const result = createPostSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content")
    });

    // Control if input is valid
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

    
    // Check the topic and topic id
    const topic = await db.topic.findFirst({
        where: { slug }
    });
    if (!topic) {
        return {
            errors: {
                _form: ["There is no topic."],
            }
        }
    }

    // Create the Post
    let post: Post;
    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id,
            }
        });    
    } catch (err: unknown) {
        if (err instanceof Error){
            return {
                errors: {
                    _form: [err.message]
                }
            }
        }
        else {
            return {
                errors: {
                    _form: ["Something went wrong while creating a post."]
                }
            }
        }
    }

    // Revalidate topic show page
    revalidatePath(paths.topicShow(slug));

    // Redirect to post show page
    redirect(paths.postShow(slug, post.id));
}

