import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../routes/routes';
import type { ReactNode } from 'react';

/**
 * Props para el componente PrivateRoute
 */
interface PrivateRouteProps {
    children: ReactNode;
}

/**
 * Componente de carga mientras se verifica la autenticación
 */
const LoadingScreen = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            background: 'var(--surface-ground)',
            color: 'var(--text-color)'
        }}>
            <div style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center'
            }}>
                <div className="spinner" style={{
                    width: '50px',
                    height: '50px',
                    border: '4px solid var(--surface-border)',
                    borderTop: '4px solid var(--primary-color)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>Verificando autenticación...</p>
            </div>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

/**
 * Componente que protege rutas privadas
 * Redirige al login si el usuario no está autenticado
 * Guarda la ubicación intentada para redirigir después del login
 */
export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Mostrar pantalla de carga mientras se verifica la autenticación
    if (isLoading) {
        return <LoadingScreen />;
    }

    // Si no está autenticado, redirigir al login
    // Guardar la ubicación intentada en el state para redirigir después del login
    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    // Si está autenticado, mostrar el contenido
    return <>{children}</>;
};
