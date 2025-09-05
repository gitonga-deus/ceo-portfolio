import { Suspense } from "react"
import { PostEditForm } from "@/components/admin/post-edit-form"

interface EditPostPageProps {
    params: {
        id: string
    }
}

export default function EditPostPage({ params }: EditPostPageProps) {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
                <p className="text-muted-foreground">Update your blog post content and settings.</p>
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <PostEditForm postId={params.id} />
            </Suspense>
        </div>
    )
}
