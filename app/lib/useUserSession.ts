import { useEffect } from "react";
import { onAuthStateChanged } from "./firebase/auth";
import { firebaseConfig } from "./firebase/config";

export function useUserSession(user: any) {
    // Register the service worker that sends auth state back to server
    // The service worker is built with npm run build-service-worker
    useEffect(() => {
      if ("serviceWorker" in navigator) {
        const serializedFirebaseConfig = encodeURIComponent(
          JSON.stringify(firebaseConfig)
        );
        const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`;
  
        navigator.serviceWorker
          .register(serviceWorkerUrl, { scope: "/", updateViaCache: "none" })
          .then((registration) => {
            console.log("scope is: ", registration.scope);
            registration.update();
          });
      }
    }, []);
  
    useEffect(() => {
      if ("serviceWorker" in navigator) {
        return onAuthStateChanged(async (authUser: any) => {
          if (user?.uid === authUser?.uid) {
            return;
          }
          await navigator.serviceWorker.ready;
          await fetch(`/__/auth/wait/${authUser?.uid}`);
        });
      }
    }, [user]);
  
    return user;
  }
