"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewTagPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
    })

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim()
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        setFormData({
            ...formData,
            name,
            slug: generateSlug(name),
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch("/api/admin/tags", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error("Failed to create tag")
            }

            router.push("/admin/tags")
        } catch (error) {
            console.error("Error creating tag:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <Button variant="outline" asChild>
                <Link href="/admin/tags">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to tags
                </Link>
            </Button>

            <div className="flex items-center gap-4">
                <div>
                    <h2 className="text-2xl font-heading font-bold leading-relaxed">New tag</h2>
                    <p className="text-muted-foreground">Create a new tag for your blog posts</p>
                </div>
            </div>

            <Card className="rounded-md shadow-none">
                <CardHeader>
                    <CardTitle>Tag details</CardTitle>
                    <CardDescription>Enter the information for your new tag.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" value={formData.name} onChange={handleNameChange} placeholder="Tag name" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="tag-slug"
                                required
                            />
                            <p className="text-sm text-muted-foreground">
                                URL-friendly version of the name. Only lowercase letters, numbers, and hyphens.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Creating..." : "Create Tag"}
                            </Button>
                            <Button type="button" variant="outline" asChild>
                                <Link href="/admin/tags">Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
