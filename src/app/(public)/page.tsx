// src/app/page.tsx
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, PenTool, Users, TrendingUp, Award, ExternalLink, Star, ChevronsDown } from "lucide-react"

import { FadeIn } from "@/components/animations/fade-in"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { HoverScale, HoverLift } from "@/components/animations/hover-scale"
import { PageTransition } from "@/components/animations/page-transition"
import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import { prisma } from "@/lib/prisma"

// Import the new CompanyList component
import { CompanyList } from "@/components/company-list"

// Define the types
interface Company {
	id: string
	name: string
	slug: string
	description: string
	industry: string
	founded: string
	website: string | null
	logo: string | null
}

async function getCompanies(): Promise<Company[]> {
	try {
		const companies = await prisma.company.findMany({
			where: {
				// Keep the filter to only show 'ACTIVE' companies
				status: "ACTIVE"
			},
			select: {
				id: true,
				name: true,
				slug: true,
				description: true,
				industry: true,
				founded: true,
				website: true,
				logo: true,
			},
			orderBy: [
				{ createdAt: "desc" }
			],
		})

		return companies
	} catch (error) {
		console.error('Error fetching companies:', error)
		return []
	}
}

export default async function HomePage() {
	const companies = await getCompanies()
	return (
		<PageTransition>
			<div className="flex flex-col">
				{/* Hero Section */}
				<section className="relative h-screen overflow-hidden">
					{/* Background Image */}
					<div className="absolute inset-0 z-0">
						<Image
							src="/steve2.jpg"
							alt="Steve Down - CEO and Entrepreneur"
							fill
							className="object-cover object-center"
							priority
						/>

						<div className="absolute inset-0 bg-black/50"></div>
					</div>

					{/* Hero Content */}
					<div className="absolute inset-0 z-10 flex items-center justify-center">
						<div className="text-center text-white px-4 max-w-5xl mx-auto">
							<FadeIn delay={0.2}>
								<h1 className="mt-24 mb-2 text-xl font-medium text-white/90 leading-relaxed capitalize">
									Illuminating the planet through principle-centered wealth education
								</h1>
							</FadeIn>

							<FadeIn delay={0.4}>
								<h2 className="mb-6 text-6xl text-balance font-extrabold capitalize tracking-tight leading-tight">
									Steve Down's business acumen & entrepreneurial talent
								</h2>
							</FadeIn>

							<FadeIn delay={0.6}>
								<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
									<HoverScale>
										<Button asChild className="bg-[#1285e4] hover:bg-[#1285e4]/90 px-8 h-12 rounded-lg text-base font-semibold">
											<SmoothScrollLink href="#meet-steve">
												Learn About Me
											</SmoothScrollLink>
										</Button>
									</HoverScale>
								</div>
							</FadeIn>
						</div>
					</div>

					{/* Scroll indicator */}
					<FadeIn delay={0.8}>
						<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
							<div className="animate-bounce">
								<ChevronsDown className="w-8 h-8 text-white/70" />
							</div>
						</div>
					</FadeIn>
				</section>

				{/* Meet Steve Section */}
				<section id="meet-steve">
					<div className="max-w-5xl mx-auto mt-26 p-4">
						<div className="text-center">
							<h2 className="text-3xl md:text-4xl font-bold mb-10">
								Meet Steve
							</h2>
						</div>
						<div className="grid lg:grid-cols-2 gap-4 items-start">
							
							{/* Left: Photo */}
							<ScrollReveal>
								<div className="relative">
									<Image
										src="/steve.jpg"
										alt="Steve Down - CEO and Entrepreneur"
										width={600}
										height={600}
										className="w-full h-full aspect-auto object-cover rounded-lg shadow-sm"
										priority
									/>
								</div>
							</ScrollReveal>

							{/* Right: Text Card */}
							<ScrollReveal delay={0.2}>
								<div className="bg-white px-6 py-8 rounded-lg">
									<div className="space-y-6 text-justify">
										{/* Content paragraphs */}
										<div className="space-y-4 text-gray-700 leading-relaxed">
											<p>
												Steve Down's business acumen and entrepreneurial talent led to the founding of Financially Fit, a wealth education company. This site is dedicated to the mission of the Financially Fit company, why Steve Down founded the company and the type of lessons taught by the unique Learning Management System that forms the backbone of this organization.
											</p>
											<p>
												Steve Down founded an organization that offers training guaranteed to offer participants a clear and practical roadmap to financial freedom. Financially Fit is devoted to giving and sharing financial hope, vision, and direction for financial health and fitness to individuals, families, and businesses.
											</p>
											<p>
												They employ an online program that utilizes the LMS (Learning Management System) which entails lessons, instructional videos, audio, transcripts and community engagement to create tailor-made financial solutions for people from all walks of life. It is by these principles to learn, understand, and apply in their lives. As a financial literacy roadmap, Financially Fit offers principles and education in a curriculum, to help shape your perception and relationship with money and wealth.
											</p>
										</div>
									</div>
								</div>
							</ScrollReveal>
						</div>
					</div>
				</section>

				{/* In Brief Section */}
				<section className="py-20 px-4 bg-muted/20">
					<div className="max-w-5xl mx-auto">
						<div className="grid md:grid-cols-2 gap-12 items-center">
							{/* Text Content */}
							<FadeIn>
								<div className="space-y-6 text-justify">
									<h2 className="text-3xl md:text-4xl font-bold mb-6">
										In Brief
									</h2>
									<p className="text-muted-foreground leading-relaxed">
										Financially Fit World is one of the pioneer companies globally that practices the principle of Cause Capitalism. Cause Capitalism dictates that any for-profit company chooses a non-profit organization; not as a gimmick but as a sustainable partner. Financially Fit World has chosen The Goat Foundation as its non-profit partner and will donate a percentage of its anticipated gross income towards the foundation as a cause for good.
									</p>
								</div>
							</FadeIn>

							{/* Image */}
							<FadeIn delay={0.2}>
								<figure className="p-2 border shadow-sm rounded-lg bg-white">
									<Image
										src="/finfit.png"
										alt="Financially Fit World"
										width={600}
										height={400}
										className="w-full h-auto object-cover rounded-md"
									/>
								</figure>
							</FadeIn>
						</div>
					</div>
				</section>

				{/* Steve's Vision Section */}
				<section className="py-20 px-4 bg-white">
					<div className="max-w-5xl mx-auto">
						<div className="grid md:grid-cols-2 gap-12 items-center">
							{/* Image */}
							<FadeIn>
								<figure className="p-2 border shadow-sm rounded-lg bg-white">
									<Image
										src="/the_miracle_of_wealth.jpg"
										alt="The Miracle of Wealth"
										width={600}
										height={400}
										className="w-full h-auto object-cover rounded-md"
									/>
								</figure>
							</FadeIn>

							{/* Text Content */}
							<FadeIn delay={0.2}>
								<div className="space-y-6 text-justify ">
									<h2 className="text-3xl md:text-4xl font-bold mb-6">
										Steve's Vision
									</h2>
									<div className="space-y-4 text-muted-foreground leading-relaxed">
										<p>
											Steve's vision as taught in Financially Fit is to make you re-imagine wealth. To re-imagine wealth, you must learn to increase your cash flow, eliminate and live without debt, and become completely financially independent. Debt is a distraction that robs people of their wealth and true financial independence.
										</p>
										<p>
											The goal of Financially Fit is to help individuals learn to function without debt. The learning management system and online learning program, envisaged by Mr. Down teach principles of how to become 100% debt free in 5-10 years.
										</p>
									</div>
								</div>
							</FadeIn>
						</div>
					</div>
				</section>

				{/* Companies Section */}
				<section id="companies" className=" bg-white">
					<div className="container max-w-5xl mx-auto mt-26 p-4">
						<ScrollReveal className="text-center mb-16">
							<h2 className="font-heading font-bold text-2xl md:text-4xl mb-4">Steve's Companies</h2>
						</ScrollReveal>

						{/* Companies Grid */}
						{companies.length === 0 ? (
							<ScrollReveal className="text-center py-16">
								<h3 className="text-xl font-semibold mb-2">No Companies Yet</h3>
								<p className="text-muted-foreground">Companies will appear here once they are added.</p>
							</ScrollReveal>
						) : (
							<CompanyList companies={companies} />
						)}
					</div>
				</section>
			</div>
		</PageTransition>
	)
}

// Revalidate the page every 60 seconds
export const revalidate = 60