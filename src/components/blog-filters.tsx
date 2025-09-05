"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { Category } from "@prisma/client"

interface BlogFiltersProps {
	categories: (Category & {
		_count: {
			blogPosts: number
		}
	})[]
}

export function BlogFilters({ categories }: BlogFiltersProps) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const currentCategory = searchParams.get("category")
	const currentTag = searchParams.get("tag")

	const handleCategoryFilter = (categorySlug: string) => {
		const params = new URLSearchParams(searchParams.toString())
		if (currentCategory === categorySlug) {
			params.delete("category")
		} else {
			params.set("category", categorySlug)
			params.delete("tag") // Clear tag filter when selecting category
		}
		router.push(`/blog?${params.toString()}`)
	}

	const clearFilters = () => {
		router.push("/blog")
	}

	const hasActiveFilters = currentCategory || currentTag

	return (
		<div className="mb-8">
			<div className="flex flex-wrap items-center gap-4 mb-6">
				<span className="text-sm font-medium text-muted-foreground">Filter by category:</span>
				{categories.map((category) => (
					<Button
						key={category.id}
						variant={currentCategory === category.slug ? "default" : "outline"}
						size="sm"
						onClick={() => handleCategoryFilter(category.slug)}
						className="text-sm h-9"
					>
						{category.name}
						<Badge variant="secondary" className="ml-2 text-xs rounded-full">
							{category._count.blogPosts}
						</Badge>
					</Button>
				))}
			</div>

			{hasActiveFilters && (
				<div className="flex items-center gap-2">
					<span className="text-sm text-muted-foreground">Active filters:</span>
					{currentCategory && (
						<Badge variant="secondary" className="gap-1 px-3 py-1.5 rounded-full">
							Category: {categories.find((c) => c.slug === currentCategory)?.name}
							<Button
								variant="ghost"
								size="sm"
								className="h-auto p-0 hover:bg-transparent"
								onClick={() => {
									const params = new URLSearchParams(searchParams.toString())
									params.delete("category")
									router.push(`/blog?${params.toString()}`)
								}}
							>
								<X className="h-3 w-3" />
							</Button>
						</Badge>
					)}
					{currentTag && (
						<Badge variant="secondary" className="gap-1 px-3 py-1.5 rounded-full">
							Tag: {currentTag}
							<Button
								variant="ghost"
								size="sm"
								className="h-auto p-0 hover:bg-transparent"
								onClick={() => {
									const params = new URLSearchParams(searchParams.toString())
									params.delete("tag")
									router.push(`/blog?${params.toString()}`)
								}}
							>
								<X className="h-3 w-3" />
							</Button>
						</Badge>
					)}
					<Button variant="ghost" onClick={clearFilters}>
						Clear all
					</Button>
				</div>
			)}
		</div>
	)
}
