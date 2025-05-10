import './login.css'
import { useLogin } from './useLogin'

const Login = () => {
  const { register, errors, watch, onSubmit, error, isLoading } = useLogin()
  const showPassword = watch('showPassword')

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1 className="login-title">Bienvenido a Distrishulk</h1>

        <form onSubmit={onSubmit}>
          <label htmlFor="email" className="login-label">Correo electrónico</label>
          <input id="email" type="email" className="login-input" {...register('email')} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}

          <label htmlFor="password" className="login-label">Contraseña</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            className="login-input"
            {...register('password')}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}

          <div className="login-checkbox">
            <input type="checkbox" id="showPassword" {...register('showPassword')} />
            <label htmlFor="showPassword">Mostrar contraseña</label>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Iniciar sesión'}
          </button>

          <div className="login-footer">
            ¿No tienes cuenta? <a href="/register">Regístrate</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
