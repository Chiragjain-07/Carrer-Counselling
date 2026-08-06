import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Clock, Users, Star, ExternalLink, BookmarkPlus } from "lucide-react"

export default function CourseCard({ course }) {
  const getPlatformColor = (platform) => {
    const colors = {
      Coursera: "bg-blue-100 text-blue-800 border-blue-200",
      edX: "bg-purple-100 text-purple-800 border-purple-200",
      NPTEL: "bg-green-100 text-green-800 border-green-200",
      Udemy: "bg-orange-100 text-orange-800 border-orange-200",
      "Khan Academy": "bg-teal-100 text-teal-800 border-teal-200",
    }
    return colors[platform] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getDifficultyColor = (level) => {
    const colors = {
      Beginner: "bg-green-100 text-green-800 border-green-200",
      Intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Advanced: "bg-red-100 text-red-800 border-red-200",
    }
    return colors[level] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge className={getPlatformColor(course.platform)}>{course.platform}</Badge>
          <Badge className={getDifficultyColor(course.level)}>{course.level}</Badge>
        </div>
        <CardTitle className="text-lg text-card-foreground text-balance">{course.title}</CardTitle>
        <p className="text-sm text-muted-foreground">by {course.instructor}</p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          {/* Course Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center text-primary">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{course.duration}</span>
              </div>
              <div className="text-xs text-muted-foreground">Duration</div>
            </div>
            <div>
              <div className="flex items-center justify-center text-primary">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{course.enrolled}</span>
              </div>
              <div className="text-xs text-muted-foreground">Enrolled</div>
            </div>
            <div>
              <div className="flex items-center justify-center text-primary">
                <Star className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground text-pretty">{course.description}</p>

          {/* Skills */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-2">Skills You'll Learn</h4>
            <div className="flex flex-wrap gap-1">
              {course.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              {course.price === "Free" ? (
                <span className="text-lg font-bold text-green-600">Free</span>
              ) : (
                <div>
                  <span className="text-lg font-bold text-card-foreground">{course.price}</span>
                  {course.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through ml-2">{course.originalPrice}</span>
                  )}
                </div>
              )}
            </div>
            {course.certificate && (
              <Badge variant="outline" className="text-xs">
                Certificate Available
              </Badge>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4 mt-auto">
          <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            <ExternalLink className="h-4 w-4 mr-2" />
            Enroll Now
          </Button>
          <Button size="sm" variant="outline" className="border-border hover:bg-muted bg-transparent">
            <BookmarkPlus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
