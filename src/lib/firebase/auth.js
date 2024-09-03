import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider, 
    OAuthProvider,
    signInWithRedirect,
    onAuthStateChanged as _onAuthStateChanged,
    signInWithPopup,
    } 
from "firebase/auth";
import { firebaseApp } from "./config";
import { removeSession } from "@/actions/auth-actions";

const auth = getAuth(firebaseApp);

export function onAuthStateChanged(cb) {
	return _onAuthStateChanged(auth, cb);
}

export const signUpWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const signInWithEmail = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const authWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const authWithMicrosoft = async () => {
    const provider = new OAuthProvider('microsoft.com');
    try {
        await signInWithRedirect(auth, provider);
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const signOut = async () => {
    try {
        await auth.signOut();
        await removeSession();
    } catch (error) {
        console.log(error);
        return error;
    }
}