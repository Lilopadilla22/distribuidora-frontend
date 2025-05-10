import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import type { LoginFormData } from './types/login'
import { useAuthStore } from '../../context/useAuthStore'
import { loginRequest } from '../../api/auth'
import type { AxiosError } from 'axios'

const schema = yup.object({
  email: yup.string().email('Correo inválido').required('Campo requerido'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('Campo requerido'),
  showPassword: yup.boolean().required(),
})

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      showPassword: false,
    },
  })

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginRequest(email, password),
    onSuccess: (data) => {
      login(data.user)    
      navigate('/')        
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 401) {
        setError('Credenciales inválidas')
      } else {
        setError('Error del servidor')
      }
    },
  })

  const onSubmit = handleSubmit((data) => {
    setError(null)
    mutation.mutate({ email: data.email, password: data.password })
  })

  return {
    register,
    onSubmit,
    watch,
    errors,
    isLoading: mutation.isPending || isSubmitting,
    error,
  }
}
