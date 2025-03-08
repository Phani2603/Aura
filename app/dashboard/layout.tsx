"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { UserNav } from "@/components/user-nav"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus !== "true") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-app-dark text-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex h-16 items-center px-6 border-b border-gray-800/50">
          <h1 className="text-xl font-bold mr-6">Dashboard</h1>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search for devices..."
              className="pl-8 bg-gray-900/50 border-gray-800/50 focus-visible:ring-primary"
            />
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}

