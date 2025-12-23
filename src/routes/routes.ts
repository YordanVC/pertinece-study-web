/**
 * Constantes de rutas de la aplicación
 * Centraliza todas las rutas para facilitar el mantenimiento y evitar errores de tipeo
 */

export const ROUTES = {
    // Rutas públicas
    LOGIN: '/login',

    // Rutas privadas (con layout)
    HOME: '/',
    CREATE_STUDY: '/create',
    RESULTS: '/resultados',

    // Rutas de desarrollo/ejemplo
    ENCUESTA_EXAMPLE: '/encuesta-example',

    // Rutas especiales
    NOT_FOUND: '*',
} as const;

/**
 * Títulos de las páginas para usar en navegación, breadcrumbs, etc.
 */
export const PAGE_TITLES = {
    [ROUTES.LOGIN]: 'Iniciar Sesión',
    [ROUTES.HOME]: 'Mis Encuestas',
    [ROUTES.CREATE_STUDY]: 'Nuevo Estudio',
    [ROUTES.RESULTS]: 'Resultados',
    [ROUTES.ENCUESTA_EXAMPLE]: 'Ejemplo de Componentes',
    [ROUTES.NOT_FOUND]: 'Página No Encontrada',
} as const;

/**
 * Helper para construir rutas dinámicas
 */
export const buildRoute = {
    /**
     * Construye la ruta para ver los resultados de un estudio específico
     */
    studyResults: (studyId: string) => `/resultados/${studyId}`,

    /**
     * Construye la ruta para editar un estudio específico
     */
    editStudy: (studyId: string) => `/create/${studyId}`,
} as const;
