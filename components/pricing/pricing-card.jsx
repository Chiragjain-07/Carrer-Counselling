import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Check, Star } from "lucide-react"

export default function PricingCard({ plan, isPopular = false }) {
  return (
    <Card
      className={`relative bg-card border-border hover:shadow-lg transition-shadow duration-300 ${
        isPopular ? "ring-2 ring-primary" : ""
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-3 py-1">
            <Star className="h-3 w-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl text-card-foreground">{plan.name}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold text-card-foreground">{plan.price}</span>
          {plan.period && <span className="text-muted-foreground">/{plan.period}</span>}
        </div>
        <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Features */}
        <div className="space-y-3">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-card-foreground">{feature}</span>
            </div>
          ))}
        </div>

        {/* Limitations (if any) */}
        {plan.limitations && plan.limitations.length > 0 && (
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Limitations:</p>
            <div className="space-y-1">
              {plan.limitations.map((limitation, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{limitation}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="pt-4">
          <Button
            className={`w-full ${
              isPopular
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : plan.price === "Free"
                  ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {plan.cta}
          </Button>
        </div>

        {/* Additional Info */}
        {plan.additionalInfo && <p className="text-xs text-center text-muted-foreground pt-2">{plan.additionalInfo}</p>}
      </CardContent>
    </Card>
  )
}
