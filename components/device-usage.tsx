"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DeviceUsage() {
  return (
    <Card className="bg-app-card border-gray-800/50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Usage Status</CardTitle>
            <CardDescription>Total energy consumption</CardDescription>
          </div>
          <Tabs defaultValue="today">
            <TabsList className="bg-gray-800/50">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-2">
          <div>
            <div className="text-sm text-gray-500">Total usage</div>
            <div className="text-xl font-bold">35.02kWh</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Total hours</div>
            <div className="text-xl font-bold">32h</div>
          </div>
        </div>

        <div className="h-[180px] mt-4">
          <div className="flex h-full items-end gap-2">
            {Array.from({ length: 12 }).map((_, i) => {
              // Generate random heights for the bars
              const height = Math.floor(Math.random() * 70) + 10
              // Make one bar (the current hour) taller
              const isHighlighted = i === 5

              return (
                <div
                  key={i}
                  className={`w-full rounded-t-md ${isHighlighted ? "bg-app-blue" : "bg-gray-800/50"} transition-all duration-300 hover:opacity-80`}
                  style={{ height: `${isHighlighted ? 100 : height}%` }}
                />
              )
            })}
          </div>

          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <div>8:00</div>
            <div>10:00</div>
            <div>12:00</div>
            <div>14:00</div>
            <div>16:00</div>
            <div>18:00</div>
            <div>20:00</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

