"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import DashboardStats from "./dashboard-stats"
import RecommendationsSection from "./recommendations-section"
import UpcomingEvents from "./upcoming-events"
import { Settings, Edit, TrendingUp, LogOut } from "lucide-react"
import apiClient from "../util/api"

const mockData = {
  stats: {
    quizzesCompleted: 0,
    upcomingDeadlines: 0,
    savedScholarships: 0,
    counsellingSessions: 0,
  },
  recommendations: {
    courses: [
      {
        title: "Introduction to Computer Science",
        platform: "edX",
        duration: "12 weeks",
        match: 95,
      },
      {
        title: "Machine Learning Basics",
        platform: "Coursera",
        duration: "8 weeks",
        match: 88,
      },
    ],
    colleges: [
      {
        name: "Delhi University",
        location: "Delhi",
        distance: "5 km",
        programs: ["B.Sc.", "B.Tech"],
      },
      {
        name: "IIT Delhi",
        location: "Delhi",
        distance: "12 km",
        programs: ["B.Tech", "M.Tech"],
      },
    ],
    scholarships: [
      {
        name: "National Merit Scholarship",
        provider: "Government of India",
        amount: "₹50,000/year",
        daysLeft: 15,
      },
      {
        name: "INSPIRE Scholarship",
        provider: "DST",
        amount: "₹80,000/year",
        daysLeft: 45,
      },
    ],
  },
  upcomingEvents: [
    {
      title: "Take Aptitude Quiz",
      type: "exam",
      date: "Available Now",
      time: "",
      daysLeft: 0,
    },
    {
      title: "Explore Career Paths",
      type: "counselling",
      date: "Available Now",
      time: "",
      daysLeft: 0,
    },
  ],
}

export default function UserDashboard({ user }) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await apiClient.logout()
    } catch (error) {
      console.error("Logout error:", error)
      window.location.href = "/"
    }
  }

  const handleEditProfile = () => {
    router.push("/edit-profile")
  }

  const handleSettings = () => {
    router.push("/settings")
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/student-avatar.png" alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold text-card-foreground">Welcome back, {user.name}!</h1>
                    <p className="text-muted-foreground">Student • Ready to explore career paths</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-muted bg-transparent"
                    onClick={handleEditProfile}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-muted bg-transparent"
                    onClick={handleSettings}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-muted bg-transparent"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <DashboardStats stats={mockData.stats} />
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Recommendations */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Get Started with Your Career Journey
              </h2>
            </div>
            <RecommendationsSection recommendations={mockData.recommendations} />
          </div>

          {/* Right Column - Upcoming Events */}
          <div>
            <UpcomingEvents events={mockData.upcomingEvents} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => (window.location.href = "/quiz")}
                >
                  Take Quiz
                </Button>
                <Button
                  variant="outline"
                  className="border-border hover:bg-muted bg-transparent"
                  onClick={() => (window.location.href = "/colleges")}
                >
                  Find Colleges
                </Button>
                <Button
                  variant="outline"
                  className="border-border hover:bg-muted bg-transparent"
                  onClick={() => (window.location.href = "/scholarships")}
                >
                  Browse Scholarships
                </Button>
                <Button
                  variant="outline"
                  className="border-border hover:bg-muted bg-transparent"
                  onClick={() => (window.location.href = "/counselling")}
                >
                  Book Counselling
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
