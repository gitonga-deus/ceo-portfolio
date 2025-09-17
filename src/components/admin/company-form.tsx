"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { generateSlug } from "@/lib/utils/blog-utils"
import { LogoImageUpload } from "@/components/ui/logo-image-upload"

interface Company {
	id: string
	name: string
	slug: string
	description: string
	industry: string
	founded: string
	website: string | null
	logo: string | null
	createdAt: Date
	updatedAt: Date
}

interface CompanyFormProps {
	initialData?: Company
}

export function CompanyForm({ initialData }: CompanyFormProps) {
	const router = useRouter()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [formData, setFormData] = useState({
		name: initialData?.name || "",
		slug: initialData?.slug || "",
		description: initialData?.description || "",
		industry: initialData?.industry || "",
		founded: initialData?.founded || "",
		website: initialData?.website || "",
		logo: initialData?.logo || "",
	})

	const handleNameChange = (name: string) => {
		setFormData((prev) => ({
			...prev,
			name,
			slug: generateSlug(name),
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			const url = initialData ? `/api/admin/companies/${initialData.id}` : "/api/admin/companies"
			const method = initialData ? "PUT" : "POST"

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || "Failed to save company")
			}

			toast({
				title: initialData ? "Company updated" : "Company created",
				description: `The company has been successfully ${initialData ? "updated" : "created"}.`,
			})

			router.push("/admin/companies")
			router.refresh()
		} catch (error) {
			toast({
				title: "Error",
				description: error instanceof Error ? error.message : "Failed to save the company. Please try again.",
				variant: "destructive",
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="grid gap-6">
				<Card className="rounded-md shadow-none">
					<CardHeader>
						<CardTitle>Company Information</CardTitle>
						<CardDescription>Basic information about the company</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="name">Company Name</Label>
								<Input
									id="name"
									value={formData.name}
									onChange={(e) => handleNameChange(e.target.value)}
									placeholder="Enter company name"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="slug">Slug</Label>
								<Input
									id="slug"
									value={formData.slug}
									onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
									placeholder="company-slug"
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								value={formData.description}
								onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
								placeholder="Describe what the company does"
								rows={4}
								required
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="industry">Industry</Label>
								<Input
									id="industry"
									value={formData.industry}
									onChange={(e) => setFormData((prev) => ({ ...prev, industry: e.target.value }))}
									placeholder="e.g., SaaS, HealthTech, FinTech"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="founded">Founded</Label>
								<Input
									id="founded"
									value={formData.founded}
									onChange={(e) => setFormData((prev) => ({ ...prev, founded: e.target.value }))}
									placeholder="e.g., 2022"
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="website">Website (Optional)</Label>
							<Input
								id="website"
								type="url"
								value={formData.website}
								onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
								placeholder="https://company.com"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="logo">Logo (Optional)</Label>
							<LogoImageUpload
								value={formData.logo || ""}
								onChange={(url) => setFormData((prev) => ({ ...prev, logo: url }))}
								onRemove={() => setFormData((prev) => ({ ...prev, logo: "" }))}
							/>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="flex items-center gap-4">
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Saving..." : initialData ? "Update Company" : "Create Company"}
				</Button>
				<Button type="button" variant="outline" onClick={() => router.back()}>
					Cancel
				</Button>
			</div>
		</form>
	)
}
