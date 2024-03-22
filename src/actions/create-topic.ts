"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import paths from "@/path";

interface CreateTopicFormState{
    errors: {
        slug?: string[],
        description?: string[],
        _form?: string[],
    }
}

const createTopicSchema = z.object({
    slug: z.string().min(3).regex(/^[a-z-]+$/, {message: "Only letters, minimum 3, dash allowed."}),
    description: z.string().min(10),
});

//? FormState is automatically added as first argument
export async function createTopic(
    formState: CreateTopicFormState, 
    formData: FormData)
    : Promise<CreateTopicFormState>{

    // Validation schema via Zod
    const result = createTopicSchema.safeParse({
        slug: formData.get("slug"),
        description: formData.get("description")
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

    // Create action
    let topic : Topic;
    try {
        topic = await db.topic.create({
            data: {
                slug: result.data.slug,
                description: result.data.description,
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
                    _form: ["Something went wrong."]
                }
            }
        }
    }

    // Revalidate and Redirect
    revalidatePath("/");
    redirect(paths.topicShow(topic.slug));
}


