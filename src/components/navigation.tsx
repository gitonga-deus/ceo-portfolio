"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import { Menu } from "lucide-react"

import { Facebook, Instagram, LinkedIn, X, YouTube } from "@/icons"

export function Navigation() {
	const links = [
		{ href: "/", label: "Home" },
		{ href: "/#meet-steve", label: "Meet Steve" },
		{ href: "/#companies", label: "Companies" },
		{ href: "/blog", label: "Blog" },
	]

	// Handle smooth scrolling for anchor links
	const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		if (href.startsWith("/#")) {
			e.preventDefault()
			const targetId = href.substring(2) // Remove "/#"
			const targetElement = document.getElementById(targetId)
			if (targetElement) {
				targetElement.scrollIntoView({
					behavior: "smooth",
					block: "start",
				})
			}
		}
	}

	const socialLinks = [
		{ href: "https://facebook.com/steve", label: "Facebook", icon: Facebook },
		{ href: "https://instagram.com/steve", label: "Instagram", icon: Instagram },
		{ href: "https://linkedin.com/in/steve", label: "LinkedIn", icon: LinkedIn },
		{ href: "https://x.com/steve", label: "X", icon: X },
		{ href: "https://youtube.com/@steve", label: "YouTube", icon: YouTube },
	]

	return (
		<header className="sticky top-0 z-50 p-4">
			<div className="container mx-auto max-w-5xl">
				<div className="flex h-16 items-center justify-between px-4 bg-white border rounded-full shadow-xs">
					{/* Brand Logo */}
					<Link href="/" className="flex items-center gap-1.5">
						<img
							src="/logo.png"
							alt="Skitbit logo"
							width={150}
							height={80}
							className=""
						/>
						<span className="font-semibold tracking-wide text-white">Skitbit</span>
					</Link>

					{/* Desktop Nav */}
					<nav className="hidden items-center gap-6 text-sm text-muted-foreground font-medium md:flex">
						{links.map((l) => (
							<Link
								key={l.href}
								href={l.href}
								onClick={(e) => handleAnchorClick(e, l.href)}
								className="hover:text-[#1285e4] transition-colors"
							>
								{l.label}
							</Link>
						))}
					</nav>

					{/* Social Links */}
					<div className="hidden items-center gap-3 md:flex">
						{socialLinks.map((social, index) => (
							<Link
								key={index}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground transition duration-100 hover:text-gray-900 active:text-gray-600"
								aria-label={social.label}
							>
								<social.icon />
							</Link>
						))}
					</div>

					{/* Mobile Nav */}
					<div className="md:hidden">
						<Sheet>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className=""
								>
									<Menu className="h-5 w-5" />
									<span className="sr-only">Open menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent
								side="right"
								className="border-muted-foreground/30 p-0 w-72 flex flex-col"
							>
								{/* Brand Header */}
								<div className="flex items-center gap-2 px-4 py-3 border-b border-muted-foreground/30">
									<img
										src="/logo.png"
										alt="Steve Down logo"
										width={160}
										height={80}
										className=""
									/>
									<span className="font-semibold tracking-wide text-white text-lg">Steve Down</span>
								</div>

								{/* Nav Links */}
								<nav className="flex flex-col gap-1 mt-1 text-muted-foreground px-2">
									{links.map((l) => (
										<Link
											key={l.href}
											href={l.href}
											onClick={(e) => handleAnchorClick(e, l.href)}
											className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 hover:text-gray-900 transition-colors rounded-md"
										>
											<span className="text-sm">{l.label}</span>
										</Link>
									))}
								</nav>

								{/* CTA Button at Bottom */}
								<div className="mt-auto flex items-center justify-between px-4 border-t border-muted-foreground/30 p-4">
									{socialLinks.map((social, index) => (
										<Link
											key={index}
											href={social.href}
											target="_blank"
											rel="noopener noreferrer"
											className="text-muted-foreground transition duration-100 hover:text-gray-900 active:text-gray-600"
											aria-label={social.label}
										>
											<social.icon />
										</Link>
									))}
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	)
}
