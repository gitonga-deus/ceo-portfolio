import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Building2, PenTool, Users } from "lucide-react"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { FadeIn } from "@/components/animations/fade-in"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { HoverScale, HoverLift } from "@/components/animations/hover-scale"
import { PageTransition } from "@/components/animations/page-transition"

export default function HomePage() {
	return (
		<PageTransition>
			<div className="flex flex-col">
				{/* Hero Section */}
				<section className="py-24 px-4 text-center bg-gradient-to-b from-background to-muted/20">
					<div className="container max-w-6xl">
						<FadeIn delay={0.2}>
							<h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl mb-6 text-balance">
								Building the Future, <span className="text-primary">One Company</span> at a Time
							</h1>
						</FadeIn>
						<FadeIn delay={0.4}>
							<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
								Entrepreneur, innovator, and business builder. I create companies that solve real problems and make a
								meaningful impact.
							</p>
						</FadeIn>
						<FadeIn delay={0.6}>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<HoverScale>
									<Button asChild className="px-8">
										<Link href="/meet-steve">
											Learn About Me <ArrowRight className="ml-2 h-5 w-5" />
										</Link>
									</Button>
								</HoverScale>
								<HoverScale>
									<Button asChild variant="outline" className="px-8 bg-transparent">
										<Link href="/companies">View My Companies</Link>
									</Button>
								</HoverScale>
							</div>
						</FadeIn>
					</div>
				</section>

				{/* Features Section */}
				<section className="py-20 px-4">
					<div className="container max-w-6xl mx-auto">
						<ScrollReveal className="text-center mb-16">
							<h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">What I Do</h2>
							<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
								From ideation to execution, I build businesses that create value and drive innovation.
							</p>
						</ScrollReveal>

						<StaggerContainer className="grid md:grid-cols-3 gap-8">
							<StaggerItem>
								<HoverLift>
									<Card className="text-center p-6 shadow-none rounded-md hover:shadow-sm transition-shadow h-full">
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
								</HoverLift>
							</StaggerItem>

							<StaggerItem>
								<HoverLift>
									<Card className="text-center p-6 shadow-none rounded-md hover:shadow-sm transition-shadow h-full">
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
								</HoverLift>
							</StaggerItem>

							<StaggerItem>
								<HoverLift>
									<Card className="text-center p-6 shadow-none rounded-md hover:shadow-sm transition-shadow h-full">
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
								</HoverLift>
							</StaggerItem>
						</StaggerContainer>
					</div>
				</section>

				{/* Newsletter Signup Section */}
				<section className="py-20 px-4">
					<div className="container max-w-6xl mx-auto">
						<ScrollReveal className="text-center mb-12">
							<h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Stay in the Loop</h2>
							<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
								Get exclusive insights on company updates, industry trends, and entrepreneurial wisdom delivered to your
								inbox.
							</p>
						</ScrollReveal>
						<ScrollReveal delay={0.2} className="flex justify-center">
							<NewsletterSignup />
						</ScrollReveal>
					</div>
				</section>
			</div>
		</PageTransition>
	)
}
