import { create } from 'zustand'
import type { User } from './types/user'
import { persist } from 'zustand/middleware'

type AuthState = {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => {
        set({ user: null })
        localStorage.removeItem('auth-storage') 
      },
    }),
    {
      name: 'auth-storage', 
    }
  )
)
