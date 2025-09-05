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
import { Placeholder } from "@tiptap/extension-placeholder"
import { CharacterCount } from "@tiptap/extension-character-count"
import { Focus } from "@tiptap/extension-focus"
import { Typography } from "@tiptap/extension-typography"
import { Dropcursor } from "@tiptap/extension-dropcursor"
import { Gapcursor } from "@tiptap/extension-gapcursor"
import { cn } from "@/lib/utils"
import { TiptapToolbar } from "./tiptap-toolbar"

interface RichTextEditorProps {
	value: string
	onChange: (content: string) => void
	placeholder?: string
	className?: string
	disabled?: boolean
}

export function RichTextEditor({
	value,
	onChange,
	placeholder = "Start writing...",
	className,
	disabled = false,
}: RichTextEditorProps) {
	const editor = useEditor({
		immediatelyRender: false,
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
				openOnClick: false,
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
			Placeholder.configure({
				placeholder,
			}),
			CharacterCount,
			Typography,
			Dropcursor,
			Gapcursor,
		],
		content: value,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML())
		},
		editable: !disabled,
		editorProps: {
			attributes: {
				class: cn(
					"prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 max-w-none",
					"prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground",
					"prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-4 prose-h1:mt-6",
					"prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-3 prose-h2:mt-5",
					"prose-h3:text-2xl prose-h3:font-bold prose-h3:mb-3 prose-h3:mt-4",
					"prose-h4:text-xl prose-h4:font-bold prose-h4:mb-2 prose-h4:mt-4",
					"prose-h5:text-lg prose-h5:font-bold prose-h5:mb-2 prose-h5:mt-3",
					"prose-h6:text-base prose-h6:font-bold prose-h6:mb-2 prose-h6:mt-3",
					"prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4",
					"prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
					"prose-strong:text-foreground prose-strong:font-semibold",
					"prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm",
					"prose-pre:bg-muted prose-pre:border prose-pre:rounded-md",
					"prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-md",
					"prose-ul:list-disc prose-ol:list-decimal",
					"prose-li:text-foreground",
					"prose-table:border-collapse prose-table:border prose-table:border-border",
					"prose-th:border prose-th:border-border prose-th:bg-muted prose-th:p-2 prose-th:font-semibold",
					"prose-td:border prose-td:border-border prose-td:p-2",
					"prose-img:rounded-md prose-img:shadow-sm",
					className
				),
			},
		},
	})

	return (
		<div className={cn("border rounded-md overflow-hidden", className)}>
			<TiptapToolbar editor={editor} />
			<EditorContent editor={editor} />
			{editor && (
				<div className="flex justify-between items-center px-4 py-2 bg-muted/50 text-xs text-muted-foreground border-t">
					<span>
						{editor.storage.characterCount.characters()} characters, {editor.storage.characterCount.words()} words
					</span>
					<span>
						{disabled ? "Read only" : "Editing"}
					</span>
				</div>
			)}
		</div>
	)
}
