# Sistema de Rutas

Este directorio contiene la configuración centralizada del sistema de rutas de la aplicación.

## Estructura

```
src/routes/
├── index.tsx       # Componente de rutas principal (AppRoutes)
├── routes.ts       # Constantes de rutas y helpers
└── README.md       # Este archivo
```

## Archivos

### `index.tsx`
Contiene el componente `AppRoutes` que define todas las rutas de la aplicación usando React Router.

**Características:**
- Rutas públicas (sin layout): Login
- Rutas privadas (con MainLayout): Home, Crear Estudio, Resultados, etc.
- Ruta catch-all para páginas no encontradas

### `routes.ts`
Define constantes y helpers para las rutas.

**Exports:**
- `ROUTES`: Objeto con todas las rutas de la aplicación
- `PAGE_TITLES`: Títulos de las páginas
- `buildRoute`: Helpers para construir rutas dinámicas

## Uso

### En componentes

```tsx
import { ROUTES } from '@/routes/routes';
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
    const navigate = useNavigate();
    
    const goToCreateStudy = () => {
        navigate(ROUTES.CREATE_STUDY);
    };
    
    return <button onClick={goToCreateStudy}>Crear Estudio</button>;
};
```

### En Links

```tsx
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes';

<Link to={ROUTES.RESULTS}>Ver Resultados</Link>
```

### Rutas dinámicas

```tsx
import { buildRoute } from '@/routes/routes';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Navegar a los resultados de un estudio específico
navigate(buildRoute.studyResults('123'));

// Navegar a editar un estudio específico
navigate(buildRoute.editStudy('456'));
```

## Rutas Disponibles

| Ruta | Constante | Descripción |
|------|-----------|-------------|
| `/` | `ROUTES.HOME` | Página principal / Mis Encuestas |
| `/login` | `ROUTES.LOGIN` | Página de inicio de sesión |
| `/create` | `ROUTES.CREATE_STUDY` | Crear nuevo estudio |
| `/resultados` | `ROUTES.RESULTS` | Ver resultados |
| `/encuesta-example` | `ROUTES.ENCUESTA_EXAMPLE` | Ejemplo de componentes (desarrollo) |
| `*` | `ROUTES.NOT_FOUND` | Página no encontrada (404) |

## Agregar nuevas rutas

1. **Agregar la constante en `routes.ts`:**
```typescript
export const ROUTES = {
    // ... rutas existentes
    MY_NEW_ROUTE: '/my-new-route',
} as const;
```

2. **Agregar el título (opcional):**
```typescript
export const PAGE_TITLES = {
    // ... títulos existentes
    [ROUTES.MY_NEW_ROUTE]: 'Mi Nueva Página',
} as const;
```

3. **Agregar la ruta en `index.tsx`:**
```tsx
import { MyNewPage } from '../pages/MyNewPage';

// Dentro de AppRoutes
<Route path={ROUTES.MY_NEW_ROUTE} element={<MyNewPage />} />
```

## Ventajas de este enfoque

✅ **Centralización**: Todas las rutas en un solo lugar
✅ **Mantenibilidad**: Fácil de actualizar y mantener
✅ **Type-safe**: TypeScript detecta errores de tipeo
✅ **Reutilización**: Las constantes se pueden usar en toda la app
✅ **Consistencia**: Evita URLs hardcodeadas dispersas en el código
✅ **Refactoring**: Cambiar una ruta solo requiere actualizar la constante
