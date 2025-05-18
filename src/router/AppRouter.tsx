import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '../context/useAuthStore'
import { AdminLayout } from '../layouts/AdminLayout'
import { AdminDashboard } from '../pages/AdminDashboard'
import { ClientLayout } from '../layouts/ClientLayout'

import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Home from '../pages/Home/Home'

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
    protectedRoutes = <Route path="*" element={<Navigate to="/login" replace />} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace />}
        />
        {protectedRoutes}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter

