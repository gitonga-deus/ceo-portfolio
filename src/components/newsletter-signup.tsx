"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function NewsletterSignup() {
	const [email, setEmail] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [error, setError] = useState("")

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError("")

		try {
			const response = await fetch("/api/newsletter/subscribe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			})

			if (!response.ok) {
				throw new Error("Failed to subscribe")
			}

			setIsSuccess(true)
			setEmail("")
		} catch (error) {
			setError("Failed to subscribe. Please try again.")
		} finally {
			setIsLoading(false)
		}
	}

	if (isSuccess) {
		return (
			<div className="bg-white py-6 sm:py-8 lg:py-12">
				<div className="mx-auto max-w-6xl px-4 md:px-8">
					<div className="flex flex-col items-center rounded-lg bg-gray-100 p-4 sm:p-8 lg:flex-row lg:justify-between">
						<div className="mb-4 sm:mb-8 lg:mb-0">
							<h2 className="text-center text-xl font-bold text-[#049AD1] sm:text-2xl lg:text-left lg:text-3xl">Thank you!</h2>
							<p className="text-center text-gray-500 lg:text-left">You've successfully subscribed to our newsletter</p>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="bg-white py-6 sm:py-8 lg:py-12">
			<div className="mx-auto max-w-6xl px-4">
				<div className="flex flex-col items-center rounded-lg bg-muted/50 p-4 sm:p-8">
					<div className="mb-4 sm:mb-8">
						<h2 className="text-center text-xl font-bold text-primary sm:text-2xl lg:text-3xl py-2">Stay Updated</h2>
						<p className="text-center text-muted-foreground">Get the latest insights on entrepreneurship and business building delivered to your inbox.</p>
					</div>

					<form onSubmit={handleSubmit} className="mb-3 flex w-full max-w-md gap-2 sm:mb-5">
						<Input
							placeholder="Email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="bg-gray-white w-full flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 transition duration-100 focus:ring"
						/>

						<Button
							type="submit"
							disabled={isLoading}
							className="inline-block rounded-md bg-[#049AD1] px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-[#049AD1]/90 focus-visible:ring md:text-base"
						>
							{isLoading ? "Sending..." : "Send"}
						</Button>
					</form>

					{error && <p className="text-center text-xs text-red-500 mb-2">{error}</p>}

					<p className="text-center text-xs text-gray-400">By signing up to our newsletter you agree to our <a href="#" className="underline underline-offset-4 transition duration-100 hover:text-[#049AD1] active:text-[#049AD1]">Term of Service</a> and <a href="#" className="underline underline-offset-4 transition duration-100 hover:text-[#049AD1] active:text-[#049AD1]">Privacy Policy</a>.</p>
				</div>
			</div>
		</div>
	)
}
