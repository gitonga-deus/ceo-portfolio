import { prisma } from "@/lib/prisma"
import type { BlogPost, Category, Tag } from "@prisma/client"

export type BlogPostWithRelations = BlogPost & {
    author: {
        id: string
        name: string
    }
    category: Category | null
    tags: {
        tag: Tag
    }[]
}

export async function getBlogPosts(options?: {
    published?: boolean
    categorySlug?: string
    tagSlug?: string
    limit?: number
    skip?: number
}) {
    const { published = true, categorySlug, tagSlug, limit, skip = 0 } = options || {}

    const where: any = {}

    if (published) {
        where.published = true
    }

    if (categorySlug) {
        where.category = {
            slug: categorySlug,
        }
    }

    if (tagSlug) {
        where.tags = {
            some: {
                tag: {
                    slug: tagSlug,
                },
            },
        }
    }

    const posts = await prisma.blogPost.findMany({
        where,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                },
            },
            category: true,
            tags: {
                include: {
                    tag: true,
                },
            },
        },
        orderBy: {
            publishedAt: "desc",
        },
        take: limit,
        skip,
    })

    return posts
}

export async function getBlogPostBySlug(slug: string) {
    const post = await prisma.blogPost.findUnique({
        where: {
            slug,
            published: true,
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                },
            },
            category: true,
            tags: {
                include: {
                    tag: true,
                },
            },
        },
    })

    return post
}

export async function getCategories() {
    const categories = await prisma.category.findMany({
        include: {
            _count: {
                select: {
                    blogPosts: {
                        where: {
                            published: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            name: "asc",
        },
    })

    return categories
}

export async function getTags() {
    const tags = await prisma.tag.findMany({
        include: {
            _count: {
                select: {
                    blogPosts: {
                        where: {
                            blogPost: {
                                published: true,
                            },
                        },
                    },
                },
            },
        },
        orderBy: {
            name: "asc",
        },
    })

    return tags
}

export async function getFeaturedPost() {
    // For now, get the most recent post as featured
    const post = await prisma.blogPost.findFirst({
        where: {
            published: true,
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                },
            },
            category: true,
            tags: {
                include: {
                    tag: true,
                },
            },
        },
        orderBy: {
            publishedAt: "desc",
        },
    })

    return post
}
