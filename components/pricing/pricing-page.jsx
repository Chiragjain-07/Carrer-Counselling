"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import PricingCard from "./pricing-card"
import { Check, HelpCircle, Users, Zap, Crown } from "lucide-react"

const pricingPlans = [
  {
    name: "Free",
    price: "Free",
    period: null,
    description: "Perfect for getting started with career exploration",
    features: [
      "Complete aptitude quiz",
      "Basic career recommendations",
      "College directory access",
      "Scholarship listings",
      "Timeline view (limited)",
      "Community support",
    ],
    limitations: ["Limited personalized recommendations", "Basic timeline features", "No 1v1 counselling"],
    cta: "Get Started Free",
    additionalInfo: "No credit card required",
    icon: <Users className="h-6 w-6" />,
  },
  {
    name: "Standard",
    price: "₹499",
    period: "month",
    description: "Enhanced features for serious career planning",
    features: [
      "Everything in Free plan",
      "Personalized course recommendations",
      "Advanced timeline tracker",
      "Email reminders & notifications",
      "Detailed career path analysis",
      "Priority customer support",
      "Save unlimited scholarships",
      "College comparison tools",
    ],
    limitations: ["Limited counselling sessions (2/month)"],
    cta: "Start Standard Plan",
    additionalInfo: "Cancel anytime",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    name: "Premium",
    price: "₹999",
    period: "month",
    description: "Complete career guidance with expert support",
    features: [
      "Everything in Standard plan",
      "Unlimited 1v1 video counselling",
      "AI-powered chatbot support",
      "Unlimited MOOC suggestions",
      "Personal career roadmap",
      "Mock interview sessions",
      "Direct college admission guidance",
      "Scholarship application assistance",
      "24/7 priority support",
      "Career mentor assignment",
    ],
    limitations: [],
    cta: "Go Premium",
    additionalInfo: "Most comprehensive package",
    icon: <Crown className="h-6 w-6" />,
  },
]

const faqs = [
  {
    question: "Can I change my plan anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer: "We offer a 7-day free trial for both Standard and Premium plans. No credit card required to start.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, UPI, and net banking for Indian customers.",
  },
  {
    question: "How does the counselling session work?",
    answer:
      "Counselling sessions are conducted via video call (Zoom/Google Meet). You can book sessions with certified career counselors based on your availability.",
  },
  {
    question: "Can I get a refund?",
    answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our premium features.",
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [expandedFaq, setExpandedFaq] = useState(null)

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Choose Your Career Journey</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Select the perfect plan to unlock your potential. From basic career exploration to comprehensive guidance
            with expert counselors.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted p-1 rounded-lg">
            <Button
              variant={billingCycle === "monthly" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBillingCycle("monthly")}
              className={billingCycle === "monthly" ? "bg-primary text-primary-foreground" : ""}
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === "yearly" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBillingCycle("yearly")}
              className={billingCycle === "yearly" ? "bg-primary text-primary-foreground" : ""}
            >
              Yearly
              <span className="ml-2 text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">Save 20%</span>
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} isPopular={index === 1} />
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">Feature Comparison</h2>
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 font-semibold text-card-foreground">Features</th>
                      <th className="text-center p-4 font-semibold text-card-foreground">Free</th>
                      <th className="text-center p-4 font-semibold text-card-foreground">Standard</th>
                      <th className="text-center p-4 font-semibold text-card-foreground">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Aptitude Quiz", true, true, true],
                      ["College Directory", true, true, true],
                      ["Scholarship Listings", true, true, true],
                      ["Personalized Recommendations", false, true, true],
                      ["Timeline Tracker", "Basic", "Advanced", "Advanced"],
                      ["1v1 Counselling", false, "2/month", "Unlimited"],
                      ["AI Chatbot", false, false, true],
                      ["Career Roadmap", false, false, true],
                      ["24/7 Support", false, false, true],
                    ].map((row, index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="p-4 font-medium text-card-foreground">{row[0]}</td>
                        <td className="p-4 text-center">
                          {typeof row[1] === "boolean" ? (
                            row[1] ? (
                              <Check className="h-5 w-5 text-green-600 mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )
                          ) : (
                            <span className="text-card-foreground">{row[1]}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof row[2] === "boolean" ? (
                            row[2] ? (
                              <Check className="h-5 w-5 text-green-600 mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )
                          ) : (
                            <span className="text-card-foreground">{row[2]}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof row[3] === "boolean" ? (
                            row[3] ? (
                              <Check className="h-5 w-5 text-green-600 mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )
                          ) : (
                            <span className="text-card-foreground">{row[3]}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-0">
                  <button
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-muted transition-colors"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <span className="font-medium text-card-foreground">{faq.question}</span>
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4 text-muted-foreground text-pretty">{faq.answer}</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Start Your Career Journey?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty">
                Join thousands of students who have found their perfect career path with our guidance. Start with our
                free plan and upgrade as you grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="border-border hover:bg-muted bg-transparent">
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
