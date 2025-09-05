import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import { prisma } from "@/lib/prisma"

async function getCategories() {
    return prisma.category.findMany({
        include: {
            _count: {
                select: { blogPosts: true },
            },
        },
        orderBy: { name: "asc" },
    })
}

export default async function CategoriesPage() {
    const categories = await getCategories()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-heading font-bold leading-relaxed">Categories</h2>
                    <p className="text-muted-foreground">Organize your blog content with categories</p>
                </div>
                <Button asChild>
                    <Link href="/admin/categories/new">
                        <Plus className="mr-2 h-4 w-4" />
                        New Category
                    </Link>
                </Button>
            </div>

            <Card className="rounded-md shadow-none">
                <CardHeader>
                    <CardTitle>All Categories</CardTitle>
                    <CardDescription>Manage your blog post categories</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-medium text-lg">{category.name}</h4>
                                        <Badge variant="outline">{category._count.blogPosts} posts</Badge>
                                    </div>
                                    {category.description && <p className="text-sm text-muted-foreground">{category.description}</p>}
                                    <p className="text-xs text-muted-foreground">Slug: {category.slug}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/admin/categories/${category.id}/edit`}>
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {categories.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground mb-4">No categories found</p>
                                <Button asChild>
                                    <Link href="/admin/categories/new">Create your first category</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
