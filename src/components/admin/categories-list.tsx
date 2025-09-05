"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Plus } from "lucide-react"
import { toast } from "sonner"

interface Category {
	id: string
	name: string
	slug: string
	description?: string
	_count: {
		posts: number
	}
}

export function CategoriesList() {
	const [categories, setCategories] = useState<Category[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchCategories()
	}, [])

	const fetchCategories = async () => {
		try {
			const response = await fetch("/api/admin/categories")
			if (response.ok) {
				const data = await response.json()
				setCategories(data)
			}
		} catch (error) {
			console.error("Error fetching categories:", error)
			toast.error("Failed to load categories")
		} finally {
			setLoading(false)
		}
	}

	const deleteCategory = async (id: string) => {
		if (!confirm("Are you sure you want to delete this category?")) return

		try {
			const response = await fetch(`/api/admin/categories/${id}`, {
				method: "DELETE",
			})

			if (response.ok) {
				setCategories(categories.filter((cat) => cat.id !== id))
				toast.success("Category deleted successfully")
			} else {
				toast.error("Failed to delete category")
			}
		} catch (error) {
			console.error("Error deleting category:", error)
			toast.error("Failed to delete category")
		}
	}

	if (loading) {
		return <div>Loading categories...</div>
	}

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold">Categories ({categories.length})</h3>
				<Button asChild>
					<Link href="/admin/categories/new">
						<Plus className="h-4 w-4 mr-2" />
						Add Category
					</Link>
				</Button>
			</div>

			<div className="space-y-2">
				{categories.map((category) => (
					<div
						key={category.id}
						className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
					>
						<div className="space-y-1">
							<div className="flex items-center gap-2">
								<h4 className="font-medium">{category.name}</h4>
								<Badge variant="secondary" className="text-xs">
									{category._count.posts} posts
								</Badge>
							</div>
							{category.description && (
								<p className="text-sm text-muted-foreground">{category.description}</p>
							)}
							<p className="text-xs text-muted-foreground">Slug: {category.slug}</p>
						</div>
						<div className="flex items-center gap-2">
							<Button variant="ghost" size="sm" asChild>
								<Link href={`/admin/categories/${category.id}/edit`}>
									<Edit className="h-4 w-4" />
								</Link>
							</Button>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => deleteCategory(category.id)}
								className="text-destructive hover:text-destructive"
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>
					</div>
				))}

				{categories.length === 0 && (
					<div className="text-center py-8">
						<p className="text-muted-foreground mb-4">No categories found</p>
						<Button asChild>
							<Link href="/admin/categories/new">Create your first category</Link>
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}
