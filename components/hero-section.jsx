import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Link from "next/link";

import {
  ArrowRight,
  Award,
  Video,
  Sparkles,
  Target,
  TrendingUp,
  Mic,
  MapPin,
  FileText,
  Brain,
  GraduationCap,
  Clock,
  Check,
  Star,
  Users,
} from "lucide-react";

export default function HeroSection() {
  const features = [
    {
      icon: <Mic className="h-6 w-6" />,
      title: "AI Voice Agent",
      description: "Chat with our AI counselor anytime",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Career Prediction Quiz",
      description: "AI-powered career path predictions",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "College Finder",
      description: "Search colleges by location & course",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Scholarships",
      description: "Find funding for your education",
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Course Recommendations",
      description: "Personalized course suggestions",
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "1v1 Video Counselling",
      description: "Live sessions with expert counselors",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Exam Timeline",
      description: "Track upcoming entrance exams",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Resume Builder",
      description: "Create professional resumes",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-6 border border-border">
            <Sparkles className="h-4 w-4 mr-2" />
            Trusted by 50,000+ Class 10th & 12th Students
          </div>

          <h1 className="text-4xl md:text-7xl font-bold text-foreground mb-6 text-balance">
            Shape Your Future After{" "}
            <span className="text-primary">Class 10th & 12th</span>
          </h1>
          <div className="mb-4">
            <img
              src="/1.png"
              alt="CareerGuide AI team"
              className="rounded-lg shadow-sm max-w-full h-auto"
            />
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto text-pretty">
            Navigate your career journey with confidence using our AI-powered
            platform. From career prediction quizzes to personalized counseling,
            we provide everything you need to make informed decisions about your
            academic and professional future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/quiz">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 group"
            >
              Start Career Assessment
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            </Link>
            <Link href="/counselling">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              Talk to AI Counselor
            </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground mb-16">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <span>95+% Career Match Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>1000+ Success Stories</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span>Expert Career Counselors</span>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 bg-card border-border group cursor-pointer"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground text-pretty">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mb-4">
          <img
            src="/2.png"
            alt="CareerGuide AI team"
            className="rounded-lg shadow-sm max-w-full h-auto"
          />
        </div>
        <div className="mb-4">
          <img
            src="/3.png"
            alt="CareerGuide AI team"
            className="rounded-lg shadow-sm max-w-full h-auto"
          />
        </div>
        <div className="mb-4">
          <img
            src="/4.png"
            alt="CareerGuide AI team"
            className="rounded-lg shadow-sm max-w-full h-auto"
          />
        </div>
        {/* Quick Actions */}
        <div className="rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Get Started in Minutes
            </h2>
            <p className="text-muted-foreground">
              Choose your path and begin your career discovery journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Take Assessment</h3>
                <p className="text-sm text-muted-foreground">
                  Complete our AI-powered career prediction quiz
                </p>
              </div>
            </Card>
            <Card className="p-6 bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Explore Options</h3>
                <p className="text-sm text-muted-foreground">
                  Discover courses, colleges, and career paths
                </p>
              </div>
            </Card>
            <Card className="p-6 bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Get Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  Book 1v1 counseling sessions with experts
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Empowering Students Across India
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of Class 10th & 12th students who have successfully
              planned their career paths with our AI-powered guidance
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                50,000+
              </div>
              <div className="text-muted-foreground font-medium">
                Students Guided
              </div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                2,500+
              </div>
              <div className="text-muted-foreground font-medium">
                Colleges Listed
              </div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                800+
              </div>
              <div className="text-muted-foreground font-medium">
                Career Paths
              </div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                1,500+
              </div>
              <div className="text-muted-foreground font-medium">
                Scholarships
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Success Stories from Students Like You
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Arjun Kumar",
                role: "Class 12th → Engineering",
                content:
                  "The AI career prediction was spot-on! It helped me choose the right engineering stream and I got into my dream college.",
              },
              {
                name: "Sneha Patel",
                role: "Class 10th → Medical Stream",
                content:
                  "Found amazing scholarships through the platform. The 1v1 counseling session cleared all my doubts about NEET preparation.",
              },
              {
                name: "Rohit Singh",
                role: "Class 12th → Commerce",
                content:
                  "The resume builder helped me create a professional profile for college applications. Now I'm pursuing CA with confidence!",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 bg-card border-border">
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-card-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-primary">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Choose Your Career Guidance Plan
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unlock premium features and get personalized guidance to
              accelerate your career journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <Card className="p-8 bg-background border-border relative">
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Free Explorer
                </h3>
                <div className="text-3xl font-bold text-primary mb-4">
                  ₹0
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Basic career quiz</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">College search (limited)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Basic scholarship info</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full bg-transparent">
                  Get Started Free
                </Button>
              </div>
            </Card>

            {/* Premium Plan */}
            <Card className="p-8 bg-background border-primary relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Premium Guide
                </h3>
                <div className="text-3xl font-bold text-primary mb-4">
                  ₹999
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">
                      Advanced AI career prediction
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Unlimited college search</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">AI voice agent access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Resume builder</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Exam timeline tracker</span>
                  </li>
                </ul>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Choose Premium
                </Button>
              </div>
            </Card>

            {/* Pro Plan */}
            <Card className="p-8 bg-background border-border relative">
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Pro Counselor
                </h3>
                <div className="text-3xl font-bold text-primary mb-4">
                  ₹1,999
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Everything in Premium</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">
                      1v1 video counseling (4 sessions)
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Priority scholarship alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">
                      Personalized course recommendations
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">24/7 expert support</span>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  Choose Pro
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="bg-background py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">
                  CareerGuide AI
                </span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Empowering Class 10th & 12th students to make informed career
                decisions with AI-powered guidance, expert counseling, and
                comprehensive resources.
              </p>

              <div className="flex gap-4">
                <Button size="sm" variant="outline">
                  <Star className="h-4 w-4 mr-2" />
                  4.9/5 Rating
                </Button>
                <Button size="sm" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  50k+ Users
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Career Assessment
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    College Finder
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Scholarships
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Exam Timeline
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Resume Builder
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center bg-primary/5 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Ready to Shape Your Future?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of students who have found their perfect career
              path
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Start Your Journey Today
                </Button>
              </Link>
              <Link href="/counselling">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                Book Free Consultation
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t border-border pt-8 mt-8 text-center text-muted-foreground">
        <p>
          &copy; 2025 CareerGuide AI. All rights reserved. Made with ❤️ for
          students across India.
        </p>
      </div>
    </div>
  );
}
