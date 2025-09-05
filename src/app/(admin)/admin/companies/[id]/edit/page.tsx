"use client"

import { useState, useEffect } from "react"
import { CompanyForm } from "@/components/admin/company-form"
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

interface EditCompanyPageProps {
	params: Promise<{
		id: string
	}>
}

export default function EditCompanyPage({ params }: EditCompanyPageProps) {
	const [company, setCompany] = useState<Company | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchCompany = async () => {
			try {
				const { id } = await params
				const response = await fetch(`/api/admin/companies/${id}`)
				if (response.ok) {
					const data = await response.json()
					setCompany(data)
				} else {
					throw new Error("Company not found")
				}
			} catch (error) {
				toast({
					title: "Error",
					description: "Failed to fetch company details",
					variant: "destructive",
				})
			} finally {
				setLoading(false)
			}
		}

		fetchCompany()
	}, [params])

	if (loading) {
		return (
			<div className="space-y-6">
				<div>
					<h2 className="text-2xl font-heading font-bold">Edit Company</h2>
					<p className="text-muted-foreground">Loading company details...</p>
				</div>
			</div>
		)
	}

	if (!company) {
		return (
			<div className="space-y-6">
				<div>
					<h2 className="text-2xl font-heading font-bold">Company Not Found</h2>
					<p className="text-muted-foreground">The requested company could not be found.</p>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-heading font-bold leading-relaxed">Edit Company</h2>
				<p className="text-muted-foreground">Update {company.name} details</p>
			</div>

			<CompanyForm initialData={company} />
		</div>
	)
}
