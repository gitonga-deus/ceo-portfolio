"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { TextStyle } from "@tiptap/extension-text-style"
import { FontFamily } from "@tiptap/extension-font-family"
import { Color } from "@tiptap/extension-color"
import { Highlight } from "@tiptap/extension-highlight"
import { TextAlign } from "@tiptap/extension-text-align"
import { Underline } from "@tiptap/extension-underline"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Strike } from "@tiptap/extension-strike"
import { Code } from "@tiptap/extension-code"
import { CodeBlock } from "@tiptap/extension-code-block"
import { Blockquote } from "@tiptap/extension-blockquote"
import { HorizontalRule } from "@tiptap/extension-horizontal-rule"
import { Table } from "@tiptap/extension-table"
import { TableRow } from "@tiptap/extension-table-row"
import { TableCell } from "@tiptap/extension-table-cell"
import { TableHeader } from "@tiptap/extension-table-header"
import { Image } from "@tiptap/extension-image"
import { Link } from "@tiptap/extension-link"
import { Youtube } from "@tiptap/extension-youtube"
import { TaskList } from "@tiptap/extension-task-list"
import { TaskItem } from "@tiptap/extension-task-item"
import { Typography } from "@tiptap/extension-typography"
import { Dropcursor } from "@tiptap/extension-dropcursor"
import { Gapcursor } from "@tiptap/extension-gapcursor"
import { cn } from "@/lib/utils"

interface TiptapContentProps {
	content: string
	className?: string
	immediatelyRender?: boolean
}

export function TiptapContent({ 
	content, 
	className,
	immediatelyRender = true 
}: TiptapContentProps) {
	const editor = useEditor({
		immediatelyRender,
		extensions: [
			StarterKit.configure({
				bulletList: {
					keepMarks: true,
					keepAttributes: false,
				},
				orderedList: {
					keepMarks: true,
					keepAttributes: false,
				},
			}),
			TextStyle,
			FontFamily,
			Color,
			Highlight.configure({
				multicolor: true,
			}),
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			Underline,
			Subscript,
			Superscript,
			Strike,
			Code,
			CodeBlock.configure({
				HTMLAttributes: {
					class: "bg-muted p-4 rounded-md font-mono text-sm",
				},
			}),
			Blockquote.configure({
				HTMLAttributes: {
					class: "border-l-4 border-primary pl-4 italic",
				},
			}),
			HorizontalRule,
			Table.configure({
				resizable: true,
			}),
			TableRow,
			TableHeader,
			TableCell,
			Image.configure({
				HTMLAttributes: {
					class: "max-w-full h-auto rounded-md",
				},
			}),
			Link.configure({
				openOnClick: true,
				HTMLAttributes: {
					class: "text-primary underline underline-offset-2 hover:text-primary/80",
				},
			}),
			Youtube.configure({
				width: 640,
				height: 480,
			}),
			TaskList.configure({
				HTMLAttributes: {
					class: "not-prose pl-2",
				},
			}),
			TaskItem.configure({
				HTMLAttributes: {
					class: "flex items-start my-4",
				},
				nested: true,
			}),
			Typography,
			Dropcursor,
			Gapcursor,
		],
		content,
		editable: false,
		editorProps: {
			attributes: {
				class: cn(
					"prose prose-lg max-w-none focus:outline-none",
					"prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground",
					"prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-8",
					"prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8",
					"prose-h3:text-2xl prose-h3:font-bold prose-h3:mb-4 prose-h3:mt-6",
					"prose-h4:text-xl prose-h4:font-bold prose-h4:mb-3 prose-h4:mt-6",
					"prose-h5:text-lg prose-h5:font-bold prose-h5:mb-3 prose-h5:mt-4",
					"prose-h6:text-base prose-h6:font-bold prose-h6:mb-3 prose-h6:mt-4",
					"prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-6",
					"prose-a:text-primary prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-primary/80",
					"prose-strong:text-foreground prose-strong:font-semibold",
					"prose-em:text-foreground prose-em:italic",
					"prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono",
					"prose-pre:bg-muted prose-pre:border prose-pre:rounded-md prose-pre:p-4",
					"prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-md prose-blockquote:my-6",
					"prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6",
					"prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6",
					"prose-li:text-foreground prose-li:mb-2",
					"prose-table:border-collapse prose-table:border prose-table:border-border prose-table:my-6",
					"prose-th:border prose-th:border-border prose-th:bg-muted prose-th:p-3 prose-th:font-semibold prose-th:text-left",
					"prose-td:border prose-td:border-border prose-td:p-3",
					"prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8",
					"prose-hr:border-border prose-hr:my-8",
					className
				),
			},
		},
	})

	return <EditorContent editor={editor} />
}
