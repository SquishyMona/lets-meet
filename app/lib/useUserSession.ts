

import { useState, useEffect } from 'react';
import { getAuth, getRedirectResult, User } from 'firebase/auth';
import { onAuthStateChanged } from './firebase/auth';
import { firebaseConfig } from '@/app/lib/firebase/config';
import { useRouter } from 'next/navigation';

export default function useUserSession(initialUser: User | null) {
    const [user, setUser] = useState<User | null>(initialUser);
    const router = useRouter();

    useEffect(() => {
        if ("serviceWorker" in navigator) {
            const servializedFirebaseConfig = encodeURIComponent(JSON.stringify(firebaseConfig));
            const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${servializedFirebaseConfig}`;

            navigator.serviceWorker.register(serviceWorkerUrl).then((registration) => {
                console.log("Service Worker registered with scope: ", registration.scope);
            }).catch((error) => {
                console.error("Service Worker registration failed: ", error);
            });
        }
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged((authUser) => {
            getRedirectResult(getAuth()).then((result) => {
                if (result?.user) {
                    console.log("Redirect recieved, User signed in");
                }
                else {
                    console.log("No redirect recieved");
                }
            });
            setUser(authUser);
        })

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        onAuthStateChanged((authUser) => {
            if (user === undefined) return

            if (user?.email !== authUser?.email) {
                router.refresh()
            }
        })
    }, [user]);

    return user;
}
