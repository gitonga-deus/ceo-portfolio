"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Youtube, Music, Twitter, Linkedin, Facebook } from "lucide-react"
import Image from "next/image"

const navItems = [
	{ href: "/", label: "Home" },
	{ href: "/meet-steve", label: "Meet Steve" },
	{ href: "/companies", label: "Steve's Companies" },
	{ href: "/blog", label: "Blog" },
]

const socialLinks = [
	{ href: "https://facebook.com/steve", icon: Facebook, label: "Facebook" },
	{ href: "https://twitter.com/steve", icon: Twitter, label: "Twitter" },
	{ href: "https://linkedin.com/in/steve", icon: Linkedin, label: "LinkedIn" },
	{ href: "https://youtube.com/@steve", icon: Youtube, label: "YouTube" },
]

export function Navigation() {
	const pathname = usePathname()

	return (
		<nav className="sticky top-0 z-50 w-full border-b bg-muted/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container max-w-6xl mx-auto flex h-20 items-center justify-between px-4">
				<Link href="/" className="flex items-center space-x-2">
					<Image src={"/logo1.svg"} alt="Logo" width={180} height={80} />
				</Link>

				<div className="flex items-center space-x-8">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary",
								pathname === item.href ? "text-primary" : "text-muted-foreground",
							)}
						>
							{item.label}
						</Link>
					))}
				</div>

				<div className="flex items-center space-x-4">
					{socialLinks.map((social) => (
						<Link
							key={social.href}
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-primary transition-colors"
							aria-label={social.label}
						>
							<social.icon className="h-5 w-5" />
						</Link>
					))}
				</div>
			</div>
		</nav>
	)
}
