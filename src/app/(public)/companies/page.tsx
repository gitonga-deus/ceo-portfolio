import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { HoverLift } from "@/components/animations/hover-scale"
import { PageTransition } from "@/components/animations/page-transition"
import { prisma } from "@/lib/prisma"

// Define the types since Prisma client might not be available yet
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

export default async function CompaniesPage() {
	const companies = await getCompanies()
	return (
		<PageTransition>
			<div className="py-20 px-4">
				<div className="container max-w-6xl mx-auto">
					{/* Header */}
					<FadeIn className="text-center mb-16">
						<h1 className="font-heading font-black text-4xl md:text-5xl mb-4">Steve's Companies</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
							A portfolio of businesses built to solve real problems and create lasting value across multiple industries.
						</p>
					</FadeIn>

					{/* Companies Grid */}
					{companies.length === 0 ? (
						<FadeIn className="text-center py-16">
							<h3 className="text-xl font-semibold mb-2">No Companies Yet</h3>
							<p className="text-muted-foreground">Companies will appear here once they are added.</p>
						</FadeIn>
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
			</div>
		</PageTransition>
	)
}

// Revalidate the page every 60 seconds
export const revalidate = 60
