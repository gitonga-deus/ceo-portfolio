"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle } from "lucide-react"

export function NewsletterSignup() {
	const [email, setEmail] = useState("")
	const [name, setName] = useState("")
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
				body: JSON.stringify({ email, name }),
			})

			if (!response.ok) {
				throw new Error("Failed to subscribe")
			}

			setIsSuccess(true)
			setEmail("")
			setName("")
		} catch (error) {
			setError("Failed to subscribe. Please try again.")
		} finally {
			setIsLoading(false)
		}
	}

	if (isSuccess) {
		return (
			<Card className="w-full max-w-lg mx-auto rounded-md shadow-none">
				<CardContent className="pt-6">
					<div className="text-center">
						<CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
						<h3 className="text-lg font-semibold mb-2">Successfully Subscribed!</h3>
						<p className="text-muted-foreground">
							Thank you for subscribing to Steve's newsletter. You'll receive updates on company news, blog posts, and
							industry insights.
						</p>
					</div>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className="w-full max-w-lg mx-auto shadow-none rounded-md">
			<CardHeader className="text-center">
				<CardTitle className="flex items-center justify-center gap-2">
					<Mail className="h-5 w-5" />
					Stay Updated
				</CardTitle>
				<CardDescription>Get the latest updates on company news, blog posts, and industry insights.</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Input
							type="text"
							placeholder="Your name (optional)"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div>
						<Input
							type="email"
							placeholder="Your email address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					{error && <p className="text-sm text-red-600">{error}</p>}
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "Subscribing..." : "Subscribe to Newsletter"}
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}
