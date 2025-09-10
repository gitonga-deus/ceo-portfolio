import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Clock, ArrowLeft, ArrowRight } from "lucide-react"
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog"
import { calculateReadTime, formatDate } from "@/lib/utils/blog-utils"
import type { Metadata } from "next"
import { TiptapContent } from "@/components/ui/tiptap-content"
import { generateMetadata as generateSEOMetadata, generateArticleStructuredData } from "@/lib/seo"
import { StructuredData } from "@/components/seo/structured-data"
import { FadeIn } from "@/components/animations/fade-in"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { HoverScale } from "@/components/animations/hover-scale"
import { PageTransition } from "@/components/animations/page-transition"


interface BlogPostPageProps {
	params: Promise<{
		slug: string
	}>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params
	const post = await getBlogPostBySlug(slug)

	if (!post) {
		return generateSEOMetadata({
			title: "Post Not Found",
			description: "The blog post you're looking for could not be found.",
			noIndex: true,
		})
	}

	return generateSEOMetadata({
		title: post.title,
		description: post.excerpt || `Read ${post.title} by Steve Down`,
		keywords: post.category ? [post.category.name, "blog", "article"] : ["blog", "article"],
		image: post.featureImage || undefined,
		url: `/blog/${post.slug}`,
		type: "article",
		publishedTime: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
		modifiedTime: post.updatedAt.toISOString(),
		author: "Steve Down",
	})
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params
	const post = await getBlogPostBySlug(slug)

	if (!post) {
		notFound()
	}

	// Get related posts from the same category
	const relatedPosts = await getBlogPosts({
		categorySlug: post.category?.slug,
		limit: 3,
	}).then((posts) => posts.filter((p) => p.id !== post.id).slice(0, 2))

	const structuredData = generateArticleStructuredData({
		title: post.title,
		description: post.excerpt || `Read ${post.title} by Steve Down`,
		url: `/blog/${post.slug}`,
		image: post.featureImage || undefined,
		publishedTime: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
		modifiedTime: post.updatedAt.toISOString(),
		author: "Steve Down",
	})

	return (
		<PageTransition>
			<StructuredData data={structuredData} />
			<div className="py-10 px-4">
				<div className="container max-w-5xl mx-auto">
					{/* Back to Blog */}
					<FadeIn className="mt-24">
						<HoverScale>
							<Button variant="ghost" asChild className="mb-8">
								<Link href="/blog">
									<ArrowLeft className="mr-2 h-4 w-4" />
									Back to Blog
								</Link>
							</Button>
						</HoverScale>
					</FadeIn>

					{/* Article Header */}
					<header className="mb-12">
						<FadeIn delay={0.2}>
							<div className="flex items-center gap-2 mb-4">
								{post.category &&
									<Badge variant="outline" className="rounded-full px-4 py-1">
										{post.category.name}
									</Badge>}

								{post.tags.map(({ tag }) => (
									<Badge key={tag.id} variant="secondary" className="rounded-full px-4 py-1">
										{tag.name}
									</Badge>
								))}
							</div>
						</FadeIn>

						<FadeIn delay={0.4}>
							<h1 className="font-heading font-black text-2xl md:text-3xl lg:text-4xl mb-6 text-balance">{post.title}</h1>
						</FadeIn>

						<FadeIn delay={0.6}>
							{post.excerpt && <p className="text-xl text-muted-foreground mb-6 text-pretty">{post.excerpt}</p>}
						</FadeIn>

						<div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
							<div className="flex items-center gap-2">
								<span>By {post.author.name}</span>
							</div>
							<div className="flex items-center gap-1">
								<CalendarDays className="h-4 w-4" />
								{formatDate(post.publishedAt || post.createdAt)}
							</div>
							<div className="flex items-center gap-1">
								<Clock className="h-4 w-4" />
								{calculateReadTime(post.content)}
							</div>
						</div>

						{/* Featured Image */}
						{post.featureImage && (
							<div className="relative h-64 md:h-120 w-full rounded-lg overflow-hidden mb-8">
								<Image
									src={post.featureImage}
									alt={post.title}
									fill
									className="object-cover"
									priority
								/>
							</div>
						)}
					</header>

					{/* Article Content */}
					<article className="mb-12">
						<TiptapContent content={post.content} immediatelyRender={false} />
					</article>

					{/* Tags */}
					{post.tags.length > 0 && (
						<div className="mb-12">
							<h3 className="font-heading font-bold text-lg mb-4">Tags</h3>
							<div className="flex flex-wrap gap-2">
								{post.tags.map(({ tag }) => (
									<Button key={tag.id} variant="outline" size="sm" asChild>
										<Link href={`/blog?tag=${tag.slug}`}>{tag.name}</Link>
									</Button>
								))}
							</div>
						</div>
					)}

					{/* Related Posts */}
					{relatedPosts.length > 0 && (
						<div className="mb-12">
							<h3 className="font-heading font-bold text-2xl mb-6">Related Posts</h3>
							<div className="grid md:grid-cols-2 gap-6">
								{relatedPosts.map((relatedPost) => (
									<Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
										<CardContent className="p-6">
											<div className="flex items-center gap-2 mb-3">
												{relatedPost.category && (
													<Badge variant="outline" className="text-xs">
														{relatedPost.category.name}
													</Badge>
												)}
												<span className="text-xs text-muted-foreground">{calculateReadTime(relatedPost.content)}</span>
											</div>
											<h4 className="font-heading font-bold text-lg mb-2 text-balance">{relatedPost.title}</h4>
											<p className="text-muted-foreground text-sm mb-4">{relatedPost.excerpt}</p>
											<Button variant="ghost" size="sm" asChild>
												<Link href={`/blog/${relatedPost.slug}`}>
													Read More <ArrowRight className="ml-1 h-3 w-3" />
												</Link>
											</Button>
										</CardContent>
									</Card>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</PageTransition>
	)
}

