"use client";

import { useSession } from "next-auth/react";

export function Test(){
    const session = useSession();

    return(
        <>
            {session.data?.user
            ? <p>Çardasın</p>
            : <p>Çarda değilsin</p>
            }
        </>
    );
}