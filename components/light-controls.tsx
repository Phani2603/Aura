"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

interface Light {
  id: string
  name: string
  type: string
  isOn: boolean
  value: number
  roomId: string
}

interface LightControlsProps {
  lights: Light[]
  onToggle: (id: string) => void
  onValueChange: (id: string, value: number) => void
}

export function LightControls({ lights, onToggle, onValueChange }: LightControlsProps) {
  const handleSliderChange = (id: string, values: number[]) => {
    onValueChange(id, values[0])
  }

  return (
    <Card className="bg-app-card border-gray-800/50">
      <CardHeader>
        <CardTitle>Light</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {lights.length === 0 ? (
          <p className="text-center text-gray-500">No lights in this room</p>
        ) : (
          lights.map((light) => (
            <div key={light.id} className="space-y-2 p-2 rounded-lg hover:bg-gray-800/20 transition-all">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${light.isOn ? "bg-green-400" : "bg-gray-500"}`}></div>
                  {light.name}
                </h3>
                <Switch checked={light.isOn} onCheckedChange={() => onToggle(light.id)} />
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  disabled={!light.isOn}
                  value={[light.value]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(values) => handleSliderChange(light.id, values)}
                  className={`flex-1 ${light.isOn ? "" : "opacity-50"}`}
                />
                <span className="w-10 text-right text-sm">{light.value}%</span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

