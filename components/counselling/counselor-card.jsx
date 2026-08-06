"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Star, Clock, Video, Calendar } from "lucide-react"

export default function CounselorCard({ counselor, onBookSession }) {
  return (
    <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={counselor.image || "/placeholder.svg"} alt={counselor.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
              {counselor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg text-card-foreground">{counselor.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{counselor.title}</p>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium">{counselor.rating}</span>
              <span className="text-sm text-muted-foreground ml-1">({counselor.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Specializations */}
        <div>
          <h4 className="font-semibold text-card-foreground mb-2">Specializations</h4>
          <div className="flex flex-wrap gap-1">
            {counselor.specializations.map((spec, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        {/* Experience & Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary">{counselor.experience}</div>
            <div className="text-xs text-muted-foreground">Years Exp.</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">{counselor.sessionsCompleted}</div>
            <div className="text-xs text-muted-foreground">Sessions</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">{counselor.responseTime}</div>
            <div className="text-xs text-muted-foreground">Response</div>
          </div>
        </div>

        {/* About */}
        <div>
          <h4 className="font-semibold text-card-foreground mb-2">About</h4>
          <p className="text-sm text-muted-foreground text-pretty">{counselor.about}</p>
        </div>

        {/* Session Info */}
        <div className="bg-muted p-3 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-1 text-primary" />
              <span className="text-card-foreground">{counselor.sessionDuration} min session</span>
            </div>
            <div className="text-sm font-semibold text-card-foreground">₹{counselor.price}</div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Video className="h-4 w-4 mr-1" />
            <span>Video call via Zoom/Google Meet</span>
          </div>
        </div>

        {/* Available Slots */}
        <div>
          <h4 className="font-semibold text-card-foreground mb-2 flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            Next Available
          </h4>
          <div className="flex flex-wrap gap-2">
            {counselor.availableSlots.slice(0, 3).map((slot, index) => (
              <Badge key={index} className="bg-secondary/10 text-secondary-foreground border-secondary/20">
                {slot}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button
            size="sm"
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => onBookSession(counselor)}
          >
            <Video className="h-4 w-4 mr-2" />
            Book Session
          </Button>
          <Button size="sm" variant="outline" className="border-border hover:bg-muted bg-transparent">
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
