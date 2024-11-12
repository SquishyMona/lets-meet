import "server-only"

import { headers } from "next/headers"
import { initializeServerApp } from "firebase/app"
import { firebaseConfig } from "./config"
import { connectAuthEmulator, getAuth } from "firebase/auth";

export async function getAuthenticatedServerApp() {
    try {
        const authIdToken = headers().get("Authorization")?.split("Bearer ")[1];

        const firebaseServerApp = initializeServerApp(firebaseConfig, {
                authIdToken
            }
        );

        const auth = getAuth(firebaseServerApp);
        if (process.env.NODE_ENV === "development") {
            connectAuthEmulator(auth, "http://localhost:9099");
        }
        await auth.authStateReady();
        console.log(`Auth server user: ${auth.currentUser}`)

        return { firebaseServerApp, currentUser: auth.currentUser };
    }
    catch (error) {
        console.error("Error initializing server app: ", error);
        return { firebaseServerApp: null, currentUser: null };
    }
}