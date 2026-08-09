import Navigation from "../../components/navigation"
import CounsellingPage from "../../components/counselling/counselling-page"

export default function CounsellingPageRoute() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <CounsellingPage />
    </div>
  )
}
