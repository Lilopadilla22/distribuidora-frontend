import { useAuthStore } from '../context/useAuthStore'
import { useNavigate } from 'react-router-dom'

export const AdminLayout = () => {
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div>
      <header>
        <h2>Panel de administrador</h2>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </header>
    </div>
  )
}
