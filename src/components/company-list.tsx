"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Building2 } from "lucide-react"
import Link from "next/link"

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

interface CompanyListProps {
    companies: Company[]
}

export function CompanyList({ companies }: CompanyListProps) {
    return (
        <div className="grid gap-8 md:grid-cols-1">
            {companies.map((company) => (
                <Card key={company.id} className="shadow-none hover:shadow-md rounded-md">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-10">
                            <div className="flex-shrink-0">
                                {company.logo ? (
                                    <img
                                        src={company.logo || "/placeholder.svg"}
                                        alt={`${company.name} logo`}
                                        className="w-32 h-full rounded-lg object-center"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                                        <Building2 className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-bold text-lg leading-tight truncate">{company.name}</h3>
                                    {company.website && (
                                        <Link
                                            href={company.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 my-3">
                                    <Badge variant="outline" className="text-xs">
                                        {company.industry}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">Founded {company.founded}</span>
                                </div>

                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{company.description}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
