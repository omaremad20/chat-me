"use client";

import useUserContext from "@/app/_customHooks/useUserContext";
import { INavlink } from "@/app/_interfaces/INavlink";
import { signInWithGoogle } from "@/app/_lib/services/auth";
import { navLinks } from "@/app/_static-data/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsChatHeart } from "react-icons/bs";
import { FaBars, FaGoogle } from "react-icons/fa";

export default function Navbar() {
    const [open, setOpen] = useState<boolean>(false);
    const path = usePathname();
    const { state } = useUserContext();

    return (
        <nav id="navbar" className="bg-gray-200 fixed left-0 right-0 p-3 m-3 border border-transparent rounded-lg shadow-xl flex flex-col md:flex-row md:items-center md:justify-between">

            <div className="flex items-center justify-between">
                <Link href={'/'} className="flex items-center space-x-1 text-xl">
                    <BsChatHeart />
                    <h1 className="font-semibold">Chat Me</h1>
                </Link>

                <button
                    aria-label="Toggle Menu"
                    title="Toggle Menu"
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-xl cursor-pointer"
                >
                    <FaBars />
                </button>
            </div>

            <div
                className={`flex flex-col md:flex-row md:items-center gap-4 mt-4 md:mt-0
        ${open ? "flex" : "hidden"} md:flex`}
            >
                <ul className="flex flex-col md:flex-row gap-3">
                    {navLinks.map((item: INavlink) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className="text-sm flex items-center space-x-1 font-medium"
                            >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Should be login and logout , will rendered conditionally */}
                {
                    !state?.user?.name &&
                    <button aria-label="Login With Google" title="Login With Google" onClick={() => signInWithGoogle(path)} className="rounded-lg border flex items-center justify-center space-x-2 text-sm outline-0 focus:ring-1 focus:ring-offset-1 focus:ring-gray-400 border-gray-300 shadow cursor-pointer bg-gray-300 text-gray-700 font-semibold hover:bg-gray-200 hover:text-gray-600 transition-all px-4 py-2">
                        <span>Login</span>
                        <FaGoogle />
                    </button>
                }
            </div>
        </nav>
    );
}