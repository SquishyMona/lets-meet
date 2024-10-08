import { useEffect, useState } from 'react';

import { onAuthStateChanged } from '@/lib/firebase/auth';
import { getRedirectResult } from 'firebase/auth';
import firebase from 'firebase/compat/app';

export function useUserSession(InitSession) {
  const [userUid, setUserUid] = useState(InitSession);

  // Listen for changes to the user session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUserUid(authUser.uid);
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return userUid;
}