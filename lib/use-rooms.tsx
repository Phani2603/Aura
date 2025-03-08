"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

interface Room {
  id: string
  name: string
}

interface RoomsContextType {
  rooms: Room[]
  addRoom: (room: Room) => void
  updateRoom: (id: string, room: Partial<Room>) => void
  deleteRoom: (id: string) => void
}

const RoomsContext = createContext<RoomsContextType | undefined>(undefined)

export function RoomsProvider({ children }: { children: React.ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>(() => {
    // Initialize with default rooms
    const defaultRooms = [
      { id: "living-room", name: "Living Room" },
      { id: "kitchen-room", name: "Kitchen Room" },
      { id: "bed-room", name: "Bed Room" },
      { id: "movie-room", name: "Movie Room" },
      { id: "game-room", name: "Game Room" },
    ]

    // Try to get rooms from localStorage
    if (typeof window !== "undefined") {
      const savedRooms = localStorage.getItem("rooms")
      return savedRooms ? JSON.parse(savedRooms) : defaultRooms
    }

    return defaultRooms
  })

  // Save rooms to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("rooms", JSON.stringify(rooms))
  }, [rooms])

  const addRoom = (room: Room) => {
    setRooms((prev) => [...prev, room])
  }

  const updateRoom = (id: string, updatedRoom: Partial<Room>) => {
    setRooms((prev) => prev.map((room) => (room.id === id ? { ...room, ...updatedRoom } : room)))
  }

  const deleteRoom = (id: string) => {
    setRooms((prev) => prev.filter((room) => room.id !== id))
  }

  return <RoomsContext.Provider value={{ rooms, addRoom, updateRoom, deleteRoom }}>{children}</RoomsContext.Provider>
}

export function useRooms() {
  const context = useContext(RoomsContext)
  if (context === undefined) {
    throw new Error("useRooms must be used within a RoomsProvider")
  }
  return context
}

