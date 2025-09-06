import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderOpen, Tag } from "lucide-react"
import { CategoriesList } from "@/components/admin/categories-list"
import { TagsList } from "@/components/admin/tags-list"
import { Skeleton } from "@/components/ui/skeleton"

export default function ContentManagementPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-heading font-bold leading-relaxed">Content Management</h1>
					<p className="text-muted-foreground">
						Manage categories and tags for your blog posts
					</p>
				</div>
			</div>

			<Tabs defaultValue="categories" className="space-y-6">
				<TabsList className="grid w-full grid-cols-2 max-w-none h-10 rounded">
					<TabsTrigger value="categories" className="flex items-center gap-2 rounded">
						<FolderOpen className="h-4 w-4" />
						Categories
					</TabsTrigger>
					<TabsTrigger value="tags" className="flex items-center gap-2 rounded">
						<Tag className="h-4 w-4" />
						Tags
					</TabsTrigger>
				</TabsList>

				<TabsContent value="categories" className="space-y-6">
					<Card className="rounded-md shadow-none">
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="flex items-center gap-2 mb-2">
										<FolderOpen className="h-5 w-5" />
										Blog Categories
									</CardTitle>
									<CardDescription>
										Organize your blog posts into categories for better navigation
									</CardDescription>
								</div>

							</div>
						</CardHeader>
						<CardContent>
							<Suspense fallback={<CategoriesListSkeleton />}>
								<CategoriesList />
							</Suspense>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="tags" className="space-y-6">
					<Card className="rounded-md shadow-none">
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="flex items-center gap-2 mb-2">
										<Tag className="h-5 w-5" />
										Blog Tags
									</CardTitle>
									<CardDescription>
										Create tags to help readers find related content
									</CardDescription>
								</div>

							</div>
						</CardHeader>
						<CardContent>
							<Suspense fallback={<TagsListSkeleton />}>
								<TagsList />
							</Suspense>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}

function CategoriesListSkeleton() {
	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<Skeleton className="h-8 w-32" />
				<Skeleton className="h-10 w-32" />
			</div>
			<div className="space-y-2">
				{Array.from({ length: 5 }).map((_, i) => (
					<div key={i} className="flex items-center justify-between p-4 border rounded-lg">
						<div className="space-y-2">
							<Skeleton className="h-5 w-40" />
							<Skeleton className="h-4 w-60" />
						</div>
						<div className="flex gap-2">
							<Skeleton className="h-8 w-16" />
							<Skeleton className="h-8 w-16" />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

function TagsListSkeleton() {
	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<Skeleton className="h-8 w-32" />
				<Skeleton className="h-10 w-32" />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{Array.from({ length: 9 }).map((_, i) => (
					<div key={i} className="flex items-center justify-between p-4 border rounded-lg">
						<div className="space-y-2">
							<Skeleton className="h-5 w-24" />
							<Skeleton className="h-4 w-16" />
						</div>
						<div className="flex gap-2">
							<Skeleton className="h-8 w-8" />
							<Skeleton className="h-8 w-8" />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
