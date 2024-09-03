"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSession, removeSession } from '@/actions/auth-actions'
import { useUserSession } from '@/hooks/use-user-session'
import { signOut } from "@/lib/firebase/auth";
import AuthForm from "./AuthForm";
import { getAuth, getRedirectResult } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase/config";


export default function Navbar({session}: {session: string | null}) {
  const sessionID = useUserSession(session);
  const auth = getAuth(firebaseApp);
  useEffect(() => {
    getRedirectResult(auth).then((result) => {;
    if (result) {
      console.log('Successfully signed in from redirect. Results:', result);
    }
  });})

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><a>Home</a></li>
            <li><a>New Meeting</a></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Let&apos;s Meet!</a>
      </div>
      <div className="navbar-end">
        <ThemeSwitcher />
        <div className="dropdown dropdown-end mx-2">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <Image
              alt="Tailwind CSS Navbar component"
              src="defaultuser.svg" 
              width={48}
              height={48}/>
          </div>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          { sessionID ? 
            <>
              <li><a>Settings</a></li>
              <li><a onClick={signOut}>Sign Out</a></li>
            </>
             : null
          }
          <li>
            <a 
              onClick={() => { 
                const authform = document.getElementById('authform') as HTMLDialogElement | null; 
                authform?.showModal();
              }}
            >
              Sign In
            </a>
          </li>
          
        </ul>
      </div>
      </div>
      <AuthForm />
    </div>
  );
}