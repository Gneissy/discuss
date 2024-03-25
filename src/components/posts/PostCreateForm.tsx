"use client";

import { createPost } from "@/actions";
import { Button, Popover, PopoverContent, PopoverTrigger, Input, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { FormButton } from "../common/FormButton";

export default function PostCreateForm(){
    const [formState, action] = useFormState(createPost, {
        errors: {}
    });

    return (
        <>
            <Popover placement="left-start">
                <PopoverTrigger>
                    <Button color="primary"> Create Post </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="p-4">
                        <form action = { action } className = "flex flex-col gap-4">
                            <Input 
                                name = "title" 
                                label = "Title" 
                                labelPlacement = "outside" 
                                placeholder= "Javascript" 
                                isInvalid = {!!formState.errors.title}
                                errorMessage = {formState.errors.title?.join(", ")}
                            />
                            <Textarea 
                                name = "content" 
                                label = "Content" 
                                labelPlacement = "outside" 
                                placeholder= "A programming language" 
                                isInvalid = {!!formState.errors.content}
                                errorMessage = {formState.errors.content?.join(", ")}
                            />

                            {formState.errors._form 
                            ? <div className = "border border-red-400 bg-red-200 p-2 rounded"> 
                                {formState.errors._form?.join(", ")} 
                            </div> 
                            : null}

                            {/* <Button type = "submit" color="secondary"> Create </Button> */}
                            <FormButton> Create </FormButton>
                            
                        </form>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
}