"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/login")
    }
  }, [router])

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/3 bg-app-card border-gray-800/50">
          <CardHeader className="flex flex-col items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" alt={user.name} />
              <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4">{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Button variant="outline" className="w-full" onClick={() => router.push("/settings")}>
              Edit Profile
            </Button>
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
              Logout
            </Button>
          </CardContent>
        </Card>

        <div className="w-full md:w-2/3">
          <Tabs defaultValue="activity">
            <TabsList className="bg-gray-900/30">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="devices">My Devices</TabsTrigger>
              <TabsTrigger value="automation">Automations</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="mt-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent interactions with smart devices.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-4 border-app-blue pl-4 py-2 hover:bg-gray-800/20 rounded-r-md transition-all">
                    <p className="font-medium">Living Room - Air Conditioner turned on</p>
                    <p className="text-sm text-gray-500">Today at 2:30 PM</p>
                  </div>
                  <div className="border-l-4 border-app-blue pl-4 py-2 hover:bg-gray-800/20 rounded-r-md transition-all">
                    <p className="font-medium">Kitchen - Lights brightness changed to 80%</p>
                    <p className="text-sm text-gray-500">Today at 1:15 PM</p>
                  </div>
                  <div className="border-l-4 border-app-blue pl-4 py-2 hover:bg-gray-800/20 rounded-r-md transition-all">
                    <p className="font-medium">Bedroom - Smart TV turned off</p>
                    <p className="text-sm text-gray-500">Yesterday at 11:45 PM</p>
                  </div>
                  <div className="border-l-4 border-app-blue pl-4 py-2 hover:bg-gray-800/20 rounded-r-md transition-all">
                    <p className="font-medium">Living Room - Speaker volume adjusted</p>
                    <p className="text-sm text-gray-500">Yesterday at 8:20 PM</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="devices" className="mt-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>My Devices</CardTitle>
                  <CardDescription>All devices connected to your account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50 transition-all">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Living Room</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span>Air Conditioner</span>
                            <span className="text-green-500">Online</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Smart TV</span>
                            <span className="text-green-500">Online</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Speaker</span>
                            <span className="text-green-500">Online</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50 transition-all">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Bedroom</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span>Smart Light</span>
                            <span className="text-green-500">Online</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Air Purifier</span>
                            <span className="text-red-500">Offline</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50 transition-all">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Kitchen</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span>Smart Fridge</span>
                            <span className="text-green-500">Online</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Coffee Maker</span>
                            <span className="text-green-500">Online</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="automation" className="mt-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>My Automations</CardTitle>
                  <CardDescription>Automated routines for your smart home.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Card className="bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50 transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">Morning Routine</CardTitle>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">Triggers at 7:00 AM on weekdays</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Turn on kitchen lights to 70%</li>
                        <li>• Start coffee maker</li>
                        <li>• Set living room temperature to 22°C</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50 transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">Night Mode</CardTitle>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">Triggers at 10:00 PM every day</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Dim living room lights to 20%</li>
                        <li>• Turn off kitchen devices</li>
                        <li>• Set bedroom temperature to 20°C</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50 transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">Away Mode</CardTitle>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">Triggers when everyone leaves home</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Turn off all lights</li>
                        <li>• Set temperature to eco mode</li>
                        <li>• Enable security cameras</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Button className="w-full bg-app-blue hover:bg-app-blue/90">Create New Automation</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

