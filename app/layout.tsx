import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import NavbarComponent from "./components/Navbar";
import { getAuthenticatedServerApp } from "./lib/firebase/serverApp";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Let's Meet",
  description: "Scheduling made easy",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser } = await getAuthenticatedServerApp();
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={`dark:bg-zinc-900 ${inter.className}`}>
        <NavbarComponent initialUser={currentUser?.toJSON()}/>
        {children}
      </body>
    </html>
  );
}
