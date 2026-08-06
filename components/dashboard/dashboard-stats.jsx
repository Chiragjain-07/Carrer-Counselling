import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { BookOpen, Calendar, Award, Video } from "lucide-react"

export default function DashboardStats({ stats }) {
  const statItems = [
    {
      title: "Quizzes Completed",
      value: stats.quizzesCompleted,
      icon: <BookOpen className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Upcoming Deadlines",
      value: stats.upcomingDeadlines,
      icon: <Calendar className="h-5 w-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Saved Scholarships",
      value: stats.savedScholarships,
      icon: <Award className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Counselling Sessions",
      value: stats.counsellingSessions,
      icon: <Video className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item, index) => (
        <Card key={index} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">{item.title}</CardTitle>
            <div className={`p-2 rounded-lg ${item.bgColor} ${item.color}`}>{item.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
