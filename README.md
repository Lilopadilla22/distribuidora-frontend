# 🥩 Distrishulk Frontend

Una aplicación web moderna para distribuidora de pollos que permite a los clientes navegar productos, realizar pedidos y gestionar su cuenta, mientras proporciona herramientas administrativas para supervisar el negocio.

![Distrishulk](https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=1200&h=300&fit=crop)

## 🎯 Propósito del Proyecto

**Distrishulk** es una plataforma digital que moderniza la experiencia de compra en distribuidoras de carnes, ofreciendo:

- **Para Clientes**: Catálogo digital, pedidos en línea, gestión de cuenta
- **Para Administradores**: Panel de control y gestión del negocio
- **Para el Negocio**: Digitalización de procesos y mejor experiencia de usuario

## 🛠️ Stack Tecnológico

### Frontend Core
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Bundler y servidor de desarrollo rápido
- **React Router DOM** - Navegación del lado del cliente

### Estilos y UI
- **Tailwind CSS** - Framework de utilidades CSS
- **Lucide React** - Biblioteca de iconos moderna
- **CSS Custom Properties** - Variables CSS personalizadas

### Gestión de Estado
- **Zustand** - Gestión de estado global ligera
- **Persist Middleware** - Persistencia automática del estado

### HTTP y APIs
- **Axios** - Cliente HTTP con interceptores
- **REST APIs** - Comunicación con backend

### Herramientas de Desarrollo
- **ESLint** - Linting con reglas TypeScript
- **PostCSS** - Procesamiento de CSS
- **Autoprefixer** - Prefijos CSS automáticos

## 🏗️ Arquitectura del Proyecto

```
src/
├── 📁 components/          # Componentes reutilizables
│   ├── common/            # Header, HeroSection, CategoryGrid
│   └── products/          # ProductCard, ProductGrid
├── 📁 screens/            # Páginas principales de la aplicación
│   ├── Auth/             # Login, Register
│   ├── Home/             # Página principal
│   ├── Products/         # Lista y detalle de productos
│   ├── Orders/           # Gestión de pedidos
│   ├── Profile/          # Perfil de usuario
│   └── Admin/            # Panel administrativo
├── 📁 layouts/            # Layouts base
│   ├── ClientLayout.tsx  # Layout para clientes
│   └── AdminLayout.tsx   # Layout para administradores
├── 📁 context/            # Estado global con Zustand
│   ├── useAuthStore.ts   # Autenticación y usuario
│   └── useOrderStore.ts  # Carrito de compras
├── 📁 services/           # Comunicación con APIs
│   └── api.ts            # Servicios HTTP centralizados
├── 📁 routes/             # Configuración de rutas
│   └── AppRouter.tsx     # Router principal
├── 📁 types/              # Definiciones TypeScript
│   └── index.ts          # Interfaces y tipos
├── 📁 utils/              # Utilidades y helpers
│   ├── constants.ts      # Constantes de la aplicación
│   └── formatters.ts     # Funciones de formateo
└── 📁 assets/             # Recursos estáticos
```

## 🎨 Sistema de Diseño

### Paleta de Colores
```css
:root {
  --color-tomato: #FF6F61;    /* Rojo principal */
  --color-orange: #FFA726;    /* Naranja principal */
  --color-yellow: #FFD54F;    /* Amarillo de acento */
  --color-brown: #A1887F;     /* Marrón para textos */
  --color-leaf: #388E3C;      /* Verde para precios */
  --color-bg: #FFF8F3;        /* Fondo cálido */
}
```

### Principios de Diseño
- **🎯 Consistencia Visual**: Bordes inferiores naranjas en tarjetas
- **✨ Micro-interacciones**: Hover states y transiciones suaves
- **📱 Responsive Design**: Mobile-first con breakpoints adaptativos
- **📏 Espaciado Sistemático**: Basado en múltiplos de 8px
- **🔤 Tipografía**: Poppins, Montserrat, Roboto como fallback

## 🔐 Sistema de Autenticación

### Roles de Usuario
- **👤 Cliente**: Navegar productos, realizar pedidos, gestionar perfil
- **👨‍💼 Administrador**: Panel de control y gestión completa

### Características
- **🔑 JWT Tokens** almacenados en localStorage
- **💾 Persistencia automática** del estado de autenticación
- **🛡️ Rutas protegidas** basadas en roles de usuario
- **🔄 Interceptores HTTP** para manejo automático de tokens

## 🛒 Funcionalidades Principales

