import { Suspense } from "react"
import { PostEditForm } from "@/components/admin/post-edit-form"

interface EditPostPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    const { id } = await params

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
                <p className="text-muted-foreground">Update your blog post content and settings.</p>
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <PostEditForm postId={id} />
            </Suspense>
        </div>
    )
}
