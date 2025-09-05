import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import { prisma } from "@/lib/prisma"

async function getTags() {
    return prisma.tag.findMany({
        include: {
            _count: {
                select: { blogPosts: true },
            }
        },
        orderBy: { name: "asc" }
    })
}

export default async function TagsPage() {
    const tags = await getTags()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-heading font-bold leading-relaxed">Tags</h2>
                    <p className="text-muted-foreground">Manage tags to help organize and categorize your content</p>
                </div>
                <Button asChild>
                    <Link href="/admin/tags/new">
                        <Plus className="mr-2 h-4 w-4" />
                        New Tag
                    </Link>
                </Button>
            </div>

            <Card className="rounded-md shadow-none">
                <CardHeader>
                    <CardTitle>All Tags</CardTitle>
                    <CardDescription>Manage your blog post tags</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {tags.map((tag) => (
                            <div
                                key={tag.id}
                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-medium">{tag.name}</h4>
                                        <Badge variant="outline" className="text-xs">
                                            {tag._count.blogPosts}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Slug: {tag.slug}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/admin/tags/${tag.id}/edit`}>
                                            <Edit className="h-3 w-3" />
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {tags.length === 0 && (
                            <div className="col-span-full text-center py-12">
                                <p className="text-muted-foreground mb-4">No tags found</p>
                                <Button asChild>
                                    <Link href="/admin/tags/new">Create your first tag</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
