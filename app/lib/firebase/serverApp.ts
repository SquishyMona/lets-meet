import "server-only"

import { headers } from "next/headers"
import { initializeServerApp } from "firebase/app"
import { firebaseConfig } from "./config"
import { connectAuthEmulator, getAuth } from "firebase/auth";

let emulatorsActive = false;

const authIdToken = headers().get("Authorization")?.split("Bearer ")[1];
console.log(`Auth ID token: ${authIdToken}`);
const firebaseServerApp = initializeServerApp(firebaseConfig, {
        authIdToken
    }
);
const auth = getAuth(firebaseServerApp);
if (process.env.NODE_ENV === "development" || !emulatorsActive) {
    connectAuthEmulator(auth, "http://localhost:9099");
    emulatorsActive = true;
}
await auth.authStateReady();
console.log(`Auth server user: ${auth.currentUser}`)

const serverUser = auth.currentUser;
export { firebaseServerApp, serverUser };