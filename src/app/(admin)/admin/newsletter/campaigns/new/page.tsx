"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewCampaignPage() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [formData, setFormData] = useState({
		subject: "",
		content: "",
		type: "NEWSLETTER" as "NEWSLETTER" | "ANNOUNCEMENT",
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			const response = await fetch("/api/admin/newsletter/campaigns", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			})

			if (!response.ok) {
				throw new Error("Failed to create campaign")
			}

			router.push("/admin/newsletter")
		} catch (error) {
			console.error("Error creating campaign:", error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="space-y-6">
			<Link href="/admin/newsletter">
				<Button variant="outline">
					<ArrowLeft className="h-4 w-4 mr-2" />
					Back to Newsletter
				</Button>
			</Link>

			<div className="flex items-center gap-4 mt-4">
				<div>
					<h1 className="text-2xl font-bold leading-relaxed">Create New Campaign</h1>
					<p className="text-muted-foreground">Create a new email campaign for your subscribers</p>
				</div>
			</div>

			<Card className="max-w-none rounded-md shadow-none">
				<CardHeader>
					<CardTitle>Campaign Details</CardTitle>
					<CardDescription>Fill in the details for your email campaign</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label className="text-sm font-medium mb-2 block">Campaign Type</label>
							<Select
								value={formData.type}
								onValueChange={(value: "NEWSLETTER" | "ANNOUNCEMENT") => setFormData({ ...formData, type: value })}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="NEWSLETTER">Newsletter</SelectItem>
									<SelectItem value="ANNOUNCEMENT">Announcement</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<label className="text-sm font-medium mb-2 block">Subject Line</label>
							<Input
								type="text"
								placeholder="Enter email subject"
								value={formData.subject}
								onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
								required
							/>
						</div>

						<div>
							<label className="text-sm font-medium mb-2 block">Email Content</label>
							<Textarea
								placeholder="Write your email content here..."
								value={formData.content}
								onChange={(e) => setFormData({ ...formData, content: e.target.value })}
								rows={12}
								required
							/>
						</div>

						<div className="flex gap-4">
							<Button type="submit" disabled={isLoading}>
								{isLoading ? "Creating..." : "Create Campaign"}
							</Button>
							<Link href="/admin/newsletter">
								<Button variant="outline">Cancel</Button>
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
