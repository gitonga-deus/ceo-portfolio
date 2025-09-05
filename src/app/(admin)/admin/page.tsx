import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, FolderOpen, Tags, Users, Eye } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

async function getDashboardStats() {
	const [totalPosts, publishedPosts, draftPosts, totalCategories, totalTags, totalSubscribers] = await Promise.all([
		prisma.blogPost.count(),
		prisma.blogPost.count({ where: { published: true } }),
		prisma.blogPost.count({ where: { published: false } }),
		prisma.category.count(),
		prisma.tag.count(),
		prisma.newsletterSubscriber.count({ where: { status: "ACTIVE" } }),
	])

	return {
		totalPosts,
		publishedPosts,
		draftPosts,
		totalCategories,
		totalTags,
		totalSubscribers,
	}
}

async function getRecentPosts() {
	return prisma.blogPost.findMany({
		take: 5,
		orderBy: { createdAt: "desc" },
		include: {
			category: true,
			author: {
				select: { name: true },
			},
		},
	})
}

export default async function AdminDashboard() {
	const [stats, recentPosts] = await Promise.all([getDashboardStats(), getRecentPosts()])

	const statCards = [
		{
			title: "Total Posts",
			value: stats.totalPosts,
			description: `${stats.publishedPosts} published, ${stats.draftPosts} drafts`,
			icon: FileText,
			href: "/admin/posts",
		},
		{
			title: "Categories",
			value: stats.totalCategories,
			description: "Content categories",
			icon: FolderOpen,
			href: "/admin/categories",
		},
		{
			title: "Tags",
			value: stats.totalTags,
			description: "Content tags",
			icon: Tags,
			href: "/admin/tags",
		},
		{
			title: "Subscribers",
			value: stats.totalSubscribers,
			description: "Active newsletter subscribers",
			icon: Users,
			href: "/admin/subscribers",
		},
	]

	return (
		<div className="space-y-8">
			{/* Welcome Section */}
			<div>
				<h2 className="text-2xl font-heading font-bold leading-relaxed">Welcome back!</h2>
				<p className="text-muted-foreground">Here's what's happening with your portfolio.</p>
			</div>

			{/* Stats Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{statCards.map((stat) => {
					const Icon = stat.icon
					return (
						<Card key={stat.title} className="hover:shadow-xs transition-shadow shadow-none rounded-md">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
								<Icon className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent className="">
								<div className="text-2xl font-bold">{stat.value}</div>
								<p className="text-xs text-muted-foreground">{stat.description}</p>
								<Button variant="outline" size="sm" className="mt-2" asChild>
									<Link href={stat.href}>View all</Link>
								</Button>
							</CardContent>
						</Card>
					)
				})}
			</div>

			{/* Quick Actions */}
			<Card className="rounded-md shadow-none">
				<CardHeader>
					<CardTitle>Quick Actions</CardTitle>
					<CardDescription>Common tasks to manage your content</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-4">
						<Button asChild>
							<Link href="/admin/posts/new">
								<FileText className="mr-2 h-4 w-4" />
								New Blog Post
							</Link>
						</Button>
						<Button variant="outline" asChild>
							<Link href="/admin/categories/new">
								<FolderOpen className="mr-2 h-4 w-4" />
								New Category
							</Link>
						</Button>
						<Button variant="outline" asChild>
							<Link href="/admin/newsletter/compose">
								<Users className="mr-2 h-4 w-4" />
								Send Newsletter
							</Link>
						</Button>
						<Button variant="outline" asChild>
							<Link href="/" target="_blank">
								<Eye className="mr-2 h-4 w-4" />
								View Site
							</Link>
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Recent Posts */}
			<Card className="rounded-md shadow-none">
				<CardHeader>
					<CardTitle>Recent Posts</CardTitle>
					<CardDescription>Your latest blog posts</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{recentPosts.map((post) => (
							<div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
								<div className="space-y-1">
									<div className="flex items-center gap-2">
										<h4 className="font-medium">{post.title}</h4>
										<Badge variant={post.published ? "default" : "secondary"}>
											{post.published ? "Published" : "Draft"}
										</Badge>
										{post.category && <Badge variant="outline">{post.category.name}</Badge>}
									</div>
									<p className="text-sm text-muted-foreground">
										By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
									</p>
								</div>
								<Button variant="ghost" size="sm" asChild>
									<Link href={`/admin/posts/${post.id}/edit`}>Edit</Link>
								</Button>
							</div>
						))}
						{recentPosts.length === 0 && (
							<p className="text-center text-muted-foreground py-8">
								No posts yet.{" "}
								<Link href="/admin/posts/new" className="text-primary hover:underline">
									Create your first post
								</Link>
							</p>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
