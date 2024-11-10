import { getAuthenticatedServerApp } from "./lib/firebase/serverApp";

export default async function Home() {
    const { currentUser } = await getAuthenticatedServerApp();

    return (
        <main className="flex min-h-screen gap-2">
            <h1 className="text-4xl font-semibold m-10 dark:text-white">Welcome, {currentUser?.displayName}</h1>
        </main>
    );
}
