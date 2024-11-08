"use client"

import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { User } from "firebase/auth"
import { auth } from "@/app/lib/firebase/config"

export function useUser() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
        })

        return () => unsubscribe()
    }, [])

    return user
}