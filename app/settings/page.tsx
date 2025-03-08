"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user")
      return savedUser ? JSON.parse(savedUser) : { name: "Logan", email: "logan@example.com" }
    }
    return { name: "Logan", email: "logan@example.com" }
  })

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // Update user in localStorage
    const updatedUser = { ...user, name: formData.name, email: formData.email }
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setUser(updatedUser)

    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirm password must match.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would send this to your backend
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    })

    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }))
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-gray-900/30">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card className="bg-app-card border-gray-800/50">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account profile information and email address.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-700/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-700/50"
                  />
                </div>
                <Button type="submit" className="bg-app-blue hover:bg-app-blue/90">
                  Save changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card className="bg-app-card border-gray-800/50">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-700/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-700/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-700/50"
                  />
                </div>
                <Button type="submit" className="bg-app-blue hover:bg-app-blue/90">
                  Update password
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card className="bg-app-card border-gray-800/50">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive push notifications on your devices.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-gray-800/30" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive email notifications about your devices.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-gray-800/30" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Device Alerts</p>
                  <p className="text-sm text-gray-500">Get alerts when devices go offline or have issues.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast({ title: "Settings saved" })} className="bg-app-blue hover:bg-app-blue/90">
                Save notification settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="mt-6">
          <Card className="bg-app-card border-gray-800/50">
            <CardHeader>
              <CardTitle>Connected Devices</CardTitle>
              <CardDescription>Manage devices that are connected to your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">iPhone 13 Pro</p>
                  <p className="text-sm text-gray-500">Last active: Today at 2:30 PM</p>
                </div>
                <Button variant="outline" size="sm" className="bg-app-blue hover:bg-app-blue/90">
                  Disconnect
                </Button>
              </div>
              <Separator className="bg-gray-800/30" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">MacBook Pro</p>
                  <p className="text-sm text-gray-500">Last active: Yesterday at 10:15 AM</p>
                </div>
                <Button variant="outline" size="sm" className="bg-app-blue hover:bg-app-blue/90">
                  Disconnect
                </Button>
              </div>
              <Separator className="bg-gray-800/30" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">iPad Air</p>
                  <p className="text-sm text-gray-500">Last active: 3 days ago</p>
                </div>
                <Button variant="outline" size="sm" className="bg-app-blue hover:bg-app-blue/90">
                  Disconnect
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

