import { getAuth } from "firebase/auth";
import { firebaseServerApp, serverUser } from "./lib/firebase/serverApp";

export default async function Home() {
    const auth = getAuth(firebaseServerApp);

    return (
        <main className="flex min-h-screen gap-2">
            <h1 className="text-4xl font-semibold m-10 dark:text-white">Welcome, {auth.currentUser?.displayName}</h1>
        </main>
    );
}
