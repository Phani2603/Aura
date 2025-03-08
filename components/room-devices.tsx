"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tv, Speaker, Wifi, Thermometer, Power } from "lucide-react"

interface Device {
  id: string
  name: string
  type: string
  isOn: boolean
  value?: number
  unit?: string
  roomId: string
}

interface RoomDevicesProps {
  devices: Device[]
  onToggle: (id: string) => void
}

export function RoomDevices({ devices, onToggle }: RoomDevicesProps) {
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "tv":
        return <Tv className="h-6 w-6" />
      case "speaker":
        return <Speaker className="h-6 w-6" />
      case "router":
        return <Wifi className="h-6 w-6" />
      case "heater":
        return <Thermometer className="h-6 w-6" />
      default:
        return <Power className="h-6 w-6" />
    }
  }

  return (
    <Card className="bg-app-card border-gray-800/50">
      <CardHeader>
        <CardTitle>My Devices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {devices.map((device) => (
            <Card
              key={device.id}
              className="bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50 transition-all duration-300"
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center space-y-3">
                  <div className="flex justify-between items-center w-full">
                    <div className="device-icon-bg p-2 rounded-md">{getDeviceIcon(device.type)}</div>
                    <Switch checked={device.isOn} onCheckedChange={() => onToggle(device.id)} />
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium">{device.name}</h3>
                    <p className="text-xs text-gray-500">
                      {device.isOn ? (
                        <span className="text-green-400">Online</span>
                      ) : (
                        <span className="text-gray-500">Offline</span>
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

