"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { FeatureImageUpload } from "@/components/ui/feature-image-upload"

interface PostEditFormProps {
    postId: string
}

interface Post {
    id: string
    title: string
    slug: string
    content: string
    excerpt: string
    featureImage: string | null
    published: boolean
    categoryId: string | null
    category?: { id: string; name: string }
    tags: Array<{ tag: { id: string; name: string } }>
}

interface Category {
    id: string
    name: string
}

interface Tag {
    id: string
    name: string
}

export function PostEditForm({ postId }: PostEditFormProps) {
    const router = useRouter()
    const [post, setPost] = useState<Post | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const [tags, setTags] = useState<Tag[]>([])
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        featureImage: "",
        published: false,
        categoryId: "",
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postRes, categoriesRes, tagsRes] = await Promise.all([
                    fetch(`/api/admin/posts/${postId}`),
                    fetch("/api/admin/categories"),
                    fetch("/api/admin/tags"),
                ])

                if (!postRes.ok) throw new Error("Failed to fetch post")

                const postData = await postRes.json()
                const categoriesData = await categoriesRes.json()
                const tagsData = await tagsRes.json()

                setPost(postData)
                setCategories(categoriesData)
                setTags(tagsData)
                setSelectedTags(postData.tags.map((t: any) => t.tag.id))
                setFormData({
                    title: postData.title,
                    slug: postData.slug,
                    content: postData.content,
                    excerpt: postData.excerpt,
                    featureImage: postData.featureImage || "",
                    published: postData.published,
                    categoryId: postData.categoryId || "",
                })
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [postId])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)

        const data = {
            title: formData.title,
            slug: formData.slug,
            content: formData.content,
            excerpt: formData.excerpt,
            featureImage: formData.featureImage || null,
            published: formData.published,
            categoryId: formData.categoryId || null,
            tagIds: selectedTags,
        }

        try {
            const response = await fetch(`/api/admin/posts/${postId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                router.push("/admin/posts")
            } else {
                console.error("Failed to update post")
            }
        } catch (error) {
            console.error("Error updating post:", error)
        } finally {
            setSaving(false)
        }
    }

    const toggleTag = (tagId: string) => {
        setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]))
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!post) {
        return <div>Post not found</div>
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="rounded-md shadow-none">
                <CardHeader>
                    <CardTitle>Post Content</CardTitle>
                    <CardDescription>Update your blog post content and details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="Enter post title"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                value={formData.slug}
                                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                placeholder="post-slug"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea
                            id="excerpt"
                            value={formData.excerpt}
                            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                            placeholder="Brief description of the post"
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Feature Image</Label>
                        <FeatureImageUpload
                            value={formData.featureImage}
                            onChange={(url) => setFormData(prev => ({ ...prev, featureImage: url }))}
                            onRemove={() => setFormData(prev => ({ ...prev, featureImage: "" }))}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <RichTextEditor
                            value={formData.content}
                            onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                            placeholder="Write your post content here..."
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="rounded-md shadow-none">
                    <CardHeader>
                        <CardTitle>Publish Settings</CardTitle>
                        <CardDescription>Control the visibility of your post</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="published"
                                checked={formData.published}
                                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked as boolean }))}
                            />
                            <Label htmlFor="published">Publish immediately</Label>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-md shadow-none">
                    <CardHeader>
                        <CardTitle>Category</CardTitle>
                        <CardDescription>Choose a category for your post</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Select
                            value={formData.categoryId || ""}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                <Card className="rounded-md shadow-none">
                    <CardHeader>
                        <CardTitle>Tags</CardTitle>
                        <CardDescription>Add relevant tags to your post</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {selectedTags.map((tagId) => {
                                const tag = tags.find((t) => t.id === tagId)
                                return tag ? (
                                    <Badge key={tagId} variant="secondary" className="gap-1">
                                        {tag.name}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="h-auto p-0 hover:bg-transparent"
                                            onClick={() => toggleTag(tagId)}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </Badge>
                                ) : null
                            })}
                        </div>

                        <div className="space-y-2">
                            {tags.map((tag) => (
                                <div key={tag.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`tag-${tag.id}`}
                                        checked={selectedTags.includes(tag.id)}
                                        onCheckedChange={() => toggleTag(tag.id)}
                                    />
                                    <Label htmlFor={`tag-${tag.id}`} className="text-sm">
                                        {tag.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex items-center gap-4">
                <Button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Update Post"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/admin/posts")}>
                    Cancel
                </Button>
            </div>
        </form>
    )
}
