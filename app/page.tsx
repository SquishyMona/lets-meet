import { getAuthenticatedServerApp } from "./lib/firebase/serverApp";

export default async function Home() {
  const { currentUser } = await getAuthenticatedServerApp();
  console.log(currentUser);

    return (
        <main className="flex min-h-screen gap-2">
            <h1 className="text-4xl font-semibold m-10 dark:text-white">Welcome to {currentUser?.displayName}</h1>
        </main>
    );
}
