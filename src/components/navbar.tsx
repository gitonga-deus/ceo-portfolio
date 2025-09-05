import React from "react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

const Navbar = () => {
    const { data: session } = useSession()

    return (
        <nav className="border-b bg-background">
            <div className="container mx-auto flex justify-between items-center py-4">
                <div className="text-xl font-semibold">
                    <Link href="/">YourLogo</Link>
                </div>
                <div className="space-x-4">
                    <Link href="/" className="text-gray-800 hover:text-gray-600">
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="text-gray-800 hover:text-gray-600"
                    >
                        About
                    </Link>
                    <Link
                        href="/services"
                        className="text-gray-800 hover:text-gray-600"
                    >
                        Services
                    </Link>
                    <Link
                        href="/contact"
                        className="text-gray-800 hover:text-gray-600"
                    >
                        Contact
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    {session ? (
                        <>
                            <span className="text-gray-800">{session.user?.name}</span>
                            <button
                                onClick={() => signOut()}
                                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/auth/login"
                            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar