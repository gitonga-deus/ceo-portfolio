import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Send, Calendar, Users } from "lucide-react"
import Link from "next/link"
import { getCampaigns } from "@/lib/newsletter"
import { CampaignActions } from "@/components/admin/campaign-actions"
import { formatDistanceToNow } from "date-fns"

async function CampaignsList() {
    const campaigns = await getCampaigns()

    const getStatusColor = (status: string) => {
        switch (status) {
            case "DRAFT":
                return "secondary"
            case "SCHEDULED":
                return "default"
            case "SENDING":
                return "destructive"
            case "SENT":
                return "default"
            case "CANCELLED":
                return "outline"
            default:
                return "secondary"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "SCHEDULED":
                return <Calendar className="h-3 w-3" />
            case "SENT":
                return <Send className="h-3 w-3" />
            default:
                return null
        }
    }

    return (
        <div className="space-y-4">
            {campaigns.length === 0 ? (
                <Card className="rounded-md shadow-none">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Send className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
                        <p className="text-muted-foreground text-center mb-4">
                            Create your first email campaign to start engaging with your subscribers.
                        </p>
                        <Button asChild>
                            <Link href="/admin/newsletter/campaigns/new">
                                <Plus className="h-4 w-4 mr-2" />
                                Create Campaign
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {campaigns.map((campaign) => (
                        <Card key={campaign.id} className="rounded-md shadow-none">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg">{campaign.subject}</CardTitle>
                                        <CardDescription>
                                            Created {formatDistanceToNow(campaign.createdAt, { addSuffix: true })}
                                            {campaign.sentAt && <> • Sent {formatDistanceToNow(campaign.sentAt, { addSuffix: true })}</>}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant={getStatusColor(campaign.status)} className="flex items-center gap-1">
                                            {getStatusIcon(campaign.status)}
                                            {campaign.status}
                                        </Badge>
                                        <CampaignActions campaign={campaign} />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-4">
                                        <Users className="h-4 w-4" />
                                        {campaign.recipientCount} recipients
                                    </div>
                                    {campaign.openCount > 0 && (
                                        <div>
                                            {campaign.openCount} opens ({((campaign.openCount / campaign.recipientCount) * 100).toFixed(1)}%)
                                        </div>
                                    )}
                                    {campaign.clickCount > 0 && <div>{campaign.clickCount} clicks</div>}
                                </div>
                                <div className="mt-3 text-sm text-muted-foreground line-clamp-2">
                                    {campaign.content.substring(0, 200)}...
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function CampaignsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold leading-relaxed">Email Campaigns</h1>
                    <p className="text-muted-foreground">Create and manage your email campaigns to engage with subscribers.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/newsletter/campaigns/new">
                        <Plus className="h-4 w-4 mr-2" />
                        New Campaign
                    </Link>
                </Button>
            </div>

            <Suspense fallback={<div>Loading campaigns...</div>}>
                <CampaignsList />
            </Suspense>
        </div>
    )
}
