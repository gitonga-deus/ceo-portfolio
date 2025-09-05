"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Send, TestTube, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import type { EmailCampaign } from "@prisma/client"

interface CampaignActionsProps {
  campaign: EmailCampaign
}

export function CampaignActions({ campaign }: CampaignActionsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [testEmail, setTestEmail] = useState("")
  const [showTestDialog, setShowTestDialog] = useState(false)

  const handleSendCampaign = async () => {
    if (!confirm("Are you sure you want to send this campaign to all subscribers?")) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/newsletter/campaigns/${campaign.id}/send`, {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to send campaign")
      }

      router.refresh()
    } catch (error) {
      console.error("Error sending campaign:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendTest = async () => {
    if (!testEmail) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/newsletter/campaigns/${campaign.id}/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testEmail }),
      })

      if (!response.ok) {
        throw new Error("Failed to send test email")
      }

      setShowTestDialog(false)
      setTestEmail("")
    } catch (error) {
      console.error("Error sending test email:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" disabled={isLoading}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowTestDialog(true)}>
            <TestTube className="h-4 w-4 mr-2" />
            Send Test
          </DropdownMenuItem>
          {campaign.status === "DRAFT" && (
            <DropdownMenuItem onClick={handleSendCampaign}>
              <Send className="h-4 w-4 mr-2" />
              Send Campaign
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showTestDialog} onOpenChange={setShowTestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Test Email</DialogTitle>
            <DialogDescription>Send a test version of this campaign to verify how it looks.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Test Email Address</label>
              <Input
                type="email"
                placeholder="test@example.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSendTest} disabled={!testEmail || isLoading}>
                {isLoading ? "Sending..." : "Send Test"}
              </Button>
              <Button variant="outline" onClick={() => setShowTestDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
