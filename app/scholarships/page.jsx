import Navigation from "../../components/navigation"
import ScholarshipDirectory from "../../components/scholarships/scholarship-directory"

export default function ScholarshipsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ScholarshipDirectory />
    </div>
  )
}
