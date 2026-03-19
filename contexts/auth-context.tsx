"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import * as api from "@/lib/api";

export interface GuestUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  memberSince: string;
  avatar: string;
  loyaltyTier: "Classic" | "Silver" | "Gold" | "Platinum";
  loyaltyPoints: number;
  totalStays: number;
  favoriteRooms: string[];
}

interface AuthContextType {
  user: GuestUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    password2: string;
  }) => Promise<boolean>;
  logout: () => void;
  toggleFavorite: (roomSlug: string) => void;
  loadingUser: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<GuestUser | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // On initial app load, try to fetch user if token exists
  useEffect(() => {
    async function fetchUser() {
      setLoadingUser(true);
      try {
        const fetchedUser = await api.getUser();
        setUser(fetchedUser);
        console.log("User fetched on app load:", fetchedUser);
      } catch {
        setUser(null); // user not logged in
      } finally {
        setLoadingUser(false);
      }
    }

    fetchUser();
  }, []);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    await api.login(email, password);
    const fetchedUser = await api.getUser();
    setUser(fetchedUser);
  }, []);

  // REGISTER
  const register = useCallback(
    async (data: {
      full_name: string;
      email: string;
      phone: string;
      password: string;
      password2: string;
    }) => {
      await api.register(data);
      const fetchedUser = await api.getUser();
      setUser(fetchedUser);
    },
    [],
  );

  // LOGOUT
  const logout = useCallback(async () => {
    await api.logout();
    setUser(null);
  }, []);

  // FAVORITES
  const toggleFavorite = useCallback((roomSlug: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      const exists = prev.favoriteRooms.includes(roomSlug);
      return {
        ...prev,
        favoriteRooms: exists
          ? prev.favoriteRooms.filter((s) => s !== roomSlug)
          : [...prev.favoriteRooms, roomSlug],
      };
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        register,
        logout,
        toggleFavorite,
        loadingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
