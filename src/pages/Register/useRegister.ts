import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../context/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { AxiosError } from 'axios'
import type { RegisterFormData } from './types/register'
import { registerRequest } from '../../api/auth'

const schema = yup.object({
  nombre: yup.string().required('Nombre requerido'),
  apellido: yup.string().required('Apellido requerido'),
  email: yup.string().email('Correo inválido').required('Correo requerido'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('Contraseña requerida'),
  direccion: yup.string().required('Dirección requerida'),
  telefono: yup.string().required('Teléfono requerido'),
  fecha_cumpleanos: yup.string().required('Fecha requerida'),
  cc: yup.string().required('Cédula requerida'),
  nombre_negocio: yup.string().required('Nombre del negocio requerido'),
})

export const useRegister = () => {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: (data: RegisterFormData) => registerRequest(data),
    onSuccess: (data) => {
      login(data.user)     
      navigate('/')        
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 400) {
        setError('El correo ya está registrado')
      } else {
        setError('Error del servidor')
      }
    },
  })

  const onSubmit = handleSubmit((data) => {
    setError(null)
    mutation.mutate(data)
  })

  return {
    register,
    onSubmit,
    errors,
    isLoading: mutation.isPending || isSubmitting,
    error,
  }
}
