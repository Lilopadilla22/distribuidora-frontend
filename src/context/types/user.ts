export type UserRole = 'admin' | 'client'

export type User = {
  _id: string
  nombre: string
  apellido: string
  email: string
  direccion: string
  telefono: string
  fecha_cumpleanos: string
  cc: string
  nombre_negocio: string
  role: 'client' | 'admin'
}