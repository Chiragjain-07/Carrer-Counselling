"use client"

import { useState, useEffect } from "react"
import {
  Search,
  SlidersHorizontal,
  Users,
  Clock,
  Star,
  ExternalLink,
  BookmarkPlus,
  LoaderCircle,
  AlertTriangle,
} from "lucide-react"
import Papa from "papaparse"

const CSV_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Online_Courses_500-RcFJNkHCct5iKU52mFlqCf3CSOI8kt.csv"

// Self-contained CourseCard component
const CourseCard = ({ course }) => {
  const getPlatformColor = (platform) => {
    const colors = {
      Coursera: "bg-blue-100 text-blue-800",
      edX: "bg-purple-100 text-purple-800",
      NPTEL: "bg-green-100 text-green-800",
      Udemy: "bg-orange-100 text-orange-800",
    }
    return colors[platform] || "bg-gray-100 text-gray-800"
  }
  const getDifficultyColor = (level) => {
    const colors = {
      Beginner: "bg-green-100 text-green-800",
      Intermediate: "bg-yellow-100 text-yellow-800",
      Advanced: "bg-red-100 text-red-800",
    }
    return colors[level] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="border border-border bg-card rounded-lg hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getPlatformColor(course.platform)}`}>
            {course.platform}
          </span>
          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getDifficultyColor(course.level)}`}>
            {course.level}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-card-foreground text-balance">{course.title}</h3>
        <p className="text-sm text-muted-foreground">by {course.instructor}</p>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center text-primary">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{course.duration}</span>
              </div>
              <div className="text-xs text-muted-foreground">Duration</div>
            </div>
            <div>
              <div className="flex items-center justify-center text-primary">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{course.enrolled}</span>
              </div>
              <div className="text-xs text-muted-foreground">Enrolled</div>
            </div>
            <div>
              <div className="flex items-center justify-center text-primary">
                <Star className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-pretty">{course.description}</p>
          <div>
            <h4 className="font-semibold text-card-foreground text-sm mb-2">Skills You'll Learn</h4>
            <div className="flex flex-wrap gap-1">
              {(course.skills || []).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800 border border-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              {course.price[0] === "?" ? (
                <span className="text-lg font-bold text-card-foreground">{"₹"+course.price.substring(1)}</span>
              ) : (
                <span className="text-lg font-bold text-card-foreground">{course.price}</span>
              )}
            </div>
            {course.certificate && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                Certificate
              </span>
            )}
          </div>
        </div>
        <div className="flex space-x-2 pt-4 mt-auto">
          <button className="flex-1 h-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">
            <ExternalLink className="h-4 w-4 mr-2" /> Enroll Now
          </button>
          <button className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-input bg-transparent hover:bg-accent">
            <BookmarkPlus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

const getCategory = (course) => {
  const s = (course.skills || []).map((x) => x.toLowerCase())
  const title = (course.title || "").toLowerCase()

  if (
    s.some(
      (x) =>
        x.includes("react") || x.includes("javascript") || x.includes("html") || x.includes("css") || x.includes("web"),
    )
  )
    return "Web Development"
  if (
    s.some(
      (x) =>
        x.includes("machine learning") ||
        x.includes("data") ||
        x.includes("tensorflow") ||
        x.includes("pandas") ||
        x.includes("sql"),
    )
  )
    return "Data Science"
  if (s.some((x) => x.includes("marketing"))) return "Marketing"
  if (s.some((x) => x.includes("finance") || x.includes("financial"))) return "Finance"

  if (title.includes("web")) return "Web Development"
  if (title.includes("data")) return "Data Science"
  if (title.includes("marketing")) return "Marketing"
  if (title.includes("finance")) return "Finance"

  return "Computer Science"
}

export default function MOOCDirectory() {
  const [allCourses, setAllCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("All Platforms")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [selectedPrice, setSelectedPrice] = useState("All Prices")
  const [showFilters, setShowFilters] = useState(false)

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(CSV_URL)

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

        const csvText = await response.text()
        const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true })
        const rows = Array.isArray(parsed.data) ? parsed.data : []

        const mapped = rows
          .map((row, idx) => {
            const skillsStr = row["Skills"] || ""
            const skills = skillsStr
              ? skillsStr
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              : []

            return {
              id: idx,
              platform: row["Platform"] || "Unknown",
              level: row["Level"] || "Beginner",
              title: row["Course Name"] || "Untitled Course",
              instructor: row["Instructor"] || "Unknown",
              duration: row["Duration"] || "",
              enrolled: row["Enrolled"] || "",
              rating: Number.parseFloat(row["Rating"]) || 0,
              description: "", // CSV has no description; leaving blank
              skills,
              price: row["Price"] || "Free",
              certificate: String(row["Certificate"] || "")
                .toLowerCase()
                .startsWith("y"),
            }
          })
          .sort((a, b) => b.rating - a.rating)

        setAllCourses(mapped)
      } catch (err) {
        console.error("Failed to fetch courses from CSV:", err)
        setError("Could not load courses from CSV. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchCourses()
  }, [])

  // --- FILTERING LOGIC ---
  useEffect(() => {
    let filtered = allCourses

    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (course.skills || []).some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }
    if (selectedPlatform !== "All Platforms") {
      filtered = filtered.filter((course) => course.platform === selectedPlatform)
    }
    if (selectedLevel !== "All Levels") {
      filtered = filtered.filter((course) => course.level === selectedLevel)
    }
    if (selectedPrice !== "All Prices") {
      filtered = filtered.filter((course) => {
        if (selectedPrice === "Free") return course.price === "Free"
        if (selectedPrice === "Paid") return course.price !== "Free"
        return true
      })
    }
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((course) => getCategory(course) === selectedCategory)
    }

    setFilteredCourses(filtered)
  }, [searchTerm, selectedPlatform, selectedLevel, selectedPrice, selectedCategory, allCourses])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedPlatform("All Platforms")
    setSelectedCategory("All Categories")
    setSelectedLevel("All Levels")
    setSelectedPrice("All Prices")
  }

  const platforms = ["All Platforms", "Coursera", "edX", "NPTEL", "Udemy"]
  const categories = ["All Categories", "Computer Science", "Data Science", "Marketing", "Finance", "Web Development"]
  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"]
  const prices = ["All Prices", "Free", "Paid"]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Online Courses & MOOCs</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Discover high-quality online courses from top universities and platforms to advance your career.
          </p>
        </div>

        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              placeholder="Search courses, instructors, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 h-12 text-lg bg-input border border-border rounded-md"
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-transparent hover:bg-accent"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {showFilters && (
            <div className="grid gap-4 md:grid-cols-4 max-w-4xl mx-auto">
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="h-10 rounded-md border border-input bg-input px-3 text-sm"
              >
                {platforms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-10 rounded-md border border-input bg-input px-3 text-sm"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="h-10 rounded-md border border-input bg-input px-3 text-sm"
              >
                {levels.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="h-10 rounded-md border border-input bg-input px-3 text-sm"
              >
                {prices.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="mb-6 flex justify-between items-center">
          <p className="text-muted-foreground">Showing {filteredCourses.length} courses</p>
          {(searchTerm ||
            selectedPlatform !== "All Platforms" ||
            selectedCategory !== "All Categories" ||
            selectedLevel !== "All Levels" ||
            selectedPrice !== "All Prices") && (
            <button
              onClick={clearFilters}
              className="h-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-transparent hover:bg-accent"
            >
              Clear Filters
            </button>
          )}
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
          </div>
        )}
        {error && (
          <div className="text-center py-20 text-red-500">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">No courses found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
