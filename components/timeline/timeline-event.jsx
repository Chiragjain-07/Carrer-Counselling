"use client"

import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Calendar, Clock, Bell, ExternalLink } from "lucide-react"

export default function TimelineEvent({ event, onSetReminder }) {
  const getEventTypeColor = (type) => {
    const colors = {
      admission: "bg-blue-100 text-blue-800 border-blue-200",
      scholarship: "bg-green-100 text-green-800 border-green-200",
      exam: "bg-red-100 text-red-800 border-red-200",
      application: "bg-purple-100 text-purple-800 border-purple-200",
    }
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getUrgencyColor = (daysLeft) => {
    if (daysLeft <= 7) return "text-red-600"
    if (daysLeft <= 30) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <Card className="bg-card border-border hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
          <div className={`text-sm font-medium ${getUrgencyColor(event.daysLeft)}`}>
            {event.daysLeft > 0 ? `${event.daysLeft} days left` : event.daysLeft === 0 ? "Today" : "Overdue"}
          </div>
        </div>

        <h3 className="font-semibold text-card-foreground mb-2 text-balance">{event.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 text-pretty">{event.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span>{event.date}</span>
          </div>
          {event.time && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              <span>{event.time}</span>
            </div>
          )}
          {event.organization && (
            <div className="text-sm text-muted-foreground">
              <strong>Organization:</strong> {event.organization}
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onSetReminder(event)}
            className="flex-1 border-border hover:bg-muted bg-transparent"
          >
            <Bell className="h-4 w-4 mr-2" />
            Set Reminder
          </Button>
          {event.link && (
            <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
