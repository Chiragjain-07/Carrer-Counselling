import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Briefcase, Code, Cog, Scale, Stethoscope, FlaskConical, GraduationCap } from "lucide-react"

const careerData = {
  "Arts & Humanities": {
    icon: BookOpen,
    color: "bg-purple-500",
    description:
      "Explore creativity, culture, and human expression through literature, history, philosophy, and the arts.",
    skills: ["Creative Writing", "Critical Thinking", "Cultural Analysis", "Communication"],
    careers: ["Writer", "Historian", "Philosopher", "Art Curator", "Journalist"],
    education: ["Bachelor's in Literature/History", "Master's in Fine Arts", "PhD in Humanities"],
    salary: "₹3-8 LPA",
  },
  "Business": {
    icon: Briefcase,
    color: "bg-green-500",
    description:
      "Lead organizations, manage resources, and drive economic growth through strategic thinking and leadership.",
    skills: ["Leadership", "Strategic Planning", "Financial Analysis", "Marketing"],
    careers: ["Business Analyst", "Marketing Manager", "Entrepreneur", "Consultant"],
    education: ["BBA/BCom", "MBA", "Professional Certifications"],
    salary: "₹4-15 LPA",
  },
  "Computer Science": {
    icon: Code,
    color: "bg-blue-500",
    description: "Build the future through programming, algorithms, and innovative technology solutions.",
    skills: ["Programming", "Problem Solving", "System Design", "Data Analysis"],
    careers: ["Software Developer", "Data Scientist", "AI Engineer", "Cybersecurity Analyst"],
    education: ["BTech/BE in CSE", "MTech", "Online Certifications"],
    salary: "₹6-25 LPA",
  },
  "Engineering": {
    icon: Cog,
    color: "bg-orange-500",
    description: "Design and build solutions that improve lives through mechanical, civil, and electrical systems.",
    skills: ["Technical Design", "Problem Solving", "Project Management", "Innovation"],
    careers: ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer", "Design Engineer"],
    education: ["BTech/BE", "MTech", "Professional Engineering License"],
    salary: "₹4-12 LPA",
  },
  "Law": {
    icon: Scale,
    color: "bg-red-500",
    description: "Uphold justice and protect rights through legal expertise and advocacy.",
    skills: ["Legal Research", "Critical Analysis", "Public Speaking", "Negotiation"],
    careers: ["Lawyer", "Judge", "Legal Advisor", "Corporate Counsel"],
    education: ["LLB", "LLM", "Bar Council Registration"],
    salary: "₹3-20 LPA",
  },
  "Medical": {
    icon: Stethoscope,
    color: "bg-pink-500",
    description: "Heal and care for others through medical knowledge and compassionate service.",
    skills: ["Medical Knowledge", "Empathy", "Problem Solving", "Attention to Detail"],
    careers: ["Doctor", "Surgeon", "Nurse", "Medical Researcher"],
    education: ["MBBS", "MD/MS", "Medical Specialization"],
    salary: "₹5-30 LPA",
  },
  "Research": {
    icon: FlaskConical,
    color: "bg-indigo-500",
    description: "Advance human knowledge through scientific inquiry and innovative discoveries.",
    skills: ["Research Methodology", "Data Analysis", "Scientific Writing", "Critical Thinking"],
    careers: ["Research Scientist", "Lab Researcher", "Academic Researcher", "R&D Engineer"],
    education: ["MSc/MTech", "PhD", "Research Publications"],
    salary: "₹4-15 LPA",
  },
  "Teaching": {
    icon: GraduationCap,
    color: "bg-yellow-500",
    description: "Shape future generations through education and knowledge sharing.",
    skills: ["Communication", "Patience", "Subject Expertise", "Mentoring"],
    careers: ["School Teacher", "Professor", "Educational Consultant", "Curriculum Designer"],
    education: ["BEd", "MEd", "Subject Specialization"],
    salary: "₹3-10 LPA",
  },
}

export default function CareerPathCard({ recommendedCareer, scores }) {
  const career = careerData[recommendedCareer]

  if (!career) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-gray-900 border-gray-700">
        <CardContent className="p-6">
          <p className="text-gray-400">Career information not available.</p>
        </CardContent>
      </Card>
    )
  }

  const IconComponent = career.icon

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gray-900 border-gray-700 overflow-hidden">
      <CardHeader className={`${career.color} text-white p-6`}>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <IconComponent className="w-8 h-8" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">{recommendedCareer}</CardTitle>
            <p className="text-white/90 mt-2">{career.description}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Key Skills */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Key Skills Required</h3>
          <div className="flex flex-wrap gap-2">
            {career.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-600 text-white">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Career Options */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Career Opportunities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {career.careers.map((job, index) => (
              <div key={index} className="bg-gray-800 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-300">{job}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Path */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Education Path</h3>
          <div className="space-y-2">
            {career.education.map((edu, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-gray-300">{edu}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Salary Range */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Expected Salary Range</h3>
          <p className="text-2xl font-bold text-green-400">{career.salary}</p>
          <p className="text-sm text-gray-400 mt-1">*Varies based on experience and location</p>
        </div>

        {/* Your Strengths */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Your Strengths for this Career</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(scores)
              .slice(0, 6)
              .map(([key, value]) => (
                <div key={key} className="bg-gray-800 p-3 rounded-lg">
                  <p className="text-sm text-gray-400 capitalize">{key.replace("_", " ")}</p>
                  <p className="text-lg font-semibold text-white">{Math.round(value)}%</p>
                </div>
              ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Explore Colleges</Button>
          <Button variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
            Find Scholarships
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
