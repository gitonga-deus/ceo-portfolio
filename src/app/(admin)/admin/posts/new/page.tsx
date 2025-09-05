import { PostForm } from "@/components/admin/post-form"
import { getCategories, getTags } from "@/lib/blog"

export default async function NewPostPage() {
	const [categories, tags] = await Promise.all([getCategories(), getTags()])

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-heading font-bold leading-relaxed">Create New Post</h2>
				<p className="text-muted-foreground">Write and publish a new blog post</p>
			</div>

			<PostForm categories={categories} tags={tags} />
		</div>
	)
}
