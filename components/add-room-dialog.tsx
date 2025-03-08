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
import { useToast } from "@/components/ui/use-toast"
import { useRooms } from "@/lib/use-rooms"

interface AddRoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddRoomDialog({ open, onOpenChange }: AddRoomDialogProps) {
  const { toast } = useToast()
  const { addRoom } = useRooms()
  const [roomName, setRoomName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!roomName.trim()) {
      toast({
        title: "Room name required",
        description: "Please enter a name for the room.",
        variant: "destructive",
      })
      return
    }

    // Add the room
    const roomId = roomName.toLowerCase().replace(/\s+/g, "-")
    addRoom({
      id: roomId,
      name: roomName,
    })

    toast({
      title: "Room added",
      description: `${roomName} has been added successfully.`,
    })

    // Reset form and close dialog
    setRoomName("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-app-card border-gray-800/50">
        <DialogHeader>
          <DialogTitle>Add New Room</DialogTitle>
          <DialogDescription>Add a new room to your smart home.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="roomName">Room Name</Label>
              <Input
                id="roomName"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="e.g. Living Room, Kitchen, Bedroom"
                className="bg-gray-800/50 border-gray-700/50"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-app-blue hover:bg-app-blue/90">
              Add Room
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

