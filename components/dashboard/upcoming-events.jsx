import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Calendar, Clock, Bell } from "lucide-react"

export default function UpcomingEvents({ events }) {
  const getEventTypeColor = (type) => {
    const colors = {
      admission: "bg-blue-100 text-blue-800 border-blue-200",
      scholarship: "bg-green-100 text-green-800 border-green-200",
      exam: "bg-red-100 text-red-800 border-red-200",
      counselling: "bg-purple-100 text-purple-800 border-purple-200",
    }
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center text-card-foreground">
          <Calendar className="h-5 w-5 mr-2 text-primary" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                <div className="text-sm text-muted-foreground">{event.daysLeft} days</div>
              </div>
              <h4 className="font-medium text-card-foreground mb-1">{event.title}</h4>
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <Clock className="h-4 w-4 mr-1" />
                {event.date} {event.time && `• ${event.time}`}
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1 border-border hover:bg-muted bg-transparent">
                  <Bell className="h-4 w-4 mr-2" />
                  Set Reminder
                </Button>
                <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
