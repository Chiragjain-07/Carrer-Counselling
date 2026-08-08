import Navigation from "../../components/navigation"
import MOOCDirectory from "../../components/moocs/mooc-directory"

export default function MOOCsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <MOOCDirectory />
    </div>
  )
}
