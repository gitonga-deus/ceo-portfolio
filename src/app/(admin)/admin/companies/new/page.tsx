import { CompanyForm } from "@/components/admin/company-form"

export default function NewCompanyPage() {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-heading font-bold leading-relaxed">Create New Company</h2>
				<p className="text-muted-foreground">Add a new company to your portfolio</p>
			</div>

			<CompanyForm />
		</div>
	)
}
