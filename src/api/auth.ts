import axios from 'axios'
import type { RegisterFormData } from '../pages/Register/types/register'

export const loginRequest = async (email: string, password: string) => {
  const response = await axios.post('http://localhost:3100/api/login', {
    email,
    password,
  })
  return response.data
}

export const registerRequest = async (data: RegisterFormData) => {
  const response = await axios.post('http://localhost:3100/api/register', data)
  return response.data
}