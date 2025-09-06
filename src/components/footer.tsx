import Link from "next/link"
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react"

const navLinks = [
	{ href: "/meet-steve", label: "About" },
	{ href: "/companies", label: "Companies" },
	{ href: "/blog", label: "Blog" },
	{ href: "/privacy", label: "Privacy" },
	{ href: "/terms", label: "Terms" },
]

const socialLinks = [
	{ href: "https://facebook.com/steve", icon: Facebook, label: "Facebook" },
	{ href: "https://twitter.com/steve", icon: Twitter, label: "Twitter" },
	{ href: "https://linkedin.com/in/steve", icon: Linkedin, label: "LinkedIn" },
	{ href: "https://youtube.com/@steve", icon: Youtube, label: "YouTube" },
]

export function Footer() {
	return (
		<div className="bg-white pt-4 sm:pt-10 lg:pt-12">
			<footer className="border-t">
				<div className="flex flex-col mx-auto max-w-6xl px-4 items-center justify-between gap-4 py-6 md:flex-row">
					{/* nav - start */}
					<nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start md:gap-6">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="text-gray-500 text-base transition duration-100 hover:text-indigo-500 active:text-indigo-600"
							>
								{link.label}
							</Link>
						))}
					</nav>
					{/* nav - end */}

					{/* social - start */}
					<div className="flex gap-4">
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
									<Icon className="h-5 w-5" />
								</Link>
							)
						})}
					</div>
					{/* social - end */}
				</div>

				<div className="mx-auto max-w-6xl px-4 py-8 text-left text-sm text-gray-400">
					© {new Date().getFullYear()} Steve Down. All rights reserved.
				</div>
			</footer>
		</div>
	)
}