### Para Clientes
- **📋 Catálogo de Productos**
  - Navegación por categorías (Pollo, Cerdo, Carnes Frías)
  - Filtros y búsqueda
  - Detalles completos de productos
  
- **🛒 Sistema de Pedidos**
  - Carrito de compras intuitivo
  - Selección de unidades (kilo/unidad)
  - Límite de tiempo para cancelación (1 hora)
  - Estados de pedido en tiempo real
  
- **👤 Gestión de Perfil**
  - Información personal y de negocio
  - Historial completo de pedidos
  - Configuración de cuenta

### Para Administradores
- **📊 Dashboard** (en desarrollo)
- **📦 Gestión de Productos** (planificado)
- **📋 Gestión de Pedidos** (planificado)
- **👥 Gestión de Usuarios** (planificado)

## 🔄 Integración con Backend

### APIs Consumidas
```typescript
// Autenticación
POST /api/login
POST /api/register

// Productos
GET /api/productos
GET /api/productos/:id
GET /api/productos/categoria/:id

// Pedidos
POST /api/pedidos
GET /api/pedidos
PUT /api/pedidos/:id (cancelar)
PUT /api/pedidos/:id/editar

// Usuario
GET /api/profile

// Categorías
GET /api/categorias
```

### Manejo de Estados
- **⏳ Loading States** para todas las operaciones asíncronas
- **❌ Error Handling** con mensajes descriptivos
- **✅ Success Feedback** para confirmación de acciones
- **🔄 Optimistic Updates** donde es apropiado

## 📱 Experiencia de Usuario

### Navegación
- **📌 Header Sticky** con navegación principal
- **🍞 Breadcrumbs** y botones de retorno claros
- **📱 Menú Móvil** completamente responsive

### Interacciones
- **👆 Feedback Visual** en todas las acciones del usuario
- **⚠️ Confirmaciones** para acciones destructivas
- **⏳ Estados de Carga** informativos y elegantes
- **🎯 Micro-animaciones** para mejor UX

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Backend de Distrishulk ejecutándose en `http://localhost:3100`

### Instalación
```bash
# Clonar el repositorio
git clone [repository-url]
cd Project

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Linting con ESLint
```

### Variables de Entorno
```env
VITE_API_BASE_URL=http://localhost:3100/api
```

## 🧪 Estructura de Tipos TypeScript

```typescript
// Principales interfaces
interface User {
  _id: string;
  nombre: string;
  email: string;
  role: 'admin' | 'client';
  // ... más campos
}

interface Product {
  _id: string;
  nombre: string;
  categoria: Category;
  precio_por_kilo: number;
  precio_por_unidad: number;
  // ... más campos
}

interface Order {
  _id: string;
  usuario: string;
  productos: OrderProductResponse[];
  total: number;
  estado: 'pendiente' | 'cancelado' | 'entregado' | 'en camino';
  hora_limite: string;
  // ... más campos
}
```

## 🎯 Estado del Proyecto

### ✅ Completado
- [x] Sistema de autenticación completo
- [x] Catálogo de productos con filtros
- [x] Sistema de pedidos funcional
- [x] Gestión de perfil de usuario
- [x] Carrito de compras
- [x] Responsive design
- [x] Integración completa con APIs

### 🚧 En Desarrollo
- [ ] Panel administrativo completo
- [ ] Gestión avanzada de productos
- [ ] Sistema de notificaciones
- [ ] Reportes y estadísticas

### 🔮 Planificado
- [ ] PWA (Progressive Web App)
- [ ] Notificaciones push
- [ ] Sistema de favoritos
- [ ] Chat de soporte
- [ ] Integración con pagos

## 🤝 Contribución

### Estándares de Código
- **TypeScript estricto** en toda la aplicación
- **Componentes funcionales** con hooks
- **Props tipadas** obligatorias
- **Naming conventions** consistentes
- **Comentarios JSDoc** para funciones complejas

### Flujo de Trabajo
1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit con mensajes descriptivos
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request


## 👥 Equipo

- **Frontend Developer**: Lilia Padilla Arends
- **Backend Developer**: Lilia Padilla Arends

## 📞 Contacto

- **Email**: lilopadilla22@yopmail.com
- **LinkedIn**: [[Lilia Padilla Arends](https://www.linkedin.com/in/liliapadilla/)]
- **GitHub**: [LiloPadilla22]

---

<div align="center">
  <p>Hecho con ❤️ para modernizar la industria de distribución de pollo</p>
  <p><strong>Distrishulk</strong> - Conectando calidad con tecnología</p>
</div>