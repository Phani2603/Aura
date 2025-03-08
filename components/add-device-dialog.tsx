"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useDevices } from "@/lib/use-devices"

interface Room {
  id: string
  name: string
}

interface AddDeviceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  rooms: Room[]
}

export function AddDeviceDialog({ open, onOpenChange, rooms }: AddDeviceDialogProps) {
  const { toast } = useToast()
  const { addDevice } = useDevices()

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    roomId: "",
  })

  const deviceTypes = [
    { id: "air-conditioner", name: "Air Conditioner" },
    { id: "tv", name: "Smart TV" },
    { id: "speaker", name: "Speaker" },
    { id: "light", name: "Light" },
    { id: "router", name: "Router" },
    { id: "heater", name: "Heater" },
    { id: "socket", name: "Socket" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.type || !formData.roomId) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Add the device
    addDevice({
      id: crypto.randomUUID(),
      name: formData.name,
      type: formData.type,
      roomId: formData.roomId,
      isOn: false,
      value: formData.type === "air-conditioner" ? 24 : formData.type === "light" ? 80 : 0,
    })

    toast({
      title: "Device added",
      description: `${formData.name} has been added successfully.`,
    })

    // Reset form and close dialog
    setFormData({ name: "", type: "", roomId: "" })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-app-card border-gray-800/50">
        <DialogHeader>
          <DialogTitle>Add New Device</DialogTitle>
          <DialogDescription>Add a new smart device to your home.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Device Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-gray-800/50 border-gray-700/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Device Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                <SelectTrigger className="bg-gray-800/50 border-gray-700/50">
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent className="bg-app-card border-gray-700/50">
                  {deviceTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="room">Room</Label>
              <Select value={formData.roomId} onValueChange={(value) => handleSelectChange("roomId", value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {rooms.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-app-blue hover:bg-app-blue/90">
              Add Device
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

