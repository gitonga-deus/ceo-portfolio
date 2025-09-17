"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Facebook, Instagram, LinkedIn, X, YouTube } from "@/icons"

export default function Navbar() {
	const pathname = usePathname()
	const router = useRouter()
	const [isScrolled, setIsScrolled] = useState(false)

	const links = [
		{ href: "/", label: "Home" },
		{ href: "/#meet-steve", label: "Meet Steve" },
		{ href: "/#companies", label: "Companies" },
		{ href: "/blog", label: "Blog" },
	]

	// Check if we're on the homepage (which has the hero background)
	const isHomePage = pathname === "/"

	// Handle scroll effect for navbar
	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY
			setIsScrolled(scrollTop > 50)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	// Handle smooth scrolling for anchor links
	const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		if (href.startsWith("/#")) {
			e.preventDefault()
			const targetId = href.substring(2) // Remove "/#"

			// If not on home page, navigate to home page first
			if (pathname !== "/") {
				router.push(href)
				return
			}

			// If on home page, scroll to element
			const targetElement = document.getElementById(targetId)
			if (targetElement) {
				targetElement.scrollIntoView({
					behavior: "smooth",
					block: "start",
				})
			}
		}
	}

	// Check if link is active
	const isActiveLink = (href: string) => {
		if (href === "/") {
			return pathname === "/"
		}
		if (href.startsWith("/#")) {
			// Anchor links are never shown as "active" in navigation
			// They only work functionally but don't get active styling
			return false
		}
		return pathname.startsWith(href)
	}

	const socialLinks = [
		{ href: "https://www.facebook.com/share/1Bx2WfRPhi/?mibextid=wwXIfr", label: "Facebook", icon: Facebook },
		{ href: "https://www.instagram.com/ceo_stevedown?igsh=NXRsa2NoMWw5NzQ4", label: "Instagram", icon: Instagram },
		{ href: "https://www.linkedin.com/in/therealstevedown", label: "LinkedIn", icon: LinkedIn },
		{ href: "https://x.com/_stevedown", label: "X", icon: X },
		{ href: "", label: "YouTube", icon: YouTube },
	]

	return (
		<header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isHomePage
			? isScrolled
				? "bg-white/95 backdrop-blur-sm border-b border-gray-200"
				: "bg-transparent border-b border-transparent"
			: isScrolled
				? "bg-white border-b border-gray-200"
				: "bg-white border-b border-transparent"
			}`}>
			<div className="container mx-auto max-w-6xl px-4 py-4">
				<div className={`flex h-16 items-center justify-between px-4 rounded-full transition-all duration-500 ${isHomePage
					? isScrolled
						? "bg-white border shadow-xs"
						: "border-white/20"
					: "bg-white border shadow-xs"
					}`}>
					{/* Brand Logo */}
					<Link href="/" className="flex items-center gap-1.5">
						<img
							src="/logo.png"
							alt="Steve Down Logo"
							width={150}
							height={80}
							className=""
						/>
					</Link>

					{/* Desktop Nav */}
					<nav className="hidden items-center gap-4 text-sm font-medium md:flex">
						{links.map((l) => (
							<Link
								key={l.href}
								href={l.href}
								onClick={(e) => handleAnchorClick(e, l.href)}
								className={`transition-colors ${isActiveLink(l.href)
									? "text-[#1285e4] font-semibold"
									: isHomePage
										? isScrolled
											? "text-muted-foreground hover:text-[#1285e4]"
											: "text-white hover:text-[#1285e4]"
										: "text-muted-foreground hover:text-[#1285e4]"
									}`}
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
								className={`transition duration-100 active:text-gray-600 ${isHomePage
									? isScrolled
										? "text-muted-foreground hover:text-[#1285e4]"
										: "text-white hover:text-[#1285e4]"
									: "text-muted-foreground hover:text-[#1285e4]"
									}`}
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
								<nav className="flex flex-col gap-1 mt-1 px-2">
									{links.map((l) => (
										<Link
											key={l.href}
											href={l.href}
											onClick={(e) => handleAnchorClick(e, l.href)}
											className={`flex items-center gap-3 px-4 py-3 transition-colors rounded-md ${isActiveLink(l.href)
												? "bg-[#1285e4]/10 text-[#1285e4] font-semibold"
												: "text-muted-foreground hover:bg-gray-100 hover:text-gray-900"
												}`}
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
