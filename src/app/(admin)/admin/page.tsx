import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, FolderOpen, Users, Eye, Building2 } from "lucide-react"
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
			color: "blue",
		},
		{
			title: "Content",
			value: stats.totalCategories + stats.totalTags,
			description: `${stats.totalCategories} categories, ${stats.totalTags} tags`,
			icon: FolderOpen,
			href: "/admin/content",
			color: "green",
		},
		{
			title: "Companies",
			value: "5+",
			description: "Portfolio companies",
			icon: Building2,
			href: "/admin/companies",
			color: "purple",
		},
		{
			title: "Subscribers",
			value: stats.totalSubscribers,
			description: "Newsletter subscribers",
			icon: Users,
			href: "/admin/subscribers",
			color: "orange",
		},
	]

	const getColorClasses = (color: string) => {
		switch (color) {
			case "blue":
				return "bg-blue-50 text-blue-700 border-blue-200"
			case "green":
				return "bg-green-50 text-green-700 border-green-200"
			case "purple":
				return "bg-purple-50 text-purple-700 border-purple-200"
			case "orange":
				return "bg-orange-50 text-orange-700 border-orange-200"
			default:
				return "bg-gray-50 text-gray-700 border-gray-200"
		}
	}

	return (
		<div className="space-y-8">
			{/* Welcome Section */}
			<div className="bg-white rounded-lg border border-gray-200 p-6">
				<h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Welcome back!</h2>
				<p className="text-gray-600">Here's what's happening with your portfolio.</p>
			</div>

			{/* Stats Grid */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{statCards.map((stat) => {
					const Icon = stat.icon
					return (
						<Card key={stat.title} className="shadow-none hover:shadow-sm transition-all duration-200 rounded-md cursor-pointer border-gray-200 bg-white">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
								<CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
								<div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
									<Icon className="h-5 w-5" />
								</div>
							</CardHeader>
							<CardContent>
								<div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
								<p className="text-sm text-gray-600 mb-3">{stat.description}</p>
								<Button variant="outline" size="sm" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50" asChild>
									<Link href={stat.href}>View all</Link>
								</Button>
							</CardContent>
						</Card>
					)
				})}
			</div>

			{/* Quick Actions */}
			<Card className="bg-white border-gray-200 rounded-md shadow-none">
				<CardHeader>
					<CardTitle className="text-gray-900">Quick Actions</CardTitle>
					<CardDescription className="text-gray-600">Common tasks to manage your content</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<Button asChild className="h-auto p-4 flex-col bg-[#049AD1]/80 hover:bg-[#049AD1]/90">
							<Link href="/admin/posts/new">
								<FileText className="h-6 w-6 mb-2" />
								<span className="text-sm font-medium">New Post</span>
							</Link>
						</Button>
						<Button variant="outline" asChild className="h-auto p-4 flex-col border-gray-300 text-gray-700 hover:bg-gray-50">
							<Link href="/admin/content">
								<FolderOpen className="h-6 w-6 mb-2" />
								<span className="text-sm font-medium">Content</span>
							</Link>
						</Button>
						<Button variant="outline" asChild className="h-auto p-4 flex-col border-gray-300 text-gray-700 hover:bg-gray-50">
							<Link href="/admin/newsletter/compose">
								<Users className="h-6 w-6 mb-2" />
								<span className="text-sm font-medium">Newsletter</span>
							</Link>
						</Button>
						<Button variant="outline" asChild className="h-auto p-4 flex-col border-gray-300 text-gray-700 hover:bg-gray-50">
							<Link href="/" target="_blank">
								<Eye className="h-6 w-6 mb-2" />
								<span className="text-sm font-medium">View Site</span>
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
										<Badge variant={post.published ? "default" : "secondary"} className="bg-[#049AD1]/80 rounded-full px-3 py-0.5">
											{post.published ? "Published" : "Draft"}
										</Badge>
										{post.category && <Badge variant="outline" className="rounded-full px-3 py-0.5">{post.category.name}</Badge>}
									</div>
									<p className="text-sm text-muted-foreground">
										By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
									</p>
								</div>
								<Button variant="outline" className="rounded-md px-6" asChild>
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
