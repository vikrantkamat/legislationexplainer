"use client"

import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

interface Event {
  id: string
  billId: string
  billNumber: string
  title: string
  date: string
  type: "committee" | "floor" | "markup" | "hearing" | "other"
}

interface UpcomingEventsProps {
  events: Event[]
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Get event type badge
  const getEventBadge = (type: string) => {
    switch (type) {
      case "committee":
        return <Badge variant="outline">Committee Vote</Badge>
      case "floor":
        return <Badge variant="outline">Floor Vote</Badge>
      case "markup":
        return <Badge variant="outline">Markup</Badge>
      case "hearing":
        return <Badge variant="outline">Hearing</Badge>
      default:
        return <Badge variant="outline">Event</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {sortedEvents.length > 0 ? (
        sortedEvents.map((event) => (
          <div key={event.id} className="p-3 rounded-lg border bg-card">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{event.billNumber}</div>
                <p className="text-xs text-muted-foreground line-clamp-1">{event.title}</p>
              </div>
              {getEventBadge(event.type)}
            </div>
            <div className="flex items-center mt-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <Clock className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
          <p className="text-muted-foreground">No upcoming events</p>
        </div>
      )}
    </div>
  )
}
