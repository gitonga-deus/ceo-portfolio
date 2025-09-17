import type React from "react"
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="min-h-screen overflow-auto">
			<Navbar />
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	)
}
