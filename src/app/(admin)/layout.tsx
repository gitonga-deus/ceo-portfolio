import type React from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)

	if (!session) {
		redirect("/auth/login")
	}

	return (
		<div className="flex min-h-screen bg-background">
			<AdminSidebar />
			<div className="flex-1 flex flex-col">
				<AdminHeader />
				<main className="flex-1 p-6 pt-6">{children}</main>
			</div>
		</div>
	)
}