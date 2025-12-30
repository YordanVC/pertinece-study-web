import { ConfirmDialog } from '../components/Modal/ConfirmDialog';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { ROUTES } from '../routes/routes';

/**
 * Componente global para el modal de confirmación de logout
 * Se renderiza una sola vez en el árbol de la aplicación
 */
export const GlobalLogoutConfirmation = () => {
    const { showLogoutConfirmation, cancelLogout, confirmLogout } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const handleConfirm = () => {
        confirmLogout();
        navigate(ROUTES.LOGIN);
        toast.showInfo('Sesión cerrada', 'Has cerrado sesión correctamente.');
    };

    return (
        <ConfirmDialog
            visible={showLogoutConfirmation}
            variant='danger'
            onHide={cancelLogout}
            title="Confirmar cierre de sesión"
            message="¿Está a punto de cerrar sesión?"
            onConfirm={handleConfirm}
        />
    );
};
