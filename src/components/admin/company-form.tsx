"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { generateSlug } from "@/lib/utils/blog-utils"

// Define the types since Prisma client might not be available yet
type CompanyStatus = "ACTIVE" | "INACTIVE" | "SOLD" | "ACQUIRED"

interface Company {
	id: string
	name: string
	slug: string
	description: string
	industry: string
	status: CompanyStatus
	founded: string
	website: string | null
	logo: string | null
	image: string | null
	featured: boolean
	sortOrder: number
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
		status: (initialData?.status as CompanyStatus) || "ACTIVE" as CompanyStatus,
		founded: initialData?.founded || "",
		website: initialData?.website || "",
		logo: initialData?.logo || "",
		image: initialData?.image || "",
		featured: initialData?.featured || false,
		sortOrder: initialData?.sortOrder || 0,
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

	const handleImageUpload = async (file: File, field: 'logo' | 'image') => {
		const formData = new FormData()
		formData.append("file", file)

		try {
			const response = await fetch("/api/upload/image", {
				method: "POST",
				body: formData,
			})

			if (response.ok) {
				const data = await response.json()
				setFormData(prev => ({ ...prev, [field]: data.url }))
				toast({
					title: "Image uploaded",
					description: "The image has been uploaded successfully.",
				})
			} else {
				throw new Error("Upload failed")
			}
		} catch (error) {
			toast({
				title: "Upload failed",
				description: "Failed to upload image. Please try again.",
				variant: "destructive",
			})
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="grid gap-6 lg:grid-cols-3">
				<div className="lg:col-span-2 space-y-6">
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
						</CardContent>
					</Card>
				</div>

				<div className="space-y-6">
					<Card className="rounded-md shadow-none">
						<CardHeader>
							<CardTitle>Status & Settings</CardTitle>
							<CardDescription>Company status and display settings</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="status">Status</Label>
								<Select
									value={formData.status}
									onValueChange={(value: CompanyStatus) => setFormData((prev) => ({ ...prev, status: value }))}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="ACTIVE">Active</SelectItem>
										<SelectItem value="INACTIVE">Inactive</SelectItem>
										<SelectItem value="SOLD">Sold</SelectItem>
										<SelectItem value="ACQUIRED">Acquired</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="flex items-center space-x-2">
								<Checkbox
									id="featured"
									checked={formData.featured}
									onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked as boolean }))}
								/>
								<Label htmlFor="featured">Featured company</Label>
							</div>

							<div className="space-y-2">
								<Label htmlFor="sortOrder">Sort Order</Label>
								<Input
									id="sortOrder"
									type="number"
									value={formData.sortOrder}
									onChange={(e) => setFormData((prev) => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
									placeholder="0"
								/>
							</div>
						</CardContent>
					</Card>

					<Card className="rounded-md shadow-none">
						<CardHeader>
							<CardTitle>Images</CardTitle>
							<CardDescription>Company logo and featured image</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="logo">Logo URL</Label>
								<Input
									id="logo"
									value={formData.logo}
									onChange={(e) => setFormData((prev) => ({ ...prev, logo: e.target.value }))}
									placeholder="https://example.com/logo.png"
								/>
								<div className="text-sm text-muted-foreground">
									Or upload a new logo:
								</div>
								<Input
									type="file"
									accept="image/*"
									onChange={(e) => {
										const file = e.target.files?.[0]
										if (file) handleImageUpload(file, 'logo')
									}}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="image">Featured Image URL</Label>
								<Input
									id="image"
									value={formData.image}
									onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
									placeholder="https://example.com/image.png"
								/>
								<div className="text-sm text-muted-foreground">
									Or upload a new image:
								</div>
								<Input
									type="file"
									accept="image/*"
									onChange={(e) => {
										const file = e.target.files?.[0]
										if (file) handleImageUpload(file, 'image')
									}}
								/>
							</div>
						</CardContent>
					</Card>
				</div>
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
