import { create } from 'zustand'
import type { User } from './types/user'
import { persist } from 'zustand/middleware'

type AuthState = {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const devUser: User = {
  _id: 'dev-123',
  nombre: 'Lilia',
  apellido: 'Dev',
  email: 'dev@example.com',
  role: 'client',
  direccion: '',
  telefono: '',
  fecha_cumpleanos: '',
  cc: '',
  nombre_negocio: 'DemoShop',
}

const USE_DEV_USER = false

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: USE_DEV_USER ? devUser : null,
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

