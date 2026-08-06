import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { ArrowRight, BookOpen, MapPin, Award } from "lucide-react"

export default function RecommendationsSection({ recommendations }) {
  return (
    <div className="space-y-6">
      {/* Suggested Courses */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center text-card-foreground">
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            Recommended Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.courses.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-card-foreground">{course.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {course.platform} • {course.duration}
                  </p>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                      {course.match}% Match
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-border hover:bg-background bg-transparent">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nearby Colleges */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center text-card-foreground">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            Nearby Colleges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.colleges.map((college, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-card-foreground">{college.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {college.location} • {college.distance}
                  </p>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="text-xs">
                      {college.programs.join(", ")}
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-border hover:bg-background bg-transparent">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Saved Scholarships */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center text-card-foreground">
            <Award className="h-5 w-5 mr-2 text-primary" />
            Saved Scholarships
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.scholarships.map((scholarship, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-card-foreground">{scholarship.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {scholarship.provider} • {scholarship.amount}
                  </p>
                  <div className="flex items-center mt-1">
                    <Badge
                      className={`text-xs ${
                        scholarship.daysLeft <= 7
                          ? "bg-red-100 text-red-800 border-red-200"
                          : scholarship.daysLeft <= 30
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-green-100 text-green-800 border-green-200"
                      }`}
                    >
                      {scholarship.daysLeft} days left
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-border hover:bg-background bg-transparent">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
