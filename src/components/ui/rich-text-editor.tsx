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
					HTMLAttributes: {
						class: "list-disc pl-6 space-y-1",
					},
				},
				orderedList: {
					keepMarks: true,
					keepAttributes: false,
					HTMLAttributes: {
						class: "list-decimal pl-6 space-y-1",
					},
				},
				listItem: {
					HTMLAttributes: {
						class: "leading-relaxed",
					},
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
					class: "not-prose pl-2 space-y-2",
				},
			}),
			TaskItem.configure({
				HTMLAttributes: {
					class: "flex items-start my-2",
				},
				nested: true,
			}),
			Placeholder.configure({
				placeholder,
			}),
			CharacterCount,
			Typography,
		],
		content: value,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML())
		},
		editable: !disabled,
		editorProps: {
			attributes: {
				class: cn(
					"min-h-[250px] w-full bg-background px-3 py-1 text-[15px] leading-relaxed placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
					// Typography styles for editing
					"prose prose-sm max-w-none dark:prose-invert",
					// Lists
					"prose-ul:list-disc prose-ul:pl-6 prose-ul:my-2 prose-ul:space-y-1",
					"prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-2 prose-ol:space-y-1",
					"prose-li:text-foreground prose-li:leading-relaxed prose-li:my-0",
					"prose-li:marker:text-muted-foreground",
					// Nested lists
					"[&_ul_ul]:list-[circle] [&_ul_ul]:mt-1 [&_ul_ul]:mb-1",
					"[&_ol_ol]:list-[lower-roman] [&_ol_ol]:mt-1 [&_ol_ol]:mb-1",
					// Other elements
					"prose-p:my-2 prose-p:leading-relaxed",
					"prose-headings:font-heading prose-headings:font-bold",
					"prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs",
					"prose-code:before:content-[''] prose-code:after:content-['']",
					"prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r",
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