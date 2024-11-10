"use client";

import { Navbar, Avatar, Dropdown, DarkThemeToggle } from "flowbite-react";
import { dropdownTheme } from "./themes/DropdownTheme";
import Image from "next/image";
import { signInWithGoogle, signOut, onAuthStateChanged } from "../lib/firebase/auth";
import { useState, useEffect } from "react";
import { connectAuthEmulator, getAuth, getRedirectResult, User } from "firebase/auth";
import { firebaseConfig } from "../lib/firebase/config";

function useUserSession(user: any) {
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
        return onAuthStateChanged(async (authUser) => {
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

export default function NavbarComponent({ initialUser } : { initialUser: any }) {
    const user = useUserSession(initialUser);

    function handleSignIn(){
        console.log("Sign in with Google");
        signInWithGoogle();
    }

    useEffect(() => {
        const auth = getAuth();
        console.log("Auth: ", auth);
        console.log(process.env.NODE_ENV);
        if (process.env.NODE_ENV === "development") {
            connectAuthEmulator(auth, "http://localhost:9099")
        }
        getRedirectResult(auth).then((result) => {
            console.log("Redirect result: ", result);
            if (result?.user) {
                console.log("User signed in");
            }
        })
    }, [])

    return (
        <Navbar fluid className="dark:bg-zinc-900">
            <Navbar.Brand href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Let&apos;s Meet
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <DarkThemeToggle className="mx-2 dark:border-zinc-500 hover:dark:bg-zinc-700"/>
                <Dropdown
                    theme={dropdownTheme}
                    arrowIcon={false}
                    inline
                    label={
                    <Avatar
                      alt="User settings"
                      img={user?.photoURL ?? undefined}
                      rounded
                    />
                    }
                >
                {user ? (
                    <>
                        <Dropdown.Header>
                            <span className="block text-sm">{user.displayName}</span>
                            <span className="block truncate text-sm font-medium">
                                {user.email}
                            </span>
                        </Dropdown.Header>
                        <Navbar.Collapse>
                        </Navbar.Collapse>
                        <Dropdown.Item>My Events</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => signOut()} className="rounded-b-2xl">Sign out</Dropdown.Item>
                    </>
                ) : <Dropdown.Item onClick={() => handleSignIn()} className="rounded-2xl">Sign In</Dropdown.Item>
                }
                
                </Dropdown>
                <Navbar.Toggle />
            </div>
        </Navbar>
  );
}
