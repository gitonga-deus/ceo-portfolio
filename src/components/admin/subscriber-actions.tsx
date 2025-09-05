"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Mail, UserX, UserCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import type { NewsletterSubscriber } from "@prisma/client"

interface SubscriberActionsProps {
  subscriber: NewsletterSubscriber
}

export function SubscriberActions({ subscriber }: SubscriberActionsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleStatusChange = async (newStatus: "ACTIVE" | "UNSUBSCRIBED") => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/subscribers/${subscriber.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update subscriber")
      }

      router.refresh()
    } catch (error) {
      console.error("Error updating subscriber:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" disabled={isLoading}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {subscriber.status === "ACTIVE" ? (
          <DropdownMenuItem onClick={() => handleStatusChange("UNSUBSCRIBED")}>
            <UserX className="h-4 w-4 mr-2" />
            Unsubscribe
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => handleStatusChange("ACTIVE")}>
            <UserCheck className="h-4 w-4 mr-2" />
            Reactivate
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Mail className="h-4 w-4 mr-2" />
          Send Email
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
