"use client";

import { firebaseApp } from "@/lib/firebase/config";
import { getAuth, getRedirectResult } from "firebase/auth";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const auth = getAuth(firebaseApp);
  useEffect(() => {
    getRedirectResult(auth).then((result) => {
      if (result) {
        console.log(result);
      }
    });
  });

  return (
      <div className="mb-32 text-center lg:mb-0 w-full lg:max-w-5xl lg:text-left flex flex-col lg:flex-row">
        <div className="card bg-base-300 rounded-box min-h-96 flex-grow flex flex-col items-center">
          <div className="h-1/3 flex items-center">
            <p className="text-3xl font-bold text-center">My Meetings</p>
          </div>
          <div className="h-2/3 flex text-center flex-col">
            <p>You aren&apos;t part of any meetings!</p>
            <button className="btn btn-primary m-5">Create a Meeting</button>
          </div>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="card bg-base-300 rounded-box min-h-96 flex-grow flex flex-col items-center">
          <div className="h-1/3 flex items-center">
            <p className="text-3xl font-bold text-center">Information</p>
          </div>
          <div className="h-2/3 flex">
            <p>Select a meeting to view it&apos;s information</p>
          </div>
        </div>
      </div>
  );
}
