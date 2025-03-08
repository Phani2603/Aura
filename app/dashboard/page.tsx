"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { DeviceCard } from "@/components/device-card"
import { RoomDevices } from "@/components/room-devices"
import { DeviceUsage } from "@/components/device-usage"
import { LightControls } from "@/components/light-controls"
import { AddDeviceDialog } from "@/components/add-device-dialog"
import { AddRoomDialog } from "@/components/add-room-dialog"
import { useRooms } from "@/lib/use-rooms"
import { useDevices } from "@/lib/use-devices"

export default function Dashboard() {
  const [selectedRoom, setSelectedRoom] = useState("living-room")
  const [showAddDevice, setShowAddDevice] = useState(false)
  const [showAddRoom, setShowAddRoom] = useState(false)

  const { rooms } = useRooms()
  const { devices, toggleDevice, updateDeviceValue } = useDevices()

  const roomDevices = devices.filter((device) => device.roomId === selectedRoom)
  const acDevice = roomDevices.find((device) => device.type === "air-conditioner")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs defaultValue={selectedRoom} onValueChange={setSelectedRoom} className="w-full overflow-auto">
          <TabsList className="bg-gray-900/30 p-1 rounded-xl">
            {rooms.map((room) => (
              <TabsTrigger
                key={room.id}
                value={room.id}
                className="data-[state=active]:bg-app-blue data-[state=active]:text-primary-foreground rounded-lg"
              >
                {room.name}
              </TabsTrigger>
            ))}
            <TabsTrigger value="add-room" onClick={() => setShowAddRoom(true)} className="rounded-lg">
              <PlusIcon className="h-4 w-4 mr-1" /> Add
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button size="sm" onClick={() => setShowAddDevice(true)} className="bg-app-blue hover:bg-app-blue/90">
          <PlusIcon className="h-4 w-4 mr-1" /> Add Device
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {acDevice && (
          <div className="lg:col-span-1 space-y-6">
            <DeviceCard
              device={acDevice}
              onToggle={() => toggleDevice(acDevice.id)}
              onValueChange={(value) => updateDeviceValue(acDevice.id, value)}
            />
          </div>
        )}

        <div className="lg:col-span-2 space-y-6">
          <DeviceUsage />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RoomDevices devices={roomDevices.filter((d) => d.type !== "air-conditioner")} onToggle={toggleDevice} />
        </div>

        <div className="lg:col-span-1">
          <LightControls
            lights={devices.filter((d) => d.type === "light" && d.roomId === selectedRoom)}
            onToggle={toggleDevice}
            onValueChange={updateDeviceValue}
          />
        </div>
      </div>

      <AddDeviceDialog open={showAddDevice} onOpenChange={setShowAddDevice} rooms={rooms} />

      <AddRoomDialog open={showAddRoom} onOpenChange={setShowAddRoom} />
    </div>
  )
}

