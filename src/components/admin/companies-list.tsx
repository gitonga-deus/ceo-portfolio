"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Edit, Trash2, ExternalLink, Star } from "lucide-react"
import { toast } from "@/hooks/use-toast"

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

export function CompaniesList() {
	const [companies, setCompanies] = useState<Company[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchCompanies()
	}, [])

	const fetchCompanies = async () => {
		try {
			const response = await fetch("/api/admin/companies")
			if (response.ok) {
				const data = await response.json()
				setCompanies(data)
			}
		} catch (error) {
			console.error("Error fetching companies:", error)
			toast({
				title: "Error",
				description: "Failed to fetch companies",
				variant: "destructive",
			})
		} finally {
			setLoading(false)
		}
	}

	const handleDelete = async (id: string, name: string) => {
		if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
			return
		}

		try {
			const response = await fetch(`/api/admin/companies/${id}`, {
				method: "DELETE",
			})

			if (response.ok) {
				setCompanies(companies.filter(company => company.id !== id))
				toast({
					title: "Company deleted",
					description: `${name} has been deleted successfully.`,
				})
			} else {
				throw new Error("Failed to delete company")
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to delete company. Please try again.",
				variant: "destructive",
			})
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

	if (loading) {
		return (
			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<div>
						<h2 className="text-2xl font-heading font-bold leading-relaxed">Companies</h2>
						<p className="text-muted-foreground">Manage your portfolio companies</p>
					</div>
				</div>
				<div className="text-center py-8">Loading companies...</div>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-heading font-bold">Companies</h2>
					<p className="text-muted-foreground">Manage your portfolio companies</p>
				</div>
				<Button asChild>
					<Link href="/admin/companies/new">
						<Plus className="h-4 w-4 mr-2" />
						Add Company
					</Link>
				</Button>
			</div>

			{companies.length === 0 ? (
				<Card className="rounded-md shadow-none">
					<CardContent className="text-center py-8">
						<p className="text-muted-foreground mb-4">No companies found</p>
						<Button asChild>
							<Link href="/admin/companies/new">
								<Plus className="h-4 w-4 mr-2" />
								Create your first company
							</Link>
						</Button>
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-6">
					{companies.map((company) => (
						<Card key={company.id} className="overflow-hidden rounded-md shadow-none">
							<CardContent className="p-6">
								<div className="flex items-start gap-4">
									{/* Company Logo/Image */}
									<div className="flex-shrink-0">
										{company.logo ? (
											<div className="w-16 h-16 relative rounded-lg overflow-hidden bg-muted">
												<Image
													src={company.logo}
													alt={`${company.name} logo`}
													fill
													className="object-cover"
												/>
											</div>
										) : (
											<div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
												<span className="text-2xl font-bold text-muted-foreground">
													{company.name.charAt(0)}
												</span>
											</div>
										)}
									</div>

									{/* Company Info */}
									<div className="flex-1 min-w-0">
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<div className="flex items-center gap-2 mb-2">
													<h3 className="text-lg font-semibold truncate">
														{company.name}
													</h3>
													{company.featured && (
														<Star className="h-4 w-4 text-yellow-500 fill-current" />
													)}
												</div>
												<p className="text-sm text-muted-foreground mb-3 line-clamp-2">
													{company.description}
												</p>
												<div className="flex items-center gap-4 text-sm text-muted-foreground">
													<span>{company.industry}</span>
													<span>•</span>
													<span>Founded {company.founded}</span>
													{company.website && (
														<>
															<span>•</span>
															<a
																href={company.website}
																target="_blank"
																rel="noopener noreferrer"
																className="flex items-center gap-1 hover:text-primary"
															>
																Website <ExternalLink className="h-3 w-3" />
															</a>
														</>
													)}
												</div>
											</div>
											<div className="flex items-center gap-2 ml-4">
												<Badge className={getStatusColor(company.status)}>
													{company.status}
												</Badge>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost" size="sm">
															<MoreHorizontal className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuItem asChild>
															<Link href={`/admin/companies/${company.id}/edit`}>
																<Edit className="h-4 w-4 mr-2" />
																Edit
															</Link>
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={() => handleDelete(company.id, company.name)}
															className="text-red-600"
														>
															<Trash2 className="h-4 w-4 mr-2" />
															Delete
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	)
}
