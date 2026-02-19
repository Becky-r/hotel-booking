"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface GuestUser {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  nationality: string
  memberSince: string
  avatar: string
  loyaltyTier: "Classic" | "Silver" | "Gold" | "Platinum"
  loyaltyPoints: number
  totalStays: number
  favoriteRooms: string[]
}

const mockUser: GuestUser = {
  id: "u1",
  firstName: "James",
  lastName: "Whitmore",
  email: "james@example.com",
  phone: "+44 20 7946 0958",
  nationality: "United Kingdom",
  memberSince: "2024-03-15",
  avatar: "JW",
  loyaltyTier: "Gold",
  loyaltyPoints: 12450,
  totalStays: 3,
  favoriteRooms: ["executive-suite", "deluxe-room"],
}

interface AuthContextType {
  user: GuestUser | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<boolean>
  logout: () => void
  toggleFavorite: (roomSlug: string) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<GuestUser | null>(null)

  const login = useCallback(async (_email: string, _password: string) => {
    // Simulate login with mock user
    await new Promise((r) => setTimeout(r, 800))
    setUser(mockUser)
    return true
  }, [])

  const register = useCallback(async (data: { firstName: string; lastName: string; email: string; password: string }) => {
    await new Promise((r) => setTimeout(r, 800))
    setUser({
      ...mockUser,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      loyaltyTier: "Classic",
      loyaltyPoints: 0,
      totalStays: 0,
      memberSince: new Date().toISOString().split("T")[0],
      avatar: `${data.firstName[0]}${data.lastName[0]}`,
      favoriteRooms: [],
    })
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const toggleFavorite = useCallback((roomSlug: string) => {
    setUser((prev) => {
      if (!prev) return prev
      const exists = prev.favoriteRooms.includes(roomSlug)
      return {
        ...prev,
        favoriteRooms: exists
          ? prev.favoriteRooms.filter((s) => s !== roomSlug)
          : [...prev.favoriteRooms, roomSlug],
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout, toggleFavorite }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}
