"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

import { X } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { generateSlug } from "@/lib/utils/blog-utils"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { FeatureImageUpload } from "@/components/ui/feature-image-upload"
import type { Category, Tag } from "@prisma/client"

interface PostFormProps {
	categories: Category[]
	tags: Tag[]
	initialData?: {
		id: string
		title: string
		slug: string
		content: string
		excerpt: string
		featureImage: string | null
		published: boolean
		categoryId: string | null
		tagIds: string[]
	}
}

export function PostForm({ categories, tags, initialData }: PostFormProps) {
	const router = useRouter()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [formData, setFormData] = useState({
		title: initialData?.title || "",
		slug: initialData?.slug || "",
		content: initialData?.content || "",
		excerpt: initialData?.excerpt || "",
		featureImage: initialData?.featureImage || "",
		published: initialData?.published || false,
		categoryId: initialData?.categoryId || "",
		tagIds: initialData?.tagIds || [],
	})

	const handleTitleChange = (title: string) => {
		setFormData((prev) => ({
			...prev,
			title,
			slug: generateSlug(title),
		}))
	}

	const handleTagToggle = (tagId: string) => {
		setFormData((prev) => ({
			...prev,
			tagIds: prev.tagIds.includes(tagId) ? prev.tagIds.filter((id) => id !== tagId) : [...prev.tagIds, tagId],
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			const url = initialData ? `/api/admin/posts/${initialData.id}` : "/api/admin/posts"

			const method = initialData ? "PUT" : "POST"

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})

			if (!response.ok) {
				throw new Error("Failed to save post")
			}

			toast({
				title: initialData ? "Post updated" : "Post created",
				description: `The blog post has been successfully ${initialData ? "updated" : "created"}.`,
			})

			router.push("/admin/posts")
			router.refresh()
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to save the post. Please try again.",
				variant: "destructive",
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<Card className="rounded-md shadow-none">
				<CardHeader>
					<CardTitle>Post Content</CardTitle>
					<CardDescription>The main content of your blog post</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="title">Title</Label>
							<Input
								id="title"
								value={formData.title}
								onChange={(e) => handleTitleChange(e.target.value)}
								placeholder="Enter post title"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="slug">Slug</Label>
							<Input
								id="slug"
								value={formData.slug}
								onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
								placeholder="post-slug"
								required
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="excerpt">Excerpt</Label>
						<Textarea
							id="excerpt"
							value={formData.excerpt}
							onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
							placeholder="Brief description of the post"
							rows={3}
						/>
					</div>

					<div className="space-y-2">
						<Label>Feature Image</Label>
						<FeatureImageUpload
							value={formData.featureImage}
							onChange={(url) => setFormData((prev) => ({ ...prev, featureImage: url }))}
							onRemove={() => setFormData((prev) => ({ ...prev, featureImage: "" }))}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="content">Content</Label>
						<RichTextEditor
							value={formData.content}
							onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
							placeholder="Write your post content here..."
						/>
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-6 md:grid-cols-3">
				<Card className="rounded-md shadow-none">
					<CardHeader>
						<CardTitle>Publish Settings</CardTitle>
						<CardDescription>Control the visibility of your post</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center space-x-2">
							<Checkbox
								id="published"
								checked={formData.published}
								onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, published: checked as boolean }))}
							/>
							<Label htmlFor="published">Publish immediately</Label>
						</div>
					</CardContent>
				</Card>

				<Card className="rounded-md shadow-none">
					<CardHeader>
						<CardTitle>Category</CardTitle>
						<CardDescription>Choose a category for your post</CardDescription>
					</CardHeader>
					<CardContent>
						<Select
							value={formData.categoryId}
							onValueChange={(value) => setFormData((prev) => ({ ...prev, categoryId: value }))}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select category" />
							</SelectTrigger>
							<SelectContent>
								{categories.map((category) => (
									<SelectItem key={category.id} value={category.id}>
										{category.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</CardContent>
				</Card>

				<Card className="rounded-md shadow-none">
					<CardHeader>
						<CardTitle>Tags</CardTitle>
						<CardDescription>Add relevant tags to your post</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex flex-wrap gap-2">
							{formData.tagIds.map((tagId) => {
								const tag = tags.find((t) => t.id === tagId)
								return tag ? (
									<Badge key={tagId} variant="secondary" className="gap-1">
										{tag.name}
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="h-auto p-0 hover:bg-transparent"
											onClick={() => handleTagToggle(tagId)}
										>
											<X className="h-3 w-3" />
										</Button>
									</Badge>
								) : null
							})}
						</div>

						<div className="space-y-2">
							{tags.map((tag) => (
								<div key={tag.id} className="flex items-center space-x-2">
									<Checkbox
										id={`tag-${tag.id}`}
										checked={formData.tagIds.includes(tag.id)}
										onCheckedChange={() => handleTagToggle(tag.id)}
									/>
									<Label htmlFor={`tag-${tag.id}`} className="text-sm">
										{tag.name}
									</Label>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="flex items-center gap-4">
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Saving..." : initialData ? "Update Post" : "Create Post"}
				</Button>
				<Button type="button" variant="outline" onClick={() => router.back()}>
					Cancel
				</Button>
			</div>
		</form>
	)
}
