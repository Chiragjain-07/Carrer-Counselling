"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { ChevronDown, ChevronUp, BookOpen, Briefcase, GraduationCap } from "lucide-react"

export default function CourseCard({ course }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg text-card-foreground">{course.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {course.duration} • {course.type}
              </p>
            </div>
          </div>
          <Badge className="bg-secondary/10 text-secondary-foreground border-secondary/20">{course.stream}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 text-pretty">{course.description}</p>

        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-card-foreground mb-2 flex items-center">
              <Briefcase className="h-4 w-4 mr-2 text-primary" />
              Popular Career Options
            </h4>
            <div className="flex flex-wrap gap-2">
              {course.careers.slice(0, 3).map((career, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {career}
                </Badge>
              ))}
              {course.careers.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{course.careers.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full justify-between p-0 h-auto text-primary hover:text-primary/80"
          >
            <span>View Career Flowchart</span>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>

          {isExpanded && (
            <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
              <div className="space-y-4">
                {/* Career Path Flow */}
                <div className="flex items-center justify-between text-sm">
                  <div className="text-center flex-1">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold mx-auto mb-1">
                      1
                    </div>
                    <div className="font-medium text-card-foreground">Degree</div>
                    <div className="text-muted-foreground">{course.name}</div>
                  </div>
                  <div className="w-8 h-0.5 bg-border"></div>
                  <div className="text-center flex-1">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-xs font-bold mx-auto mb-1">
                      2
                    </div>
                    <div className="font-medium text-card-foreground">Career Entry</div>
                    <div className="text-muted-foreground">Job Market</div>
                  </div>
                  <div className="w-8 h-0.5 bg-border"></div>
                  <div className="text-center flex-1">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground text-xs font-bold mx-auto mb-1">
                      3
                    </div>
                    <div className="font-medium text-card-foreground">Higher Studies</div>
                    <div className="text-muted-foreground">Specialization</div>
                  </div>
                </div>

                {/* Higher Studies Options */}
                <div>
                  <h5 className="font-semibold text-card-foreground mb-2 flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                    Higher Studies & Exams
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    {course.higherStudies.map((study, index) => (
                      <div key={index} className="text-xs p-2 bg-background rounded border border-border">
                        {study}
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Career Options */}
                <div>
                  <h5 className="font-semibold text-card-foreground mb-2">All Career Paths</h5>
                  <div className="flex flex-wrap gap-1">
                    {course.careers.map((career, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {career}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
