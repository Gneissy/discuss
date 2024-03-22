"use client";

import { createTopic } from "@/actions";
import { Button, Popover, PopoverContent, PopoverTrigger, Input } from "@nextui-org/react";
import { useFormState } from "react-dom";

export default function TopicCreateForm(){

    const [formState, action] = useFormState(createTopic, {
        errors: {}
    });

    return (
        <>
            <Popover placement="left-start">
                <PopoverTrigger>
                    <Button color="primary"> Create Topic </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="p-4">
                        <form action = { action } className = "flex flex-col gap-4">
                            <Input 
                                name = "slug" 
                                label = "Name" 
                                labelPlacement = "outside" 
                                placeholder= "Javascript" 
                                isInvalid = {!!formState.errors.slug}
                                errorMessage = {formState.errors.slug?.join(", ")}
                            />
                            <Input 
                                name = "description" 
                                label = "Description" 
                                labelPlacement = "outside" 
                                placeholder= "A programming language" 
                                isInvalid = {!!formState.errors.description}
                                errorMessage = {formState.errors.description?.join(", ")}
                            />

                            {formState.errors._form 
                            ? <div className = "border border-red-400 bg-red-200 p-2 rounded"> 
                                {formState.errors._form?.join(", ")} 
                            </div> 
                            : null}

                            <Button type = "submit" color="secondary"> Create </Button>
                        </form>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
}
