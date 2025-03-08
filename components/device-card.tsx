"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Fan, Power, Snowflake, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DeviceCardProps {
  device: {
    id: string
    name: string
    type: string
    isOn: boolean
    value: number
    unit?: string
  }
  onToggle: () => void
  onValueChange: (value: number) => void
}

export function DeviceCard({ device, onToggle, onValueChange }: DeviceCardProps) {
  const [tempMode, setTempMode] = useState<"cool" | "heat">("cool")

  const renderDeviceIcon = () => {
    switch (device.type) {
      case "air-conditioner":
        return tempMode === "cool" ? <Snowflake className="h-5 w-5" /> : <Flame className="h-5 w-5" />
      default:
        return <Power className="h-5 w-5" />
    }
  }

  const handleSliderChange = (value: number[]) => {
    onValueChange(value[0])
  }

  return (
    <Card className="bg-app-card border-gray-800/50 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-gray-800/30">
        <CardTitle className="text-base font-medium">{device.name}</CardTitle>
        <Switch checked={device.isOn} onCheckedChange={onToggle} />
      </CardHeader>
      <CardContent>
        {device.type === "air-conditioner" && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="text-center relative">
                <span className="text-6xl font-bold text-app-blue">{device.value}°</span>
                <p className="text-xs text-gray-500 mt-1">Current Temperature</p>
                <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-app-blue/10 rounded-full blur-xl"></div>
              </div>
            </div>

            <Slider
              disabled={!device.isOn}
              value={[device.value]}
              min={16}
              max={30}
              step={1}
              onValueChange={handleSliderChange}
              className="mt-6"
            />

            <div className="flex justify-between text-xs text-gray-500 px-1">
              <span>16°C</span>
              <span>30°C</span>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              <Button
                size="sm"
                variant={tempMode === "cool" ? "default" : "outline"}
                className={`flex items-center gap-1 ${tempMode === "cool" ? "bg-app-blue hover:bg-app-blue/90" : ""}`}
                onClick={() => setTempMode("cool")}
                disabled={!device.isOn}
              >
                <Snowflake className="h-4 w-4" />
                Cool
              </Button>
              <Button
                size="sm"
                variant={tempMode === "heat" ? "default" : "outline"}
                className="flex items-center gap-1"
                onClick={() => setTempMode("heat")}
                disabled={!device.isOn}
              >
                <Flame className="h-4 w-4" />
                Heat
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1" disabled={!device.isOn}>
                <Fan className="h-4 w-4" />
                Fan
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

