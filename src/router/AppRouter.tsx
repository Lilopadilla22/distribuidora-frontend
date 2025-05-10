import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '../context/useAuthStore'
import { AdminLayout } from '../layouts/AdminLayout'
import { AdminDashboard } from '../pages/AdminDashboard'
import { ClientLayout } from '../layouts/ClientLayout'
import { Home } from '../pages/Home/Home'
import { Login } from '../pages/Login/Login'
import { Register } from '../pages/Login/Register'

const AppRouter = () => {
  const { user } = useAuthStore()

  let protectedRoutes

  if (user?.role === 'admin') {
    protectedRoutes = (
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
      </Route>
    )
  } else if (user) {
    protectedRoutes = (
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
      </Route>
    )
  } else {
    protectedRoutes = <Route path="*" element={<Navigate to="/login" />} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {protectedRoutes}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
