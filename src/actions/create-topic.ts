"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

interface CreateTopicFormState{
    errors: {
        slug?: string[],
        description?: string[],
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
    const result = createTopicSchema.safeParse({
        slug: formData.get("slug"),
        description: formData.get("description")
    });

    if (result.success) {}
    else {
        return {
            errors: result.error.flatten().fieldErrors
        };
    }

    return {
        errors: {}
    }


    //TODO Revalidate homepage
}


