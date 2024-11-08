import { onAuthStateChanged as _onAuthStateChanged, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "@/app/lib/firebase/config";
import { User } from "firebase/auth";

export function onAuthStateChanged(cb: (user: User | null) => void) {
    return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithRedirect(auth, provider);
    }
    catch (error) {
        console.error(`Error signing in with Google: ${error}`);
    }
}

export async function signOut() {
    try {
        await auth.signOut();
    }
    catch (error) {
        console.error(`Error signing out: ${error}`);
    }
}