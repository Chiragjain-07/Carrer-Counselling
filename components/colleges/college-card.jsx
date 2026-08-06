import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { MapPin, Users, BookOpen, Wifi, Home, FlaskConical, Library, Star } from "lucide-react"

export default function CollegeCard({ college }) {
  const facilityIcons = {
    hostel: <Home className="h-4 w-4" />,
    library: <Library className="h-4 w-4" />,
    labs: <FlaskConical className="h-4 w-4" />,
    wifi: <Wifi className="h-4 w-4" />,
    sports: <Users className="h-4 w-4" />,
  }

  return (
    <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg text-card-foreground mb-2 text-balance">{college.name}</CardTitle>
            <div className="flex items-center text-muted-foreground text-sm mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {college.location}
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-primary/10 text-primary border-primary/20">{college.type}</Badge>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">{college.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Programs Offered */}
        <div>
          <h4 className="font-semibold text-card-foreground mb-2 flex items-center">
            <BookOpen className="h-4 w-4 mr-2 text-primary" />
            Programs Offered
          </h4>
          <div className="flex flex-wrap gap-1">
            {college.programs.map((program, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {program}
              </Badge>
            ))}
          </div>
        </div>

        {/* Facilities */}
        <div>
          <h4 className="font-semibold text-card-foreground mb-2">Facilities</h4>
          <div className="flex flex-wrap gap-2">
            {college.facilities.map((facility, index) => (
              <div key={index} className="flex items-center space-x-1 text-xs bg-muted px-2 py-1 rounded">
                {facilityIcons[facility.toLowerCase()] || <Users className="h-4 w-4" />}
                <span className="text-muted-foreground">{facility}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cut-off Information */}
        <div>
          <h4 className="font-semibold text-card-foreground mb-2">Cut-off Information</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-muted p-2 rounded">
              <div className="text-muted-foreground">General</div>
              <div className="font-medium text-card-foreground">{college.cutoff.general}%</div>
            </div>
            <div className="bg-muted p-2 rounded">
              <div className="text-muted-foreground">Reserved</div>
              <div className="font-medium text-card-foreground">{college.cutoff.reserved}%</div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-sm text-muted-foreground">
          <p>
            <strong>Established:</strong> {college.established}
          </p>
          <p>
            <strong>Affiliation:</strong> {college.affiliation}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            View Details
          </Button>
          <Button size="sm" variant="outline" className="flex-1 border-border hover:bg-muted bg-transparent">
            Save College
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
