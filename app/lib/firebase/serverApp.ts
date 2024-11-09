import "server-only"

import { headers } from "next/headers"
import { initializeServerApp } from "firebase/app"
import { firebaseConfig } from "./config"
import { getAuth } from "firebase/auth";

export async function getAuthenticatedServerApp() {
    try {
        const idToken = headers().get("Authorization")?.split("Bearer ")[1];
        console.log(`Auth server idToken: ${idToken}`);

        const firebaseServerApp = initializeServerApp(
            firebaseConfig, 
            idToken ? {
                authIdToken: idToken
            } : {}
        );

        const auth = getAuth(firebaseServerApp);
        await auth.authStateReady();
        console.log(`Auth server user: ${auth.currentUser}`)

        return { firebaseServerApp, currentUser: auth.currentUser };
    }
    catch (error) {
        console.error("Error initializing server app: ", error);
        return { firebaseServerApp: null, currentUser: null };
    }
}