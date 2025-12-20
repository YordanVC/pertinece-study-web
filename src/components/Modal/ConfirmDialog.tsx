import { Modal, type ModalAction } from './Modal';
import { type ReactNode } from 'react';

interface ConfirmDialogProps {
    visible: boolean;
    onHide: () => void;
    title?: string;
    message: string | ReactNode;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'primary' | 'danger' | 'success' | 'warning';
    icon?: string;
    loading?: boolean;
    width?: string;
}

export const ConfirmDialog = ({
    visible,
    onHide,
    title = 'Confirmar acción',
    message,
    onConfirm,
    onCancel,
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    variant = 'primary',
    icon,
    loading = false,
    width = '30vw'
}: ConfirmDialogProps) => {

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        onHide();
    };

    const handleConfirm = () => {
        onConfirm();
        if (!loading) {
            onHide();
        }
    };

    // Mapear variantes a estilos de botón
    const confirmButtonVariant = variant === 'warning' ? 'primary' : variant;

    // Iconos por defecto según la variante
    const defaultIcons = {
        primary: 'pi-question-circle',
        danger: 'pi-exclamation-triangle',
        success: 'pi-check-circle',
        warning: 'pi-exclamation-circle'
    };

    const displayIcon = icon || defaultIcons[variant];

    // Colores de icono según variante
    const iconColors = {
        primary: 'text-blue-500 dark:text-blue-400',
        danger: 'text-red-500 dark:text-red-400',
        success: 'text-green-500 dark:text-green-400',
        warning: 'text-yellow-500 dark:text-yellow-400'
    };

    const actions: ModalAction[] = [
        {
            label: cancelLabel,
            onClick: handleCancel,
            variant: 'secondary',
            icon: 'pi-times',
            disabled: loading
        },
        {
            label: loading ? 'Procesando...' : confirmLabel,
            onClick: handleConfirm,
            variant: confirmButtonVariant,
            icon: loading ? undefined : 'pi-check',
            loading: loading,
            disabled: loading
        }
    ];

    return (
        <Modal
            visible={visible}
            onHide={loading ? () => { } : onHide}
            title={title}
            actions={actions}
            showDefaultActions={false}
            width={width}
            closable={!loading}
            closeOnEscape={!loading}
            dismissableMask={true}
        >
            <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 py-2">
                {/* Icono */}
                <div className="flex items-center justify-center shrink-0">
                    <i className={`pi ${displayIcon} ${iconColors[variant]}`} style={{ fontSize: '4rem' }}></i>
                </div>

                {/* Mensaje */}
                <div className="flex-1 text-center sm:text-left">
                    {typeof message === 'string' ? (
                        <p className="text-lg sm:text-xl leading-relaxed dark:text-gray-700">
                            {message}
                        </p>
                    ) : (
                        message
                    )}
                </div>
            </div>
        </Modal>
    );
};
