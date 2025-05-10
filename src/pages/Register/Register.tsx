import './register.css'
import { useRegister } from './useRegister'

const Register = () => {
  const { register, onSubmit, errors, error, isLoading } = useRegister()


  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h1 className="register-title">Regístrate</h1>

        <form onSubmit={onSubmit}>
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" type="text" {...register('nombre')} />
          {errors.nombre && <p className="error-message">{errors.nombre.message}</p>}

          <label htmlFor="apellido">Apellido</label>
          <input id="apellido" type="text" {...register('apellido')} />
          {errors.apellido && <p className="error-message">{errors.apellido.message}</p>}

          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}

          <label htmlFor="password">Contraseña</label>
          <input id="password" type="password" {...register('password')} />
          {errors.password && <p className="error-message">{errors.password.message}</p>}

          <label htmlFor="direccion">Dirección</label>
          <input id="direccion" type="text" {...register('direccion')} />
          {errors.direccion && <p className="error-message">{errors.direccion.message}</p>}

          <label htmlFor="telefono">Teléfono</label>
          <input id="telefono" type="text" {...register('telefono')} />
          {errors.telefono && <p className="error-message">{errors.telefono.message}</p>}

          <label htmlFor="fecha_cumpleanos">Fecha de nacimiento</label>
          <input id="fecha_cumpleanos" type="date" {...register('fecha_cumpleanos')} />
          {errors.fecha_cumpleanos && <p className="error-message">{errors.fecha_cumpleanos.message}</p>}

          <label htmlFor="cc">Cédula</label>
          <input id="cc" type="text" {...register('cc')} />
          {errors.cc && <p className="error-message">{errors.cc.message}</p>}

          <label htmlFor="nombre_negocio">Nombre del negocio</label>
          <input id="nombre_negocio" type="text" {...register('nombre_negocio')} />
          {errors.nombre_negocio && <p className="error-message">{errors.nombre_negocio.message}</p>}

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </button>

          <div className="register-footer">
            ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register

