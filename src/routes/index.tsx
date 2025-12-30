import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../components/Layout/MainLayout';
import { ResultadosPage } from '../pages/Resultados/ResultadosPage';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';
import LoginPage from '../pages/Login/LoginPage';
import { NuevoEstudioPage } from '../pages/NuevoEstudio/NuevoEstudioPage';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute';
import { ROUTES } from './routes';

/**
 * Configuración centralizada de rutas de la aplicación
 * Las rutas privadas están protegidas con el componente PrivateRoute
 */
export const AppRoutes = () => {
    return (
        <Routes>
            {/* Ruta pública - Login sin Layout */}
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />

            {/* Rutas privadas - Protegidas con autenticación */}
            <Route
                path={ROUTES.HOME}
                element={
                    <PrivateRoute>
                        <MainLayout />
                    </PrivateRoute>
                }
            >
                <Route index element={<div>Página de Inicio / Mis Encuestas</div>} />
                <Route path={ROUTES.CREATE_STUDY} element={<NuevoEstudioPage />} />
                <Route path={ROUTES.RESULTS} element={<ResultadosPage />} />
                {/* Ruta catch-all para páginas no encontradas - dentro del layout */}
                <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};
