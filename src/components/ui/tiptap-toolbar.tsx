"use client"

import { type Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Bold,
	Italic,
	Underline,
	Strikethrough,
	Code,
	Highlighter,
	AlignLeft,
	AlignCenter,
	AlignRight,
	AlignJustify,
	List,
	ListOrdered,
	Quote,
	Minus,
	Image,
	Link,
	Unlink,
	Table,
	Youtube,
	Undo,
	Redo,
	Type,
	Palette,
	Subscript,
	Superscript,
	CheckSquare,
	MoreHorizontal,
	Indent,
	Outdent,
	FileText,
	HelpCircle,
} from "lucide-react"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

interface TiptapToolbarProps {
	editor: Editor | null
}

export function TiptapToolbar({ editor }: TiptapToolbarProps) {
	const [linkUrl, setLinkUrl] = useState("")
	const [imageUrl, setImageUrl] = useState("")
	const [youtubeUrl, setYoutubeUrl] = useState("")
	const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
	const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
	const [isYoutubeDialogOpen, setIsYoutubeDialogOpen] = useState(false)
	const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false)

	if (!editor) {
		return null
	}

	const handleImageUpload = async (file: File) => {
		const formData = new FormData()
		formData.append("file", file)

		try {
			const response = await fetch("/api/upload/image", {
				method: "POST",
				body: formData,
			})

			if (response.ok) {
				const data = await response.json()
				editor.chain().focus().setImage({ src: data.url }).run()
				toast({
					title: "Image uploaded",
					description: "The image has been uploaded successfully.",
				})
			} else {
				throw new Error("Upload failed")
			}
		} catch (error) {
			toast({
				title: "Upload failed",
				description: "Failed to upload image. Please try again.",
				variant: "destructive",
			})
		}
	}

	const addLink = () => {
		if (linkUrl) {
			editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run()
			setLinkUrl("")
			setIsLinkDialogOpen(false)
		}
	}

	const addImage = () => {
		if (imageUrl) {
			editor.chain().focus().setImage({ src: imageUrl }).run()
			setImageUrl("")
			setIsImageDialogOpen(false)
		}
	}

	const addYoutube = () => {
		if (youtubeUrl) {
			editor.commands.setYoutubeVideo({
				src: youtubeUrl,
				width: 640,
				height: 480,
			})
			setYoutubeUrl("")
			setIsYoutubeDialogOpen(false)
		}
	}

	const addTable = () => {
		editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
	}

	return (
		<div className="z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 flex flex-wrap items-center gap-1">
			{/* Undo/Redo */}
			<div className="flex items-center gap-1">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().chain().focus().undo().run()}
					type="button"
				>
					<Undo className="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().chain().focus().redo().run()}
					type="button"
				>
					<Redo className="h-4 w-4" />
				</Button>
			</div>

			<Separator orientation="vertical" className="h-6" />

			{/* Text Formatting */}
			<div className="flex items-center gap-1">
				<Select
					value={
						editor.isActive("heading", { level: 1 }) ? "h1" :
							editor.isActive("heading", { level: 2 }) ? "h2" :
								editor.isActive("heading", { level: 3 }) ? "h3" :
									editor.isActive("heading", { level: 4 }) ? "h4" :
										editor.isActive("heading", { level: 5 }) ? "h5" :
											editor.isActive("heading", { level: 6 }) ? "h6" :
												"paragraph"
					}
					onValueChange={(value) => {
						if (value === "paragraph") {
							editor.chain().focus().setParagraph().run()
						} else {
							const level = parseInt(value.replace("h", "")) as 1 | 2 | 3 | 4 | 5 | 6
							editor.chain().focus().toggleHeading({ level }).run()
						}
					}}
				>
					<SelectTrigger className="w-32">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="paragraph">Paragraph</SelectItem>
						<SelectItem value="h1">Heading 1</SelectItem>
						<SelectItem value="h2">Heading 2</SelectItem>
						<SelectItem value="h3">Heading 3</SelectItem>
						<SelectItem value="h4">Heading 4</SelectItem>
						<SelectItem value="h5">Heading 5</SelectItem>
						<SelectItem value="h6">Heading 6</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<Separator orientation="vertical" className="h-6" />

			{/* Font Styling */}
			<div className="flex items-center gap-1">
				<Button
					variant={editor.isActive("bold") ? "default" : "ghost"}
					size="sm"
					onClick={() => editor.chain().focus().toggleBold().run()}
					type="button"
				>
					<Bold className="h-4 w-4" />
				</Button>
				<Button
					variant={editor.isActive("italic") ? "default" : "ghost"}
					size="sm"
					onClick={() => editor.chain().focus().toggleItalic().run()}
					type="button"
				>
					<Italic className="h-4 w-4" />
				</Button>
				<Button
					variant={editor.isActive("underline") ? "default" : "ghost"}
					size="sm"
					onClick={() => editor.chain().focus().toggleUnderline().run()}
					type="button"
				>
					<Underline className="h-4 w-4" />
				</Button>
				<Button
					variant={editor.isActive("strike") ? "default" : "ghost"}
					size="sm"
					onClick={() => editor.chain().focus().toggleStrike().run()}
					type="button"
				>
					<Strikethrough className="h-4 w-4" />
				</Button>
				<Button
					variant={editor.isActive("code") ? "default" : "ghost"}
					size="sm"
					onClick={() => editor.chain().focus().toggleCode().run()}
					type="button"
				>
					<Code className="h-4 w-4" />
				</Button>
			</div>

			<Separator orientation="vertical" className="h-6" />

			{/* Subscript/Superscript */}
			<div className="flex items-center gap-1">
				<Button
					variant={editor.isActive("subscript") ? "default" : "ghost"}
					size="sm"
					onClick={() => editor.chain().focus().toggleSubscript().run()}
					type="button"
				>
					<Subscript className="h-4 w-4" />
				</Button>
				<Button
					variant={editor.isActive("superscript") ? "default" : "ghost"}
					size="sm"
					onClick={() => editor.chain().focus().toggleSuperscript().run()}
					type="button"
				>
					<Superscript className="h-4 w-4" />
				</Button>
			</div>

			<Separator orientation="vertical" className="h-6" />

			{/* Text Color and Highlight */}
			<div className="flex items-center gap-1">
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="ghost" size="sm" type="button">
							<Type className="h-4 w-4" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-64">
						<div className="space-y-2">
							<Label>Text Color</Label>
							<div className="grid grid-cols-6 gap-2">
								{[
									"#000000", "#374151", "#6B7280", "#EF4444", "#F97316", "#EAB308",
									"#22C55E", "#06B6D4", "#3B82F6", "#8B5CF6", "#EC4899", "#F43F5E"
								].map((color) => (
									<button
										key={color}
										className="w-6 h-6 rounded border border-gray-300"
										style={{ backgroundColor: color }}
										onClick={() => editor.chain().focus().setColor(color).run()}
										type="button"
									/>
								))}
							</div>
						</div>
					</PopoverContent>
				</Popover>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="ghost" size="sm" type="button">
							<Highlighter className="h-4 w-4" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-64">
						<div className="space-y-2">
							<Label>Highlight Color</Label>
							<div className="grid grid-cols-6 gap-2">
								{[
									"#FEF3C7", "#DBEAFE", "#D1FAE5", "#FCE7F3", "#E0E7FF", "#FED7D7",
									"#FEF0FF", "#F0FDF4", "#FFF7ED", "#F3F4F6", "#FFFBEB", "#F0F9FF"
								].map((color) => (
									<button
										key={color}
										className="w-6 h-6 rounded border border-gray-300"
										style={{ backgroundColor: color }}
										onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
										type="button"
									/>
								))}
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</div>

			<Separator orientation="vertical" className="h-6" />

			{/* Text Alignment */}
			<div className="flex items-center gap-1">
				<Button
					variant={editor.isActive({ textAlign: "left" }) ? "default" : "ghost"}
					size="sm"
					onClick={() => editor.chain().focus().setTextAlign("left").run()}
					type="button"
				>
					<AlignLeft className="h-4 w-4" />
				</Button>
				<Button
					variant={editor.isActive({ textAlign: "center" }) ? "default" : "ghost"}
					size="sm"
					onClick={() => editor.chain().focus().setTextAlign("center").run()}
					type="button"
				>
					<AlignCenter className="h-4 w-4" />
				</Button>
				<Button
					variant={editor.isActive({ textAlign: "right" }) ? "default" : "ghost"}
					size="sm"
					onClick={() => editor.chain().focus().setTextAlign("right").run()}
					type="button"
				>
					<AlignRight className="h-4 w-4" />
				</Button>
				<Button
					variant={editor.isActive({ textAlign: "justify" }) ? "default" : "ghost"}
					size="sm"
					onClick={() => editor.chain().focus().setTextAlign("justify").run()}
					type="button"
				>
					<AlignJustify className="h-4 w-4" />
				</Button>
			</div>

			<Separator orientation="vertical" className="h-6" />

			{/* Lists */}
			<div className="flex items-center gap-1">
				<Button
					variant={editor.isActive("bulletList") ? "default" : "ghost"}
					size="sm"
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					type="button"
				>
					<List className="h-4 w-4" />
				</Button>
				<Button
					variant={editor.isActive("orderedList") ? "default" : "ghost"}
					size="sm"
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					type="button"
				>
					<ListOrdered className="h-4 w-4" />
				</Button>
				<Button
					variant={editor.isActive("taskList") ? "default" : "ghost"}
					size="sm"
					onClick={() => editor.chain().focus().toggleTaskList().run()}
					type="button"
				>
					<CheckSquare className="h-4 w-4" />
				</Button>
			</div>

			<Separator orientation="vertical" className="h-6" />

			{/* Indentation */}
			<div className="flex items-center gap-1">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
					disabled={!editor.can().sinkListItem('listItem')}
					type="button"
				>
					<Indent className="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().liftListItem('listItem').run()}
					disabled={!editor.can().liftListItem('listItem')}
					type="button"
				>
					<Outdent className="h-4 w-4" />
				</Button>
			</div>

			<Separator orientation="vertical" className="h-6" />

			{/* Block Elements */}
			<div className="flex items-center gap-1">
				<Button
					variant={editor.isActive("blockquote") ? "default" : "ghost"}
					size="sm"
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					type="button"
				>
					<Quote className="h-4 w-4" />
				</Button>
				<Button
					variant={editor.isActive("codeBlock") ? "default" : "ghost"}
					size="sm"
					onClick={() => editor.chain().focus().toggleCodeBlock().run()}
					type="button"
				>
					<Code className="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().setHorizontalRule().run()}
					type="button"
				>
					<Minus className="h-4 w-4" />
				</Button>
			</div>

			<Separator orientation="vertical" className="h-6" />

			{/* Media and Links */}
			<div className="flex items-center gap-1">
				{/* Link Dialog */}
				<Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
					<DialogTrigger asChild>
						<Button variant="ghost" size="sm" type="button">
							<Link className="h-4 w-4" />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add Link</DialogTitle>
							<DialogDescription>
								Enter the URL you want to link to.
							</DialogDescription>
						</DialogHeader>
						<Input
							placeholder="https://example.com"
							value={linkUrl}
							onChange={(e) => setLinkUrl(e.target.value)}
						/>
						<DialogFooter>
							<Button onClick={addLink} type="button">Add Link</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				<Button
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().unsetLink().run()}
					disabled={!editor.isActive("link")}
					type="button"
				>
					<Unlink className="h-4 w-4" />
				</Button>

				{/* Image Dialog */}
				<Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
					<DialogTrigger asChild>
						<Button variant="ghost" size="sm" type="button">
							<Image className="h-4 w-4" />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add Image</DialogTitle>
							<DialogDescription>
								Upload an image or enter an image URL.
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div>
								<Label>Upload Image</Label>
								<Input
									type="file"
									accept="image/*"
									onChange={(e) => {
										const file = e.target.files?.[0]
										if (file) {
											handleImageUpload(file)
											setIsImageDialogOpen(false)
										}
									}}
								/>
							</div>
							<div>
								<Label>Or enter image URL</Label>
								<Input
									placeholder="https://example.com/image.jpg"
									value={imageUrl}
									onChange={(e) => setImageUrl(e.target.value)}
								/>
							</div>
						</div>
						<DialogFooter>
							<Button onClick={addImage} disabled={!imageUrl} type="button">Add Image</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				{/* YouTube Dialog */}
				<Dialog open={isYoutubeDialogOpen} onOpenChange={setIsYoutubeDialogOpen}>
					<DialogTrigger asChild>
						<Button variant="ghost" size="sm" type="button">
							<Youtube className="h-4 w-4" />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Embed YouTube Video</DialogTitle>
							<DialogDescription>
								Enter a YouTube video URL to embed it.
							</DialogDescription>
						</DialogHeader>
						<Input
							placeholder="https://www.youtube.com/watch?v=..."
							value={youtubeUrl}
							onChange={(e) => setYoutubeUrl(e.target.value)}
						/>
						<DialogFooter>
							<Button onClick={addYoutube} disabled={!youtubeUrl} type="button">Embed Video</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				<Button
					variant="ghost"
					size="sm"
					onClick={addTable}
					type="button"
				>
					<Table className="h-4 w-4" />
				</Button>
			</div>

			<Separator orientation="vertical" className="h-6" />

			{/* Word Count */}
			<div className="flex items-center gap-2 text-xs text-muted-foreground px-2">
				<FileText className="h-3 w-3" />
				<span>
					{editor.storage.characterCount.words()} words, {editor.storage.characterCount.characters()} chars
				</span>
			</div>

			<Separator orientation="vertical" className="h-6" />

			{/* Help Dialog */}
			<Dialog open={isHelpDialogOpen} onOpenChange={setIsHelpDialogOpen}>
				<DialogTrigger asChild>
					<Button variant="ghost" size="sm" type="button">
						<HelpCircle className="h-4 w-4" />
					</Button>
				</DialogTrigger>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Keyboard Shortcuts</DialogTitle>
						<DialogDescription>
							Use these keyboard shortcuts to speed up your writing.
						</DialogDescription>
					</DialogHeader>
					<div className="grid grid-cols-2 gap-4 text-sm">
						<div className="space-y-2">
							<h4 className="font-semibold">Text Formatting</h4>
							<div className="space-y-1">
								<div className="flex justify-between">
									<span>Bold</span>
									<code className="bg-muted px-1 rounded">Ctrl+B</code>
								</div>
								<div className="flex justify-between">
									<span>Italic</span>
									<code className="bg-muted px-1 rounded">Ctrl+I</code>
								</div>
								<div className="flex justify-between">
									<span>Underline</span>
									<code className="bg-muted px-1 rounded">Ctrl+U</code>
								</div>
								<div className="flex justify-between">
									<span>Code</span>
									<code className="bg-muted px-1 rounded">Ctrl+E</code>
								</div>
							</div>
						</div>
						<div className="space-y-2">
							<h4 className="font-semibold">Structure</h4>
							<div className="space-y-1">
								<div className="flex justify-between">
									<span>Heading 1</span>
									<code className="bg-muted px-1 rounded">Ctrl+Alt+1</code>
								</div>
								<div className="flex justify-between">
									<span>Heading 2</span>
									<code className="bg-muted px-1 rounded">Ctrl+Alt+2</code>
								</div>
								<div className="flex justify-between">
									<span>Bullet List</span>
									<code className="bg-muted px-1 rounded">Ctrl+Shift+8</code>
								</div>
								<div className="flex justify-between">
									<span>Ordered List</span>
									<code className="bg-muted px-1 rounded">Ctrl+Shift+7</code>
								</div>
							</div>
						</div>
						<div className="space-y-2">
							<h4 className="font-semibold">Actions</h4>
							<div className="space-y-1">
								<div className="flex justify-between">
									<span>Undo</span>
									<code className="bg-muted px-1 rounded">Ctrl+Z</code>
								</div>
								<div className="flex justify-between">
									<span>Redo</span>
									<code className="bg-muted px-1 rounded">Ctrl+Y</code>
								</div>
								<div className="flex justify-between">
									<span>Link</span>
									<code className="bg-muted px-1 rounded">Ctrl+K</code>
								</div>
								<div className="flex justify-between">
									<span>Blockquote</span>
									<code className="bg-muted px-1 rounded">Ctrl+Shift+B</code>
								</div>
							</div>
						</div>
						<div className="space-y-2">
							<h4 className="font-semibold">Special</h4>
							<div className="space-y-1">
								<div className="flex justify-between">
									<span>Hard Break</span>
									<code className="bg-muted px-1 rounded">Shift+Enter</code>
								</div>
								<div className="flex justify-between">
									<span>Horizontal Rule</span>
									<code className="bg-muted px-1 rounded">---</code>
								</div>
								<div className="flex justify-between">
									<span>Code Block</span>
									<code className="bg-muted px-1 rounded">```</code>
								</div>
								<div className="flex justify-between">
									<span>Task List</span>
									<code className="bg-muted px-1 rounded">- [ ]</code>
								</div>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
