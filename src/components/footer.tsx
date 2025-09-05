import Link from "next/link"
import Image from "next/image"
import { Youtube, Music, Twitter, Linkedin, Facebook, Mail, Phone, MapPin } from "lucide-react"

const socialLinks = [
	{ href: "https://facebook.com/steve", icon: Facebook, label: "Facebook" },
	{ href: "https://twitter.com/steve", icon: Twitter, label: "Twitter" },
	{ href: "https://linkedin.com/in/steve", icon: Linkedin, label: "LinkedIn" },
	{ href: "https://youtube.com/@steve", icon: Youtube, label: "YouTube" },
]

const quickLinks = [
	{ href: "/", label: "Home" },
	{ href: "/meet-steve", label: "Meet Steve" },
	{ href: "/companies", label: "Steve's Companies" },
	{ href: "/blog", label: "Blog" },
]

const legalLinks = [
	{ href: "/privacy", label: "Privacy Policy" },
	{ href: "/terms", label: "Terms of Service" },
	{ href: "/cookies", label: "Cookie Policy" },
]

export function Footer() {
	return (
		<footer className="border-t bg-muted">
			<div className="container max-w-6xl mx-auto py-12 px-4">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					{/* Brand Section */}
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<Link href="/" className="flex items-center space-x-2">
								<img src={"/logo.jpeg"} alt="Logo" width={170} height={80} />
							</Link>
						</div>
						<p className="text-sm text-muted-foreground leading-relaxed">
							Entrepreneur, innovator, and business leader dedicated to building companies that make a difference.
						</p>
						<div className="flex space-x-2">
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

					{/* Quick Links */}
					<div className="space-y-4">
						<h3 className="font-heading font-bold text-sm uppercase tracking-wider">Quick Links</h3>
						<ul className="space-y-2">
							{quickLinks.map((link) => (
								<li key={link.href}>
									<Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Info */}
					<div className="space-y-4">
						<h3 className="font-heading font-bold text-sm uppercase tracking-wider">Contact</h3>
						<ul className="space-y-3">
							<li className="flex items-center space-x-3 text-sm text-muted-foreground">
								<Mail className="h-4 w-4 text-primary" />
								<span>hello@steve.com</span>
							</li>
							<li className="flex items-center space-x-3 text-sm text-muted-foreground">
								<Phone className="h-4 w-4 text-primary" />
								<span>+1 (555) 123-4567</span>
							</li>
							<li className="flex items-center space-x-3 text-sm text-muted-foreground">
								<MapPin className="h-4 w-4 text-primary" />
								<span>San Francisco, CA</span>
							</li>
						</ul>
					</div>

					{/* Legal */}
					<div className="space-y-4">
						<h3 className="font-heading font-bold text-sm uppercase tracking-wider">Legal</h3>
						<ul className="space-y-2">
							{legalLinks.map((link) => (
								<li key={link.href}>
									<Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-8 pt-8">
					<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
						<p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Steve Down. All rights reserved.</p>
					</div>
				</div>
			</div>
		</footer>
	)
}
