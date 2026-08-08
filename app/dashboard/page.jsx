"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "../../components/navigation"
import UserDashboard from "../../components/dashboard/user-dashboard"
import apiClient from "../../utils/api"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!apiClient.isAuthenticated()) {
          router.push("/login")
          return
        }

        const currentUser = apiClient.getCurrentUser()
        if (currentUser) {
          setUser(currentUser)
        } else {
          // Try to get fresh user data from API
          const response = await apiClient.getProfile()
          if (response.success) {
            setUser(response.user)
          } else {
            router.push("/login")
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <UserDashboard user={user} />
    </div>
  )
}
