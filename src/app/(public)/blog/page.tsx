import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock } from "lucide-react"
import { getBlogPosts, getCategories } from "@/lib/blog"
import { calculateReadTime, formatDate } from "@/lib/utils/blog-utils"
import { BlogFilters } from "@/components/blog-filters"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = generateSEOMetadata({
    title: "Blog",
    description: "Insights on entrepreneurship, business building, and the future of innovation. Read the latest articles and thoughts from Steve Johnson.",
    keywords: ["blog", "entrepreneurship", "business", "innovation", "leadership", "startup", "technology"],
    url: "/blog",
})

interface BlogPageProps {
    searchParams: Promise<{
        category?: string
        tag?: string
    }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const params = await searchParams
    const { category, tag } = params

    const [posts, categories] = await Promise.all([
        getBlogPosts({
            categorySlug: category,
            tagSlug: tag,
            limit: 20,
        }),
        getCategories(),
    ])

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-5xl px-4">
                {/* Header Section */}
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
                        Blog
                    </h2>
                    <p className="text-center text-gray-500 md:text-lg">
                        Insights on entrepreneurship, business building, and the future of innovation.
                    </p>
                </div>

                <BlogFilters categories={categories} />

                {/* Blog Grid */}
                <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-1 xl:gap-16">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <article key={post.id} className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
                                {/* Feature Image */}
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group relative block h-64 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-40 md:w-40 lg:h-56 lg:w-56"
                                >
                                    {post.featureImage ? (
                                        <Image
                                            src={post.featureImage}
                                            alt={post.title}
                                            fill
                                            className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                            <span className="text-primary/60 font-medium text-sm">No Image</span>
                                        </div>
                                    )}
                                </Link>

                                {/* Content */}
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm text-gray-400">
                                        {formatDate(post.publishedAt || post.createdAt)}
                                    </span>

                                    <h2 className="text-xl font-bold text-gray-800">
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="transition duration-100 hover:text-primary active:text-primary"
                                        >
                                            {post.title}
                                        </Link>
                                    </h2>

                                    <p className="text-gray-500 line-clamp-2">
                                        {post.excerpt || "No excerpt available."}
                                    </p>

                                    {/* Category and Tags */}
                                    <div className="flex items-center gap-2 mb-2">
                                        {post.category && (
                                            <Badge variant="secondary" className="text-xs rounded-full">
                                                {post.category.name}
                                            </Badge>
                                        )}
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex gap-1">
                                                {post.tags.slice(0, 2).map((tag) => (
                                                    <Badge key={tag.id} variant="outline" className="text-xs rounded-full">
                                                        {tag.tag.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="font-semibold text-primary hover:text-primary/80 active:text-primary underline underline-offset-2 hover:underline-offset-4 transition duration-300"
                                        >
                                            Read more
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-16">
                            <p className="text-gray-500 text-lg mb-6">No posts found matching your criteria.</p>
                            <Button asChild variant="outline">
                                <Link href="/blog">View All Posts</Link>
                            </Button>
                        </div>
                    )}
                </div>

                {posts.length > 0 && (
                    <div className="mt-20 pt-12 border-t border-border/50 text-center">
                        <h3 className="font-heading font-bold text-2xl mb-3">Stay Updated</h3>
                        <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto text-pretty">
                            Get the latest insights on entrepreneurship and business building delivered to your inbox.
                        </p>
                        <Button asChild size="lg">
                            <Link href="/#newsletter">Subscribe to Newsletter</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
