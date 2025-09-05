"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, FolderOpen, Tags, Mail, Settings, Users, Building2 } from "lucide-react"

const sidebarItems = [
	{
		title: "Dashboard",
		href: "/admin",
		icon: LayoutDashboard,
	},
	{
		title: "Blog Posts",
		href: "/admin/posts",
		icon: FileText,
	},
	{
		title: "Content",
		href: "/admin/content",
		icon: FolderOpen,
	},
	{
		title: "Companies",
		href: "/admin/companies",
		icon: Building2,
	},
	{
		title: "Newsletter",
		href: "/admin/newsletter",
		icon: Mail,
	},
	{
		title: "Subscribers",
		href: "/admin/subscribers",
		icon: Users,
	},
	{
		title: "Settings",
		href: "/admin/settings",
		icon: Settings,
	},
]

export function AdminSidebar() {
	const pathname = usePathname()

	return (
		<div className="w-64 bg-sidebar border-r border-sidebar-border sticky top-0 h-screen">
			<div className="px-6 py-4 border-b border-sidebar-border">
				<Link href="/" className="flex items-center space-x-2">
					<img src={"/logo.jpeg"} alt="Logo" width={170} height={80} />
				</Link>
			</div>

			<nav className="px-4 space-y-2 py-4">
				{sidebarItems.map((item) => {
					const Icon = item.icon
					const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))

					return (
						<Button
							key={item.href}
							variant={isActive ? "secondary" : "ghost"}
							className={cn("w-full justify-start", isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}
							asChild
						>
							<Link href={item.href}>
								<Icon className="mr-2 h-4 w-4" />
								{item.title}
							</Link>
						</Button>
					)
				})}
			</nav>
		</div>
	)
}
