"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { CheckCircle, BookOpen, Briefcase, Palette, Wrench } from "lucide-react"

export default function QuizResults({ results, onRetakeQuiz, onExploreCareer }) {
  const streamIcons = {
    science: <BookOpen className="h-6 w-6" />,
    commerce: <Briefcase className="h-6 w-6" />,
    arts: <Palette className="h-6 w-6" />,
    vocational: <Wrench className="h-6 w-6" />,
  }

  const streamColors = {
    science: "bg-blue-100 text-blue-800 border-blue-200",
    commerce: "bg-green-100 text-green-800 border-green-200",
    arts: "bg-purple-100 text-purple-800 border-purple-200",
    vocational: "bg-orange-100 text-orange-800 border-orange-200",
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Success Header */}
      <Card className="text-center bg-card border-border">
        <CardContent className="pt-6">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-card-foreground mb-2">Quiz Complete!</h2>
          <p className="text-muted-foreground">Based on your responses, here are your recommended career streams</p>
        </CardContent>
      </Card>

      {/* Recommended Streams */}
      <div className="grid gap-6 md:grid-cols-2">
        {results.recommendedStreams.map((stream, index) => (
          <Card key={stream.name} className="bg-card border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">{streamIcons[stream.type]}</div>
                  <div>
                    <CardTitle className="text-lg text-card-foreground">{stream.name}</CardTitle>
                    <Badge className={`mt-1 ${streamColors[stream.type]}`}>{stream.match}% Match</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-pretty">{stream.description}</p>
              <div className="space-y-2">
                <h4 className="font-semibold text-card-foreground">Popular Careers:</h4>
                <div className="flex flex-wrap gap-2">
                  {stream.careers.map((career, careerIndex) => (
                    <Badge key={careerIndex} variant="outline" className="text-xs">
                      {career}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button
                className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => onExploreCareer(stream.type)}
              >
                Explore {stream.name} Careers
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Personality Insights */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Your Personality Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {results.personalityTraits.map((trait, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">{trait.score}%</div>
                <div className="font-medium text-card-foreground mb-1">{trait.name}</div>
                <div className="text-sm text-muted-foreground">{trait.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" onClick={onRetakeQuiz} className="border-border hover:bg-muted bg-transparent">
          Retake Quiz
        </Button>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => onExploreCareer("all")}
        >
          Explore All Career Paths
        </Button>
      </div>
    </div>
  )
}
