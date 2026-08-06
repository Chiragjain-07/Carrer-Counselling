import { Progress } from "../ui/progress"

export default function QuizProgress({ currentQuestion, totalQuestions }) {
  const progressPercentage = (currentQuestion / totalQuestions) * 100

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">Progress</span>
        <span className="text-sm text-muted-foreground">
          {currentQuestion}/{totalQuestions}
        </span>
      </div>
      <Progress value={progressPercentage} className="h-2 bg-muted" />
    </div>
  )
}
