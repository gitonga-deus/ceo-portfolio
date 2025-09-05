"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Plus } from "lucide-react"
import { toast } from "sonner"

interface Tag {
	id: string
	name: string
	slug: string
	_count: {
		posts: number
	}
}

export function TagsList() {
	const [tags, setTags] = useState<Tag[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchTags()
	}, [])

	const fetchTags = async () => {
		try {
			const response = await fetch("/api/admin/tags")
			if (response.ok) {
				const data = await response.json()
				setTags(data)
			}
		} catch (error) {
			console.error("Error fetching tags:", error)
			toast.error("Failed to load tags")
		} finally {
			setLoading(false)
		}
	}

	const deleteTag = async (id: string) => {
		if (!confirm("Are you sure you want to delete this tag?")) return

		try {
			const response = await fetch(`/api/admin/tags/${id}`, {
				method: "DELETE",
			})

			if (response.ok) {
				setTags(tags.filter((tag) => tag.id !== id))
				toast.success("Tag deleted successfully")
			} else {
				toast.error("Failed to delete tag")
			}
		} catch (error) {
			console.error("Error deleting tag:", error)
			toast.error("Failed to delete tag")
		}
	}

	if (loading) {
		return <div>Loading tags...</div>
	}

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold">Tags ({tags.length})</h3>
				<Button asChild>
					<Link href="/admin/tags/new">
						<Plus className="h-4 w-4 mr-2" />
						Add Tag
					</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{tags.map((tag) => (
					<div
						key={tag.id}
						className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
					>
						<div className="space-y-1">
							<div className="flex items-center gap-2">
								<h4 className="font-medium">{tag.name}</h4>
								<Badge variant="outline" className="text-xs">
									{tag._count.posts}
								</Badge>
							</div>
							<p className="text-xs text-muted-foreground">/{tag.slug}</p>
						</div>
						<div className="flex items-center gap-1">
							<Button variant="ghost" size="sm" asChild>
								<Link href={`/admin/tags/${tag.id}/edit`}>
									<Edit className="h-3 w-3" />
								</Link>
							</Button>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => deleteTag(tag.id)}
								className="text-destructive hover:text-destructive"
							>
								<Trash2 className="h-3 w-3" />
							</Button>
						</div>
					</div>
				))}

				{tags.length === 0 && (
					<div className="col-span-full text-center py-8">
						<p className="text-muted-foreground mb-4">No tags found</p>
						<Button asChild>
							<Link href="/admin/tags/new">Create your first tag</Link>
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}
