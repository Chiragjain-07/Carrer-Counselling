"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Calendar, Clock, Video, CreditCard } from "lucide-react"

export default function BookingModal({ isOpen, onClose, counselor }) {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [sessionType, setSessionType] = useState("career-guidance")
  const [concerns, setConcerns] = useState("")
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const handleBooking = () => {
    // Handle booking logic here
    console.log("Booking session:", {
      counselor: counselor?.name,
      date: selectedDate,
      time: selectedTime,
      type: sessionType,
      concerns,
      contact: contactInfo,
    })
    onClose()
  }

  if (!counselor) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Book Session with {counselor.name}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Schedule your 1-on-1 career counselling session. All sessions are conducted via video call.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Session Details */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-card-foreground">{counselor.sessionDuration} Minute Session</h3>
                <p className="text-sm text-muted-foreground">Video call consultation</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary">₹{counselor.price}</div>
                <div className="text-sm text-muted-foreground">per session</div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-card-foreground">Contact Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name" className="text-card-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                  className="bg-input border-border"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-card-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  className="bg-input border-border"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone" className="text-card-foreground">
                Phone Number
              </Label>
              <Input
                id="phone"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                className="bg-input border-border"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Date & Time Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-card-foreground flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              Select Date & Time
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="date" className="text-card-foreground">
                  Preferred Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-input border-border"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-card-foreground">
                  Available Time Slots
                </Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {counselor.availableSlots.map((slot, index) => (
                      <SelectItem key={index} value={slot}>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {slot}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Session Type */}
          <div>
            <Label htmlFor="sessionType" className="text-card-foreground">
              Session Type
            </Label>
            <Select value={sessionType} onValueChange={setSessionType}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="career-guidance">Career Guidance</SelectItem>
                <SelectItem value="stream-selection">Stream Selection</SelectItem>
                <SelectItem value="college-admission">College Admission</SelectItem>
                <SelectItem value="exam-preparation">Exam Preparation</SelectItem>
                <SelectItem value="skill-development">Skill Development</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Concerns */}
          <div>
            <Label htmlFor="concerns" className="text-card-foreground">
              What would you like to discuss? (Optional)
            </Label>
            <Textarea
              id="concerns"
              value={concerns}
              onChange={(e) => setConcerns(e.target.value)}
              className="bg-input border-border"
              placeholder="Briefly describe your concerns or questions..."
              rows={3}
            />
          </div>

          {/* Video Call Info */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <Video className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900">Video Call Instructions</h4>
                <p className="text-sm text-blue-700 mt-1">
                  You'll receive a Zoom/Google Meet link via email 30 minutes before your session. Please ensure you
                  have a stable internet connection and a quiet environment.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 border-border hover:bg-muted bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime || !contactInfo.name || !contactInfo.email}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Book & Pay ₹{counselor.price}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
