import Navigation from "../../components/navigation"
import AptitudeQuiz from "../../components/quiz/aptitude-quiz"

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AptitudeQuiz />
    </div>
  )
}
