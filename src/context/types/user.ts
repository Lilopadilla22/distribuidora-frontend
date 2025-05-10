export type UserRole = 'admin' | 'client'

export type User = {
  id: string
  name: string
  role: UserRole
}
