
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

// Define the types
type CompanyStatus = "ACTIVE" | "INACTIVE" | "SOLD" | "ACQUIRED"

interface Company {
	id: string
	name: string
	slug: string
	description: string
	industry: string
	status: CompanyStatus
	founded: string
	website: string | null
	logo: string | null
	image: string | null
	featured: boolean
	sortOrder: number
	createdAt: Date
	updatedAt: Date
}

const skills = [
	"Strategic Planning",
	"Business Development",
	"Team Leadership",
	"Product Management",
	"Financial Planning",
	"Market Analysis",
	"Innovation",
	"Scaling Operations",
	"Investor Relations",
]

const achievements = [
	{
		icon: Building2,
		number: "5+",
		label: "Companies Founded",
		description: "Successfully built and scaled multiple businesses"
	},
	{
		icon: Users,
		number: "200+",
		label: "Team Members",
		description: "Talented professionals hired and mentored"
	},
	{
		icon: TrendingUp,
		number: "$50M+",
		label: "Revenue Generated",
		description: "Combined revenue across portfolio companies"
	},
	{
		icon: Award,
		number: "10+",
		label: "Years Experience",
		description: "Decade of entrepreneurial leadership"
	}
]

async function getCompanies(): Promise<Company[]> {
	try {
		const companies = await prisma.company.findMany({
			where: {
				status: "ACTIVE"
			},
			orderBy: [
				{ featured: "desc" },
				{ sortOrder: "asc" },
				{ createdAt: "desc" }
			],
		})

		return companies
	} catch (error) {
		console.error('Error fetching companies:', error)
		return []
	}
}

const getStatusLabel = (status: CompanyStatus) => {
	switch (status) {
		case "ACTIVE":
			return "Active"
		case "INACTIVE":
			return "Inactive"
		case "SOLD":
			return "Sold"
		case "ACQUIRED":
			return "Acquired"
		default:
			return status
	}
}

const getStatusColor = (status: CompanyStatus) => {
	switch (status) {
		case "ACTIVE":
			return "bg-green-100 text-green-800"
		case "INACTIVE":
			return "bg-gray-100 text-gray-800"
		case "SOLD":
			return "bg-blue-100 text-blue-800"
		case "ACQUIRED":
			return "bg-purple-100 text-purple-800"
		default:
			return "bg-gray-100 text-gray-800"
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
						{/* Dark overlay for better text readability */}
						<div className="absolute inset-0 bg-black/50"></div>
					</div>

					{/* Hero Content - Perfectly Centered */}
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
						{/* Blue heading with underline */}
						<div className="text-center">
							<h2 className="text-3xl md:text-4xl font-bold mb-10">
								Meet Steve
							</h2>
						</div>
						{/* Main Content Layout */}
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
									<div className="space-y-6">

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

				{/* Companies Section */}
				<section id="companies" className=" bg-white">
					<div className="container max-w-5xl mx-auto mt-26 p-4">
						<ScrollReveal className="text-center mb-16">
							<h2 className="font-heading font-bold text-2xl md:text-4xl mb-4">Steve's Companies</h2>
							<p className="text-xl text-muted-foreground max-w-5xl mx-auto text-pretty">
								A portfolio of businesses built to solve real problems and create lasting value across multiple industries.
							</p>
						</ScrollReveal>

						{/* Companies Grid */}
						{companies.length === 0 ? (
							<ScrollReveal className="text-center py-16">
								<h3 className="text-xl font-semibold mb-2">No Companies Yet</h3>
								<p className="text-muted-foreground">Companies will appear here once they are added.</p>
							</ScrollReveal>
						) : (
							<StaggerContainer className="grid md:grid-cols-2 gap-8">
								{companies.map((company) => (
									<StaggerItem key={company.id}>
										<HoverLift>
											<Card className="p-0 pb-6 overflow-hidden shadow-none hover:shadow-sm rounded-md transition-shadow group h-full">
												<div className="relative h-48 overflow-hidden">
													<Image
														src={company.image || "/placeholder.svg"}
														alt={`${company.name} - ${company.description}`}
														fill
														className="object-cover group-hover:scale-105 transition-transform duration-300"
													/>
													<div className="absolute top-4 right-4">
														<Badge className={getStatusColor(company.status)}>
															{getStatusLabel(company.status)}
														</Badge>
													</div>
													{company.featured && (
														<div className="absolute top-4 left-4">
															<Star className="h-5 w-5 text-yellow-500 fill-current" />
														</div>
													)}
												</div>

												<CardHeader>
													<div className="flex items-start justify-between">
														<div>
															<CardTitle className="font-heading font-bold text-xl mb-2">
																{company.name}
															</CardTitle>
															<div className="flex items-center gap-4 mb-2">
																<Badge variant="outline" className="rounded-full">
																	{company.industry}
																</Badge>
																<span className="text-sm text-muted-foreground">
																	Founded {company.founded}
																</span>
															</div>
														</div>
													</div>
													<CardDescription className="text-base">
														{company.description}
													</CardDescription>
												</CardHeader>

												<CardContent>
													{company.website ? (
														<Button asChild variant="outline" className="w-full group/btn bg-transparent">
															<a href={company.website} target="_blank" rel="noopener noreferrer">
																Visit Website
																<ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
															</a>
														</Button>
													) : (
														<Button variant="outline" className="w-full" disabled>
															Coming Soon
														</Button>
													)}
												</CardContent>
											</Card>
										</HoverLift>
									</StaggerItem>
								))}
							</StaggerContainer>
						)}
					</div>
				</section>


			</div>
		</PageTransition>
	)
}

// Revalidate the page every 60 seconds
export const revalidate = 60
