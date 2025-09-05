"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		
		// Simulate form submission
		await new Promise(resolve => setTimeout(resolve, 1000))
		
		setIsSubmitting(false)
		setIsSubmitted(true)
	}

	if (isSubmitted) {
		return (
			<div className="py-20 px-4">
				<div className="container max-w-2xl text-center">
					<div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
						<Send className="h-8 w-8 text-primary" />
					</div>
					<h1 className="font-heading font-bold text-3xl mb-4">Message Sent!</h1>
					<p className="text-lg text-muted-foreground mb-8">
						Thank you for reaching out. I'll get back to you within 24 hours.
					</p>
					<Button onClick={() => setIsSubmitted(false)} variant="outline">
						Send Another Message
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div className="py-20 px-4">
			<div className="container max-w-6xl">
				{/* Header */}
				<div className="text-center mb-16">
					<h1 className="font-heading font-black text-4xl md:text-5xl mb-4">Get In Touch</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Ready to discuss your next big idea? I'd love to hear from you.
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-12">
					{/* Contact Form */}
					<Card>
						<CardHeader>
							<CardTitle className="font-heading font-bold text-2xl">Send a Message</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="firstName">First Name</Label>
										<Input id="firstName" required />
									</div>
									<div className="space-y-2">
										<Label htmlFor="lastName">Last Name</Label>
										<Input id="lastName" required />
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input id="email" type="email" required />
								</div>
								<div className="space-y-2">
									<Label htmlFor="company">Company (Optional)</Label>
									<Input id="company" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="subject">Subject</Label>
									<Input id="subject" required />
								</div>
								<div className="space-y-2">
									<Label htmlFor="message">Message</Label>
									<Textarea 
										id="message" 
										rows={6} 
										placeholder="Tell me about your project, idea, or how I can help..."
										required 
									/>
								</div>
								<Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
									{isSubmitting ? "Sending..." : "Send Message"}
									<Send className="ml-2 h-4 w-4" />
								</Button>
							</form>
						</CardContent>
					</Card>

					{/* Contact Info */}
					<div className="space-y-8">
						<Card>
							<CardContent className="p-6">
								<h3 className="font-heading font-bold text-xl mb-6">Contact Information</h3>
								<div className="space-y-4">
									<div className="flex items-center gap-4">
										<div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
											<Mail className="h-5 w-5 text-primary" />
										</div>
										<div>
											<p className="font-medium">Email</p>
											<p className="text-muted-foreground">hello@steve.com</p>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
											<Phone className="h-5 w-5 text-primary" />
										</div>
										<div>
											<p className="font-medium">Phone</p>
											<p className="text-muted-foreground">+1 (555) 123-4567</p>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
											<MapPin className="h-5 w-5 text-primary" />
										</div>
										<div>
											<p className="font-medium">Location</p>
											<p className="text-muted-foreground">San Francisco, CA</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6">
								<h3 className="font-heading font-bold text-xl mb-4">What to Expect</h3>
								<div className="space-y-3 text-sm text-muted-foreground">
									<p>• Response within 24 hours</p>
									<p>• Initial consultation call if needed</p>
									<p>• Detailed project discussion</p>
									<p>• Clear next steps and timeline</p>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6">
								<h3 className="font-heading font-bold text-xl mb-4">Best For</h3>
								<div className="space-y-3 text-sm text-muted-foreground">
									<p>• Business partnerships</p>
									<p>• Investment opportunities</p>
									<p>• Speaking engagements</p>
									<p>• Mentorship inquiries</p>
									<p>• Media and press</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}
