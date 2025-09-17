"use client"

import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, LinkedIn, X, YouTube } from "@/icons"

export function Footer() {
	const currentYear = new Date().getFullYear()
	const [email, setEmail] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSubscribed, setIsSubscribed] = useState(false)

	const socialLinks = [
		{ href: "https://facebook.com/steve", label: "Facebook", icon: Facebook },
		{ href: "https://instagram.com/steve", label: "Instagram", icon: Instagram },
		{ href: "https://linkedin.com/in/steve", label: "LinkedIn", icon: LinkedIn },
		{ href: "https://x.com/steve", label: "X", icon: X },
		{ href: "https://youtube.com/@steve", label: "YouTube", icon: YouTube },
	]

	const handleNewsletterSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!email || isSubmitting) return

		setIsSubmitting(true)

		try {
			const response = await fetch("/api/newsletter/subscribe", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			})

			if (response.ok) {
				setIsSubscribed(true)
				setEmail("")
			} else {
				console.error("Newsletter subscription failed")
			}
		} catch (error) {
			console.error("Newsletter subscription error:", error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<footer className="bg-white mt-20">
			{/* Newsletter Section */}
			<div className="bg-gray-100 py-10">
				<div className="mx-auto max-w-6xl px-4 md:px-8">
					<div className="flex flex-col items-center justify-between gap-2 md:flex-row">
						<div className="mb-3 text-center md:mb-0 md:text-left px-1.5">
							<span className="font-bold leading-relaxed text-xl text-[#1285e4]">Newsletter</span>
							<p className="text-muted-foreground">Subscribe to our newsletter</p>
						</div>

						{isSubscribed ? (
							<div className="text-center md:text-left">
								<p className="text-muted-foreground font-medium">Thank you for subscribing!</p>
							</div>
						) : (
							<form onSubmit={handleNewsletterSubmit} className="flex w-full gap-4 md:max-w-lg">
								<Input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Email"
									required
									disabled={isSubmitting}
									className="w-full h-10 flex-1 rounded-md bg-white"
								/>
								<Button
									type="submit"
									disabled={isSubmitting || !email}
									className="px-10 h-10 rounded-md"
								>
									{isSubmitting ? "..." : "Send"}
								</Button>
							</form>
						)}
					</div>
				</div>
			</div>

			{/* Main Footer Content */}
			<div className="pt-12 lg:pt-16">
				<div className="mx-auto max-w-6xl px-4 md:px-8">
					<div className="mb-16 grid grid-cols-2 gap-2 md:grid-cols-4 lg:gap-8">
						{/* Logo and Description */}
						<div className="col-span-full lg:col-span-2 mb-6">
							<div className="mb-4">
								<Link href="/" className="inline-flex items-center gap-2 text-xl font-bold text-black md:text-2xl" aria-label="logo">
									<img
										src="/logo.png"
										alt="Steve Down Logo"
										width={160}
										height={80}
									/>
								</Link>
							</div>

							<p className="px-2 mb-6 text-gray-500 sm:pr-8 text-balance">
								The commitment and dedication he demonstrates to his family and friends distinguish him from other successful business persons. Steve has established the legacy of selfless charity. His purity of purpose will be emulated by many in years to come.
							</p>

							{/* Social Links */}
							<div className="flex gap-4 items-center px-2">
								{socialLinks.map((social, index) => (
									<Link
										key={index}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className="text-muted-foreground transition duration-100 hover:text-[#1285e4] active:text-[#1285e4"
										aria-label={social.label}
									>
										<social.icon />
									</Link>
								))}
							</div>
						</div>

						{/* Navigation Links */}
						<div className="">
							<div className="mb-4 font-bold capitalize text-gray-800">Navigation</div>
							<nav className="flex flex-col gap-4 leading-relaxed text-[15px]">
								<Link href="/" className="text-gray-500 transition duration-100 hover:text-[#1285e4] active:text-[#1285e4]">
									Home
								</Link>
								<Link href="/#meet-steve" className="text-gray-500 transition duration-100 hover:text-[#1285e4] active:text-[#1285e4]">
									Meet Steve
								</Link>
								<Link href="/#companies" className="text-gray-500 transition duration-100 hover:text-[#1285e4] active:text-[#1285e4]">
									Companies
								</Link>
								<Link href="/blog" className="text-gray-500 transition duration-100 hover:text-[#1285e4] active:text-[#1285e4]">
									Blog
								</Link>
							</nav>
						</div>

						{/* Legal */}
						<div>
							<div className="mb-4 font-bold text-gray-800">Legal</div>
							<nav className="flex flex-col gap-4 text-[15px] leading-relaxed">
								<Link href="/terms" className="text-gray-500 transition duration-100 hover:text-[#1285e4] active:text-[#1285e4]">
									Terms of Service
								</Link>
								<Link href="/privacy" className="text-gray-500 transition duration-100 hover:text-[#1285e4] active:text-[#1285e4]">
									Privacy Policy
								</Link>
							</nav>
						</div>
					</div>

				</div>

				{/* Copyright */}
				<div className="border-t py-8 text-sm text-muted-foreground">
					<div className="max-w-6xl mx-auto px-4 md:px-8">

						© {currentYear} Steve Down - Life changing works that offer transformational insights into personal finance, wealth, financial freedom and well-being.
					</div>
				</div>
			</div>
		</footer>
	)
}
