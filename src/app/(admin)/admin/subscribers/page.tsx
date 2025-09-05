import { getSubscribers } from "@/lib/newsletter"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Mail, UserCheck, UserX } from "lucide-react"
import { SubscriberActions } from "@/components/admin/subscriber-actions"

export default async function SubscribersPage() {
	const subscribers = await getSubscribers()

	const activeSubscribers = subscribers.filter((s) => s.status === "ACTIVE")
	const unsubscribedCount = subscribers.filter((s) => s.status === "UNSUBSCRIBED").length

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold leading-relaxed">Subscribers</h1>
				<p className="text-muted-foreground">Manage your newsletter subscribers and their preferences</p>
			</div>

			{/* Stats Cards */}
			<div className="grid gap-4 md:grid-cols-4">
				<Card className="rounded-md shadow-none">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{subscribers.length}</div>
					</CardContent>
				</Card>

				<Card className="rounded-md shadow-none">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Active</CardTitle>
						<UserCheck className="h-4 w-4 text-green-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">{activeSubscribers.length}</div>
					</CardContent>
				</Card>

				<Card className="rounded-md shadow-none">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Unsubscribed</CardTitle>
						<UserX className="h-4 w-4 text-red-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-red-600">{unsubscribedCount}</div>
					</CardContent>
				</Card>

				<Card className="rounded-md shadow-none">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
						<Mail className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">+12%</div>
						<p className="text-xs text-muted-foreground">vs last month</p>
					</CardContent>
				</Card>
			</div>

			{/* Subscribers List */}
			<Card className="rounded-md shadow-none">
				<CardHeader>
					<CardTitle>All Subscribers</CardTitle>
					<CardDescription>Complete list of newsletter subscribers and their status</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{subscribers.map((subscriber) => (
							<div key={subscriber.id} className="flex items-center justify-between p-4 border rounded-lg">
								<div className="flex-1">
									<div className="flex items-center gap-3">
										<div>
											<h3 className="font-medium">{subscriber.name || "Anonymous"}</h3>
											<p className="text-sm text-muted-foreground">{subscriber.email}</p>
										</div>
										<Badge variant={subscriber.status === "ACTIVE" ? "default" : "secondary"}>
											{subscriber.status}
										</Badge>
									</div>
								</div>
								<div className="flex items-center gap-4">
									<div className="text-sm text-muted-foreground">
										Joined {new Date(subscriber.createdAt).toLocaleDateString()}
									</div>
									<SubscriberActions subscriber={subscriber} />
								</div>
							</div>
						))}
						{subscribers.length === 0 && (
							<div className="text-center py-12">
								<Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
								<h3 className="text-lg font-medium mb-2">No subscribers yet</h3>
								<p className="text-muted-foreground">Start promoting your newsletter to get your first subscribers.</p>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
