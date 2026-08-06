import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Calendar,
  DollarSign,
  Users,
  ExternalLink,
  Clock,
  BookmarkPlus,
} from "lucide-react";

export default function ScholarshipCard({ scholarship }) {
  const getUrgencyColor = (daysLeft) => {
    if (daysLeft <= 7) return "bg-red-100 text-red-800 border-red-200";
    if (daysLeft <= 30)
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-green-100 text-green-800 border-green-200";
  };

  const getTypeColor = (type) => {
    const colors = {
      "Merit-based": "bg-blue-100 text-blue-800 border-blue-200",
      "Need-based": "bg-purple-100 text-purple-800 border-purple-200",
      Sports: "bg-orange-100 text-orange-800 border-orange-200",
      Minority: "bg-teal-100 text-teal-800 border-teal-200",
      Research: "bg-indigo-100 text-indigo-800 border-indigo-200",
    };
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge className={getTypeColor(scholarship.type)}>
            {scholarship.type}
          </Badge>
          <Badge className={getUrgencyColor(scholarship.daysLeft)}>
            <Clock className="h-3 w-3 mr-1" />
            {scholarship.daysLeft} days left
          </Badge>
        </div>
        <CardTitle className="text-lg text-card-foreground text-balance">
          {scholarship.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          by {scholarship.provider}
        </p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          {/* Amount */}
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="font-semibold text-card-foreground">
              {scholarship.amount}
            </span>
          </div>

          {/* Eligibility */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-2 flex items-center">
              <Users className="h-4 w-4 mr-2 text-primary" />
              Eligibility
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {scholarship.eligibility.map((criteria, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {criteria}
                </li>
              ))}
            </ul>
          </div>

          {/* Deadline */}
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-card-foreground">
              <strong>Deadline:</strong> {scholarship.deadline}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground text-pretty">
            {scholarship.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4 mt-auto">
          <Button
            size="sm"
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Apply Now
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-border hover:bg-muted bg-transparent"
          >
            <BookmarkPlus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
