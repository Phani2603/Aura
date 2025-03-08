"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

interface Device {
  id: string
  name: string
  type: string
  isOn: boolean
  value: number
  roomId: string
}

interface DevicesContextType {
  devices: Device[]
  addDevice: (device: Device) => void
  updateDevice: (id: string, device: Partial<Device>) => void
  deleteDevice: (id: string) => void
  toggleDevice: (id: string) => void
  updateDeviceValue: (id: string, value: number) => void
}

const DevicesContext = createContext<DevicesContextType | undefined>(undefined)

export function DevicesProvider({ children }: { children: React.ReactNode }) {
  const [devices, setDevices] = useState<Device[]>(() => {
    // Initialize with default devices
    const defaultDevices = [
      {
        id: "ac-1",
        name: "Air Conditioner",
        type: "air-conditioner",
        isOn: true,
        value: 24,
        roomId: "living-room",
      },
      {
        id: "tv-1",
        name: "Smart TV",
        type: "tv",
        isOn: false,
        value: 0,
        roomId: "living-room",
      },
      {
        id: "speaker-1",
        name: "Speaker",
        type: "speaker",
        isOn: false,
        value: 0,
        roomId: "living-room",
      },
      {
        id: "router-1",
        name: "Router",
        type: "router",
        isOn: true,
        value: 0,
        roomId: "living-room",
      },
      {
        id: "wifi-1",
        name: "WiFi",
        type: "wifi",
        isOn: true,
        value: 0,
        roomId: "living-room",
      },
      {
        id: "heater-1",
        name: "Heater",
        type: "heater",
        isOn: false,
        value: 0,
        roomId: "living-room",
      },
      {
        id: "socket-1",
        name: "Socket",
        type: "socket",
        isOn: true,
        value: 0,
        roomId: "living-room",
      },
      {
        id: "light-1",
        name: "Light 1",
        type: "light",
        isOn: true,
        value: 80,
        roomId: "living-room",
      },
      {
        id: "light-2",
        name: "Light 2",
        type: "light",
        isOn: true,
        value: 60,
        roomId: "living-room",
      },
      {
        id: "light-3",
        name: "Light 3",
        type: "light",
        isOn: false,
        value: 40,
        roomId: "living-room",
      },
      {
        id: "light-4",
        name: "Light 4",
        type: "light",
        isOn: true,
        value: 60,
        roomId: "living-room",
      },
      {
        id: "light-5",
        name: "Light 5",
        type: "light",
        isOn: true,
        value: 60,
        roomId: "living-room",
      },
    ]

    // Try to get devices from localStorage
    if (typeof window !== "undefined") {
      const savedDevices = localStorage.getItem("devices")
      return savedDevices ? JSON.parse(savedDevices) : defaultDevices
    }

    return defaultDevices
  })

  // Save devices to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("devices", JSON.stringify(devices))
  }, [devices])

  const addDevice = (device: Device) => {
    setDevices((prev) => [...prev, device])
  }

  const updateDevice = (id: string, updatedDevice: Partial<Device>) => {
    setDevices((prev) => prev.map((device) => (device.id === id ? { ...device, ...updatedDevice } : device)))
  }

  const deleteDevice = (id: string) => {
    setDevices((prev) => prev.filter((device) => device.id !== id))
  }

  const toggleDevice = (id: string) => {
    setDevices((prev) => prev.map((device) => (device.id === id ? { ...device, isOn: !device.isOn } : device)))
  }

  const updateDeviceValue = (id: string, value: number) => {
    setDevices((prev) => prev.map((device) => (device.id === id ? { ...device, value } : device)))
  }

  return (
    <DevicesContext.Provider
      value={{ devices, addDevice, updateDevice, deleteDevice, toggleDevice, updateDeviceValue }}
    >
      {children}
    </DevicesContext.Provider>
  )
}

export function useDevices() {
  const context = useContext(DevicesContext)
  if (context === undefined) {
    throw new Error("useDevices must be used within a DevicesProvider")
  }
  return context
}

