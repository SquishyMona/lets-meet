"use client";

import { Navbar, Avatar, Dropdown, DarkThemeToggle } from "flowbite-react";
import { dropdownTheme } from "./themes/DropdownTheme";
import { useUser } from "../lib/getUser";
import Image from "next/image";
import { signInWithGoogle, signOut } from "../lib/firebase/auth";

export default function NavbarComponent() {
    const user = useUser();

    function handleSignIn(){
        console.log("Sign in with Google");
        signInWithGoogle();
    }

    const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        signOut();
    }

    return (
        <Navbar fluid className="dark:bg-zinc-900">
            <Navbar.Brand href="https://flowbite-react.com">
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
                      img={user?.photoURL ? user.photoURL : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
                      rounded
                    />
                    }
                >
                {user ? (
                    <>
                        <Dropdown.Header>
                            <span className="block text-sm">Bonnie Green</span>
                            <span className="block truncate text-sm font-medium">
                                name@flowbite.com
                            </span>
                        </Dropdown.Header>
                        <Navbar.Collapse>
                        </Navbar.Collapse>
                        <Dropdown.Item>My Events</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="rounded-b-2xl">Sign out</Dropdown.Item>
                    </>
                ) : <Dropdown.Item onClick={() => handleSignIn()} className="rounded-2xl">Sign In</Dropdown.Item>
                }
                
                </Dropdown>
                <Navbar.Toggle />
            </div>
        </Navbar>
  );
}
