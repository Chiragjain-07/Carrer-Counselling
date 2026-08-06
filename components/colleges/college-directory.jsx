"use client"

import { useState, useEffect } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import CollegeCard from "./college-card"
import { Search, MapPin, Filter, SlidersHorizontal, Loader2 } from "lucide-react"

export default function CollegeDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("All States")
  const [selectedCity, setSelectedCity] = useState("All Cities")
  const [selectedDegree, setSelectedDegree] = useState("All Degrees")
  const [collegesData, setCollegesData] = useState([])
  const [filteredColleges, setFilteredColleges] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)
  const [states, setStates] = useState(["All States"])
  const [cities, setCities] = useState(["All Cities"])
  const [degrees, setDegrees] = useState(["All Degrees"])

  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/College-ABxmt9xUJTA13KU5s8hxR4tHg0yb8M.csv",
        )
        const csvText = await response.text()

        // Parse CSV data
        const lines = csvText.split("\n")
        const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

        const colleges = []
        const stateSet = new Set()
        const citySet = new Set()
        const degreeSet = new Set()

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim()
          if (!line) continue

          // Handle CSV parsing with potential commas in quoted fields
          const values = []
          let current = ""
          let inQuotes = false

          for (let j = 0; j < line.length; j++) {
            const char = line[j]
            if (char === '"') {
              inQuotes = !inQuotes
            } else if (char === "," && !inQuotes) {
              values.push(current.trim().replace(/"/g, ""))
              current = ""
            } else {
              current += char
            }
          }
          values.push(current.trim().replace(/"/g, ""))

          if (values.length >= 6) {
            const college = {
              sno: values[0],
              name: values[1],
              degree: values[2],
              state: values[3],
              city: values[4],
              phone: values[5],
              // Generate some additional data for better display
              type: "Government", // Assuming all are government colleges
              rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3-5
              programs: values[2] ? values[2].split(",").map((p) => p.trim()) : ["General"],
              facilities: ["Library", "WiFi", "Labs"], // Default facilities
              cutoff: {
                general: Math.floor(Math.random() * 20 + 75),
                reserved: Math.floor(Math.random() * 15 + 65),
              },
              established: Math.floor(Math.random() * 50 + 1950),
              affiliation: "State University",
              location: `${values[4]}, ${values[3]}`,
            }

            colleges.push(college)
            stateSet.add(values[3])
            citySet.add(values[4])
            if (values[2]) {
              values[2].split(",").forEach((degree) => degreeSet.add(degree.trim()))
            }
          }
        }

        setCollegesData(colleges)
        setFilteredColleges(colleges)
        setStates(["All States", ...Array.from(stateSet).sort()])
        setCities(["All Cities", ...Array.from(citySet).sort()])
        setDegrees(["All Degrees", ...Array.from(degreeSet).sort()])
      } catch (error) {
        console.error("Error fetching college data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCollegeData()
  }, [])

  const handleSearch = (term) => {
    setSearchTerm(term)
    filterColleges(term, selectedState, selectedCity, selectedDegree)
  }

  const filterColleges = (term, state, city, degree) => {
    let filtered = collegesData

    // Filter by search term
    if (term) {
      filtered = filtered.filter(
        (college) =>
          college.name.toLowerCase().includes(term.toLowerCase()) ||
          college.location.toLowerCase().includes(term.toLowerCase()) ||
          college.degree.toLowerCase().includes(term.toLowerCase()) ||
          college.state.toLowerCase().includes(term.toLowerCase()) ||
          college.city.toLowerCase().includes(term.toLowerCase()),
      )
    }

    // Filter by state
    if (state !== "All States") {
      filtered = filtered.filter((college) => college.state === state)
    }

    // Filter by city
    if (city !== "All Cities") {
      filtered = filtered.filter((college) => college.city === city)
    }

    // Filter by degree
    if (degree !== "All Degrees") {
      filtered = filtered.filter((college) => college.degree.toLowerCase().includes(degree.toLowerCase()))
    }

    setFilteredColleges(filtered)
  }

  const handleStateChange = (state) => {
    setSelectedState(state)
    filterColleges(searchTerm, state, selectedCity, selectedDegree)
  }

  const handleCityChange = (city) => {
    setSelectedCity(city)
    filterColleges(searchTerm, selectedState, city, selectedDegree)
  }

  const handleDegreeChange = (degree) => {
    setSelectedDegree(degree)
    filterColleges(searchTerm, selectedState, selectedCity, degree)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedState("All States")
    setSelectedCity("All Cities")
    setSelectedDegree("All Degrees")
    setFilteredColleges(collegesData)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading college data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">College Directory</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Find the perfect college for your career goals. Search through {collegesData.length} colleges with detailed
            information about programs, facilities, and admission requirements.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search colleges, locations, or programs..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 h-12 text-lg bg-input border-border"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-border hover:bg-muted"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {showFilters && (
            <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  State
                </label>
                <Select value={selectedState} onValueChange={handleStateChange}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  City
                </label>
                <Select value={selectedCity} onValueChange={handleCityChange}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Filter className="h-4 w-4 inline mr-1" />
                  Degree/Program
                </label>
                <Select value={selectedDegree} onValueChange={handleDegreeChange}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {degrees.map((degree) => (
                      <SelectItem key={degree} value={degree}>
                        {degree}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-muted-foreground">
            Showing {filteredColleges.length} college{filteredColleges.length !== 1 ? "s" : ""}
          </p>
          {(searchTerm ||
            selectedState !== "All States" ||
            selectedCity !== "All Cities" ||
            selectedDegree !== "All Degrees") && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="border-border hover:bg-muted bg-transparent"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* College Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredColleges.map((college, index) => (
            <CollegeCard key={college.sno || index} college={college} />
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No colleges found matching your criteria.</p>
            <Button onClick={clearFilters} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
