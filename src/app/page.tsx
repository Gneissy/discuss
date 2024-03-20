import { Button } from "@nextui-org/react";
import { signIn, signOut } from "@/actions";
import { auth } from "@/auth";
import { Test } from "@/components/test";

export default async function Home() {
    const session = await auth();

    return (
        <>
            <Button color = "danger" isLoading>
                Next UI Test
            </Button>

            {session?.user ? <p> Çardasın {JSON.stringify(session?.user)} </p> : <p> Çarda değilsin </p>}

            <form action = {signIn}>
                <Button type = "submit"> Giriş Yap </Button>
            </form>
            <form action = {signOut}>
                <Button type = "submit"> Çıkış Yap </Button>
            </form>

            <p>Bu da client component:</p>
            <Test />
        </>
    );
}
