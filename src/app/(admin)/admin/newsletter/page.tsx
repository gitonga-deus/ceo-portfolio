import { getSubscribers, getCampaigns } from "@/lib/newsletter"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Mail, Send, Plus } from "lucide-react"
import Link from "next/link"

export default async function NewsletterPage() {
	const [subscribers, campaigns] = await Promise.all([getSubscribers(), getCampaigns()])

	const activeSubscribers = subscribers.filter((s) => s.status === "ACTIVE")
	const recentCampaigns = campaigns.slice(0, 5)

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold leading-relaxed">Newsletter Management</h1>
					<p className="text-muted-foreground">Manage subscribers and email campaigns</p>
				</div>
				<Link href="/admin/newsletter/campaigns/new">
					<Button>
						<Plus className="h-4 w-4 mr-2" />
						New Campaign
					</Button>
				</Link>
			</div>

			{/* Stats Cards */}
			<div className="grid gap-4 md:grid-cols-3">
				<Card className="rounded-md shadow-none">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{subscribers.length}</div>
						<p className="text-xs text-muted-foreground">{activeSubscribers.length} active</p>
					</CardContent>
				</Card>

				<Card className="rounded-md shadow-none">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
						<Mail className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{campaigns.length}</div>
						<p className="text-xs text-muted-foreground">{campaigns.filter((c) => c.status === "SENT").length} sent</p>
					</CardContent>
				</Card>

				<Card className="rounded-md shadow-none">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Open Rate</CardTitle>
						<Send className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">24.5%</div>
						<p className="text-xs text-muted-foreground">+2.1% from last month</p>
					</CardContent>
				</Card>
			</div>

			{/* Recent Campaigns */}
			<Card className="rounded-md shadow-none">
				<CardHeader>
					<CardTitle>Recent Campaigns</CardTitle>
					<CardDescription>Your latest email campaigns and their status</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{recentCampaigns.map((campaign) => (
							<div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
								<div>
									<h3 className="font-medium">{campaign.subject}</h3>
									<p className="text-sm text-muted-foreground">
										Newsletter • {new Date(campaign.createdAt).toLocaleDateString()}
									</p>
								</div>
								<Badge
									variant={
										campaign.status === "SENT" ? "default" : campaign.status === "DRAFT" ? "secondary" : "outline"
									}
								>
									{campaign.status}
								</Badge>
							</div>
						))}
						{recentCampaigns.length === 0 && (
							<p className="text-center text-muted-foreground py-8">
								No campaigns yet. Create your first campaign to get started.
							</p>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Subscribers List */}
			<Card className="rounded-md shadow-none">
				<CardHeader>
					<CardTitle>Recent Subscribers</CardTitle>
					<CardDescription>Latest newsletter subscribers</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{activeSubscribers.slice(0, 10).map((subscriber) => (
							<div key={subscriber.id} className="flex items-center justify-between p-4 border rounded-lg">
								<div>
									<h3 className="font-medium">{subscriber.name || "Anonymous"}</h3>
									<p className="text-sm text-muted-foreground">{subscriber.email}</p>
								</div>
								<div className="text-sm text-muted-foreground">
									{new Date(subscriber.createdAt).toLocaleDateString()}
								</div>
							</div>
						))}
						{activeSubscribers.length === 0 && (
							<p className="text-center text-muted-foreground py-8">
								No subscribers yet. Share your newsletter signup to get started.
							</p>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
