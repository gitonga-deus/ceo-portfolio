import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { PostActions } from "@/components/admin/post-actions"

async function getPosts() {
	return prisma.blogPost.findMany({
		include: {
			category: true,
			author: {
				select: { name: true },
			},
			_count: {
				select: { tags: true },
			},
		},
		orderBy: { createdAt: "desc" },
	})
}

export default async function PostsPage() {
	const posts = await getPosts()

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-heading font-bold leading-relaxed">Blog Posts</h2>
					<p className="text-muted-foreground">Manage your blog content</p>
				</div>
				<Button asChild>
					<Link href="/admin/posts/new">
						<Plus className="mr-2 h-4 w-4" />
						New Post
					</Link>
				</Button>
			</div>

			<Card className="rounded-md shadow-none">
				<CardHeader>
					<CardTitle>All Posts</CardTitle>
					<CardDescription>A list of all your blog posts</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{posts.map((post) => (
							<div
								key={post.id}
								className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
							>
								<div className="space-y-2 flex-1">
									<div className="flex items-center gap-2">
										<h4 className="font-medium text-lg">{post.title}</h4>
										<Badge variant={post.published ? "default" : "secondary"} className="rounded-full px-3 py-0.5">
											{post.published ? "Published" : "Draft"}
										</Badge>
										{post.category && <Badge variant="outline" className="rounded-full px-3 py-0.5">{post.category.name}</Badge>}
									</div>
									<p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
									<div className="flex items-center gap-4 text-xs text-muted-foreground">
										<span>By {post.author.name}</span>
										<span>•</span>
										<span>{new Date(post.createdAt).toLocaleDateString()}</span>
										<span>•</span>
										<span>{post._count.tags} tags</span>
									</div>
								</div>
								<div className="flex items-center gap-2">
									{post.published && (
										<Button variant="ghost" size="sm" asChild>
											<Link href={`/blog/${post.slug}`} target="_blank">
												<Eye className="h-4 w-4" />
											</Link>
										</Button>
									)}
									<Button variant="ghost" size="sm" asChild>
										<Link href={`/admin/posts/${post.id}/edit`}>
											<Edit className="h-4 w-4" />
										</Link>
									</Button>
									<PostActions postId={post.id} />
								</div>
							</div>
						))}
						{posts.length === 0 && (
							<div className="text-center py-12">
								<p className="text-muted-foreground mb-4">No posts found</p>
								<Button asChild>
									<Link href="/admin/posts/new">Create your first post</Link>
								</Button>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
