"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Menu, X, GraduationCap, User, LogOut } from "lucide-react"
import apiClient from "../utils/api"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    if (apiClient.isAuthenticated()) {
      const currentUser = apiClient.getCurrentUser()
      setUser(currentUser)
    }
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Quiz", href: "/quiz" },
    { name: "Courses", href: "/courses" },
    { name: "Colleges", href: "/colleges" },
    { name: "Scholarships", href: "/scholarships" },
    { name: "Counselling", href: "/counselling" },
    { name: "Timeline", href: "/timeline" },
    { name: "MOOCs", href: "/moocs" },
    { name: "Resume", href: "/resume-builder" },
  ]

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await apiClient.logout()
    } catch (error) {
      console.error("Logout error:", error)
      // Force logout even if API call fails
      apiClient.logout()
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 space-x-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl text-foreground">CareerGuide</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-primary"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  <User className="h-4 w-4 mr-2" />
                  {user.name}
                </Button>
                <Button
                  variant="outline"
                  className="border-border hover:bg-muted bg-transparent"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-primary"
                  onClick={() => (window.location.href = "/login")}
                >
                  Login
                </Button>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => (window.location.href = "/signup")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 px-3 pt-4">
                {user ? (
                  <>
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => (window.location.href = "/dashboard")}
                    >
                      <User className="h-4 w-4 mr-2" />
                      {user.name}
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start border-border bg-transparent"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="justify-start" onClick={() => (window.location.href = "/login")}>
                      Login
                    </Button>
                    <Button
                      className="justify-start bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => (window.location.href = "/signup")}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
