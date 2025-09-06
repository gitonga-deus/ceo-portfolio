"use client"

import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, User, ExternalLink } from "lucide-react"
import Link from "next/link"

export function AdminHeader() {
	const { data: session } = useSession()

	return (
		<header className="sticky top-0 z-50 border-b border-sidebar-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6 h-20">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-lg font-heading font-semibold">Admin Dashboard</h1>
				</div>

				<div className="flex items-center space-x-4">
					<Button variant="outline" asChild>
						<Link href="/" target="_blank">
							<ExternalLink className="mr-2 h-4 w-4" />
							View Site
						</Link>
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="relative h-8 w-8 rounded-full">
								<Avatar className="h-8 w-8">
									<AvatarFallback>{session?.user?.name?.[0] || "A"}</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" forceMount>
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium leading-none">{session?.user?.name}</p>
									<p className="text-xs leading-none text-muted-foreground">{session?.user?.email}</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => signOut()}>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	)
}