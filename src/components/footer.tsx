import Link from "next/link"
import { Facebook, Instagram, LinkedIn, X, YouTube } from "@/icons"

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/#meet-steve", label: "Meet Steve" },
	{ href: "/#companies", label: "Companies" },
	{ href: "/blog", label: "Blog" },
	{ href: "/privacy", label: "Privacy" },
	{ href: "/terms", label: "Terms" },
]

const socialLinks = [
	{ href: "https://facebook.com/steve", icon: Facebook, label: "Facebook" },
	{ href: "https://instagram.com/steve", icon: Instagram, label: "Instagram" },
	{ href: "https://linkedin.com/in/steve", icon: LinkedIn, label: "LinkedIn" },
	{ href: "https://x.com/steve", icon: X, label: "Twitter" },
	{ href: "https://youtube.com/@steve", icon: YouTube, label: "YouTube" },
]

export function Footer() {
	return (
		<div className="bg-white pt-4 sm:pt-10 lg:pt-12">
			<footer className="border-t">
				<div className="flex flex-col mx-auto max-w-5xl px-4 items-center justify-between gap-4 py-6 md:flex-row">
					{/* nav - start */}
					<nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start md:gap-6">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="text-gray-500 text-[15px] transition duration-100 hover:text-[#1285e4] active:text-[#1285e4]"
							>
								{link.label}
							</Link>
						))}
					</nav>

					<div className="flex gap-4 items-center">
						{socialLinks.map((social) => {
							const Icon = social.icon
							return (
								<Link
									key={social.href}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
									aria-label={social.label}
								>
									<Icon />
								</Link>
							)
						})}
					</div>
					{/* social - end */}
				</div>

				<div className="mx-auto max-w-5xl px-4 py-4 text-left text-sm text-gray-400">
					© {new Date().getFullYear()} Steve Down. All rights reserved.
				</div>
			</footer>
		</div>
	)
}
