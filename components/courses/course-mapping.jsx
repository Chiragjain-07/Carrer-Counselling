"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import CourseCard from "./course-card"
import { Search, Filter } from "lucide-react"

const coursesData = [
  {
    name: "Bachelor of Science (B.Sc.)",
    duration: "3 Years",
    type: "Undergraduate",
    stream: "Science",
    description:
      "A comprehensive science degree covering physics, chemistry, mathematics, and biology with specialization options.",
    careers: [
      "Research Scientist",
      "Lab Technician",
      "Data Analyst",
      "Quality Control Analyst",
      "Environmental Scientist",
      "Biotech Researcher",
    ],
    higherStudies: ["M.Sc.", "Ph.D.", "MBA", "B.Ed.", "Medical Entrance", "Engineering Entrance"],
  },
  {
    name: "Bachelor of Commerce (B.Com.)",
    duration: "3 Years",
    type: "Undergraduate",
    stream: "Commerce",
    description:
      "Business and commerce focused degree covering accounting, finance, economics, and business management.",
    careers: [
      "Chartered Accountant",
      "Financial Analyst",
      "Bank Manager",
      "Tax Consultant",
      "Business Analyst",
      "Investment Advisor",
    ],
    higherStudies: ["M.Com.", "MBA", "CA", "CS", "CMA", "CFA"],
  },
  {
    name: "Bachelor of Arts (B.A.)",
    duration: "3 Years",
    type: "Undergraduate",
    stream: "Arts",
    description:
      "Liberal arts degree with options in literature, history, psychology, sociology, and political science.",
    careers: ["Teacher", "Journalist", "Social Worker", "Content Writer", "Civil Services", "Psychologist"],
    higherStudies: ["M.A.", "B.Ed.", "MBA", "Law", "Civil Services", "Mass Communication"],
  },
  {
    name: "Bachelor of Computer Applications (BCA)",
    duration: "3 Years",
    type: "Undergraduate",
    stream: "Vocational",
    description: "Computer science and applications focused degree for software development and IT careers.",
    careers: [
      "Software Developer",
      "Web Developer",
      "System Analyst",
      "Database Administrator",
      "IT Consultant",
      "Mobile App Developer",
    ],
    higherStudies: ["MCA", "M.Tech", "MBA", "Certifications", "MS abroad", "Data Science"],
  },
  {
    name: "Bachelor of Engineering (B.E./B.Tech)",
    duration: "4 Years",
    type: "Undergraduate",
    stream: "Science",
    description:
      "Engineering degree with specializations in various fields like computer science, mechanical, electrical, and civil.",
    careers: [
      "Software Engineer",
      "Mechanical Engineer",
      "Civil Engineer",
      "Electrical Engineer",
      "Design Engineer",
      "Project Manager",
    ],
    higherStudies: ["M.Tech", "MBA", "MS abroad", "Ph.D.", "Management Trainee", "PSU Jobs"],
  },
  {
    name: "Bachelor of Business Administration (BBA)",
    duration: "3 Years",
    type: "Undergraduate",
    stream: "Commerce",
    description:
      "Management and business administration degree focusing on leadership, marketing, and organizational skills.",
    careers: [
      "Business Manager",
      "Marketing Executive",
      "HR Manager",
      "Operations Manager",
      "Sales Manager",
      "Entrepreneur",
    ],
    higherStudies: ["MBA", "PGDM", "Specialized Masters", "Certifications", "Family Business", "Startup"],
  },
]

export default function CourseMapping() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStream, setSelectedStream] = useState("All")
  const [filteredCourses, setFilteredCourses] = useState(coursesData)

  const streams = ["All", "Science", "Commerce", "Arts", "Vocational"]

  const handleSearch = (term) => {
    setSearchTerm(term)
    filterCourses(term, selectedStream)
  }

  const handleStreamFilter = (stream) => {
    setSelectedStream(stream)
    filterCourses(searchTerm, stream)
  }

  const filterCourses = (term, stream) => {
    let filtered = coursesData

    if (stream !== "All") {
      filtered = filtered.filter((course) => course.stream === stream)
    }

    if (term) {
      filtered = filtered.filter(
        (course) =>
          course.name.toLowerCase().includes(term.toLowerCase()) ||
          course.description.toLowerCase().includes(term.toLowerCase()) ||
          course.careers.some((career) => career.toLowerCase().includes(term.toLowerCase())),
      )
    }

    setFilteredCourses(filtered)
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Course to Career Mapping</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Explore different degree programs and discover the career paths they lead to. Each course shows you the
            complete journey from graduation to career success.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses or careers..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-input border-border"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {streams.map((stream) => (
              <Button
                key={stream}
                variant={selectedStream === stream ? "default" : "outline"}
                size="sm"
                onClick={() => handleStreamFilter(stream)}
                className={
                  selectedStream === stream ? "bg-primary text-primary-foreground" : "border-border hover:bg-muted"
                }
              >
                <Filter className="h-4 w-4 mr-2" />
                {stream}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-muted-foreground">
            Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""}
            {selectedStream !== "All" && ` in ${selectedStream}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No courses found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedStream("All")
                setFilteredCourses(coursesData)
              }}
              className="mt-4 border-border hover:bg-muted"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
