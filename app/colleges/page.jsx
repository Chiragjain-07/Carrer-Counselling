import Navigation from "../../components/navigation"
import CollegeDirectory from "../../components/colleges/college-directory"

export default function CollegesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <CollegeDirectory />
    </div>
  )
}
