"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"

interface FeatureImageUploadProps {
	value?: string
	onChange: (url: string) => void
	onRemove: () => void
}

export function FeatureImageUpload({ value, onChange, onRemove }: FeatureImageUploadProps) {
	const [isUploading, setIsUploading] = useState(false)
	const [imageUrl, setImageUrl] = useState("")

	const handleFileUpload = async (file: File) => {
		if (!file) return

		// Validate file type
		if (!file.type.startsWith('image/')) {
			toast({
				title: "Invalid file type",
				description: "Please select an image file.",
				variant: "destructive",
			})
			return
		}

		// Validate file size (max 5MB)
		if (file.size > 5 * 1024 * 1024) {
			toast({
				title: "File too large",
				description: "Please select an image smaller than 5MB.",
				variant: "destructive",
			})
			return
		}

		setIsUploading(true)

		try {
			const formData = new FormData()
			formData.append("file", file)

			const response = await fetch("/api/upload/image", {
				method: "POST",
				body: formData,
			})

			if (response.ok) {
				const data = await response.json()
				onChange(data.url)
				toast({
					title: "Image uploaded",
					description: "Feature image has been uploaded successfully.",
				})
			} else {
				throw new Error("Upload failed")
			}
		} catch (error) {
			console.error("Upload error:", error)
			toast({
				title: "Upload failed",
				description: "Failed to upload image. Please try again.",
				variant: "destructive",
			})
		} finally {
			setIsUploading(false)
		}
	}

	const handleUrlSubmit = () => {
		if (imageUrl.trim()) {
			onChange(imageUrl.trim())
			setImageUrl("")
			toast({
				title: "Image URL added",
				description: "Feature image URL has been set.",
			})
		}
	}

	return (
		<div className="space-y-4">
			{value ? (
				<Card className="overflow-hidden p-0 rounded-md shadow-none">
					<CardContent className="p-0">
						<div className="relative group">
							<Image
								src={value}
								alt="Feature image"
								width={400}
								height={200}
								className="w-full h-100 object-cover"
								unoptimized
							/>
							<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
								<Button
									variant="destructive"
									size="sm"
									onClick={onRemove}
									className="gap-2"
								>
									<X className="h-4 w-4" />
									Remove
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			) : (
				<Card className="border-dashed border-2 rounded-md shadow-none border-muted-foreground/20">
					<CardContent className="p-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="rounded-full bg-muted p-4">
								<ImageIcon className="h-8 w-8 text-muted-foreground" />
							</div>
							<div className="space-y-2">
								<h3 className="font-semibold">Upload Feature Image</h3>
								<p className="text-sm text-muted-foreground">
									Choose an image file or enter an image URL
								</p>
							</div>
							
							{/* File Upload */}
							<div className="space-y-2">
								<Label htmlFor="feature-image-file" className="sr-only">
									Upload image file
								</Label>
								<Input
									id="feature-image-file"
									type="file"
									accept="image/*"
									onChange={(e) => {
										const file = e.target.files?.[0]
										if (file) handleFileUpload(file)
									}}
									disabled={isUploading}
									className="hidden"
								/>
								<Button
									type="button"
									variant="outline"
									onClick={() => document.getElementById('feature-image-file')?.click()}
									disabled={isUploading}
									className="gap-2"
								>
									<Upload className="h-4 w-4" />
									{isUploading ? "Uploading..." : "Upload Image"}
								</Button>
							</div>

							{/* URL Input */}
							{/* <div className="w-full space-y-2">
								<div className="text-sm text-muted-foreground">Or enter image URL:</div>
								<div className="flex gap-2">
									<Input
										placeholder="https://example.com/image.jpg"
										value={imageUrl}
										onChange={(e) => setImageUrl(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												e.preventDefault()
												handleUrlSubmit()
											}
										}}
									/>
									<Button
										type="button"
										variant="outline"
										onClick={handleUrlSubmit}
										disabled={!imageUrl.trim()}
									>
										Add
									</Button>
								</div>
							</div> */}
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	)
}
