const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// API utility functions
class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  // Get auth token from localStorage
  getAuthToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken")
    }
    return null
  }

  // Set auth token in localStorage
  setAuthToken(token) {
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token)
    }
  }

  // Remove auth token
  removeAuthToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken")
      localStorage.removeItem("user")
    }
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const token = this.getAuthToken()

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      credentials: "include", // Include cookies for secure auth
      ...options,
    }

    if (config.body && typeof config.body === "object") {
      config.body = JSON.stringify(config.body)
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "API request failed")
      }

      return data
    } catch (error) {
      console.error("API Error:", error)
      throw error
    }
  }

  // Auth methods
  async login(email, password) {
    const data = await this.request("/auth/login", {
      method: "POST",
      body: { email, password },
    })

    if (data.success && data.token) {
      this.setAuthToken(data.token)
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data.user))
      }
    }

    return data
  }

  async signup(name, email, password) {
    const data = await this.request("/auth/signup", {
      method: "POST",
      body: { name, email, password },
    })

    if (data.success && data.token) {
      this.setAuthToken(data.token)
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data.user))
      }
    }

    return data
  }

  async getProfile() {
    return this.request("/auth/me")
  }

  async logout() {
    try {
      await this.request("/auth/logout", {
        method: "POST",
      })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      this.removeAuthToken()
      if (typeof window !== "undefined") {
        window.location.href = "/login"
      }
    }
  }

  isAuthenticated() {
    const token = this.getAuthToken()
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null
    return !!(token && user)
  }

  getCurrentUser() {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user")
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  }

  async submitQuiz(answers, quizType) {
    // This method is kept for backward compatibility but not used in new quiz
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          results: {
            careerPrediction: {
              recommendedStream: "Science Stream",
              description: "Based on your responses, you show strong analytical and problem-solving abilities.",
              careers: ["Doctor", "Engineer", "Researcher", "Scientist"],
              confidence: 85,
              alternativeStreams: [
                { stream: "Commerce Stream", confidence: 70 },
                { stream: "Vocational Stream", confidence: 60 },
              ],
            },
            scores: {
              percentages: {
                analytical: 85,
                creative: 65,
                social: 70,
              },
            },
          },
        })
      }, 1000) // Simulate API delay
    })
  }

  async getCareerRecommendation(featureVector) {
    try {
      const response = await fetch("https://ml-model-career-recommendation-system-1.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(featureVector),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.recommended_career
    } catch (error) {
      console.error("Error calling ML API:", error)
      // Fallback to local prediction if API fails
      return this.getFallbackCareerRecommendation(featureVector)
    }
  }

  getFallbackCareerRecommendation(scores) {
    const careers = [
      "Arts & Humanities",
      "Business",
      "Computer Science",
      "Engineering",
      "Law",
      "Medical",
      "Research",
      "Teaching",
    ]

    // Simple scoring logic as fallback
    if (scores.Tech_Inter >= 4 || scores.Math_Sco >= 80) return "Computer Science"
    if (scores.Science_Sc >= 80 || scores.Numerical >= 80) return "Medical"
    if (scores.Creative_I >= 4 || scores.English_Grm >= 80) return "Arts & Humanities"
    if (scores.Leadership >= 4 || scores.People_In >= 4) return "Business"
    if (scores.Logical >= 80 || scores.Analytical >= 4) return "Engineering"
    if (scores.Social_Sco >= 80) return "Law"
    if (scores.Openness >= 4) return "Research"

    return "Teaching" // Default
  }
}

// Create and export API client instance
const apiClient = new ApiClient()
export default apiClient

export const {
  login,
  signup,
  getProfile,
  logout,
  isAuthenticated,
  getCurrentUser,
  submitQuiz,
  getCareerRecommendation,
} = apiClient
