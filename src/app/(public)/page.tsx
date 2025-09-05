import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Building2, PenTool, Users } from "lucide-react"
import { NewsletterSignup } from "@/components/newsletter-signup"

export default function HomePage() {
	return (
		<div className="flex flex-col">
			{/* Hero Section */}
			<section className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted/20">
				<div className="container max-w-6xl">
					<h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl mb-6 text-balance">
						Building the Future, <span className="text-primary">One Company</span> at a Time
					</h1>
					<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
						Entrepreneur, innovator, and business builder. I create companies that solve real problems and make a
						meaningful impact.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button asChild className="px-8">
							<Link href="/meet-steve">
								Learn About Me <ArrowRight className="ml-2 h-5 w-5" />
							</Link>
						</Button>
						<Button asChild variant="outline" className="px-8 bg-transparent">
							<Link href="/companies">View My Companies</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 px-4">
				<div className="container max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">What I Do</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							From ideation to execution, I build businesses that create value and drive innovation.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<Card className="text-center p-6 shadow-none rounded-md hover:shadow-sm transition-shadow">
							<CardContent className="pt-6">
								<div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
									<Building2 className="h-6 w-6 text-primary" />
								</div>
								<h3 className="font-heading font-bold text-xl mb-2">Company Building</h3>
								<p className="text-muted-foreground text-balance">
									Creating and scaling businesses from the ground up with strategic vision and execution.
								</p>
							</CardContent>
						</Card>

						<Card className="text-center p-6 shadow-none rounded-md hover:shadow-sm transition-shadow">
							<CardContent className="pt-6">
								<div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
									<PenTool className="h-6 w-6 text-primary" />
								</div>
								<h3 className="font-heading font-bold text-xl mb-2">Innovation</h3>
								<p className="text-muted-foreground text-balance">
									Developing cutting-edge solutions that address market needs and create new opportunities.
								</p>
							</CardContent>
						</Card>

						<Card className="text-center p-6 shadow-none rounded-md hover:shadow-sm transition-shadow">
							<CardContent className="pt-6">
								<div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
									<Users className="h-6 w-6 text-primary" />
								</div>
								<h3 className="font-heading font-bold text-xl mb-2">Team Leadership</h3>
								<p className="text-muted-foreground text-balance">
									Building and leading high-performing teams that deliver exceptional results.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Newsletter Signup Section */}
			<section className="py-20 px-4">
				<div className="container max-w-6xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Stay in the Loop</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Get exclusive insights on company updates, industry trends, and entrepreneurial wisdom delivered to your
							inbox.
						</p>
					</div>
					<div className="flex justify-center">
						<NewsletterSignup />
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 px-4 bg-muted/80">
				<div className="container text-center">
					<h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Ready to Connect?</h2>
					<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
						Whether you're interested in collaboration, investment opportunities, or just want to chat about business,
						I'd love to hear from you.
					</p>
					<Button asChild className="px-8">
						<Link href="/contact">
							Get In Touch <ArrowRight className="ml-2 h-5 w-5" />
						</Link>
					</Button>
				</div>
			</section>
		</div>
	)
}
