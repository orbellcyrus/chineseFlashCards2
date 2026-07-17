"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";

export default function Navbar(){
    const pathname = usePathname();
    return(
        <nav className="flex gap-6 p-4 bg-gray-800 rounded-xl m-2">
            <Link           
                href="/" 
                className={pathname === "/" ? "text-blue-400" : "text-white"}
            >
            Home
            </Link>

           <Link           
                href="/decks" 
                className={pathname === "/decks" ? "text-blue-400" : "text-white"}
            >
            Decks
            </Link>

            <Link           
                href="/create" 
                className={pathname === "/create" ? "text-blue-400" : "text-white"}
            >
                Create
            </Link>

            <Link           
                href="/account" 
                className={pathname === "/account" ? "text-blue-400" : "text-white"}
            >
            Account
            </Link>
        </nav>
    );
    
}