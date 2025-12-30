import { Dialog } from 'primereact/dialog';
import { Button } from '../Button/Button';
import { useTheme } from '../../context/ThemeContext';
import { type ReactNode } from 'react';

export interface ModalAction {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    className?: string;
    icon?: string;
    loading?: boolean;
    disabled?: boolean;
}

interface ModalProps {
    visible: boolean;
    onHide: () => void;
    title: string;
    children: ReactNode;
    // Acciones personalizadas
    actions?: ModalAction[];
    // O usar las acciones por defecto (Cancelar/Confirmar)
    showDefaultActions?: boolean;
    onCancel?: () => void;
    onConfirm?: () => void;
    cancelLabel?: string;
    confirmLabel?: string;
    confirmVariant?: 'primary' | 'secondary' | 'danger' | 'success';
    // Estilos
    width?: string;
    className?: string;
    headerClassName?: string;
    contentClassName?: string;
    footerClassName?: string;
    // Configuraciones adicionales
    closable?: boolean;
    closeOnEscape?: boolean;
    dismissableMask?: boolean;
    maximizable?: boolean;
    modal?: boolean;
    position?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const Modal = ({
    visible,
    onHide,
    title,
    children,
    actions,
    showDefaultActions = true,
    onCancel,
    onConfirm,
    cancelLabel = 'Cancelar',
    confirmLabel = 'Confirmar',
    confirmVariant = 'primary',
    width = '50vw',
    className = '',
    headerClassName = '',
    contentClassName = '',
    footerClassName = '',
    closable = true,
    closeOnEscape = true,
    dismissableMask = false,
    maximizable = false,
    modal = true,
    position = 'center'
}: ModalProps) => {
    const { isDarkMode } = useTheme();

    // Acciones por defecto si no se proporcionan personalizadas
    const defaultActions: ModalAction[] = [
        {
            label: cancelLabel,
            onClick: onCancel || onHide,
            variant: 'secondary',
            icon: 'pi-times'
        },
        {
            label: confirmLabel,
            onClick: onConfirm || onHide,
            variant: confirmVariant,
            icon: 'pi-check'
        }
    ];

    // Usar acciones personalizadas o por defecto
    const finalActions = actions || (showDefaultActions ? defaultActions : []);

    // Footer con botones de acción - responsive
    const footer = finalActions.length > 0 ? (
        <div className={`flex flex-row justify-end pl-2 gap-2 sm:gap-3 mt-3 ${footerClassName}`}>
            {finalActions.map((action, index) => (
                <Button
                    key={index}
                    variant={action.variant || 'primary'}
                    onClick={action.onClick}
                    className={`${action.className} flex-1 sm:flex-initial`}
                    disabled={action.disabled}
                    loading={action.loading}
                >
                    {action.icon && <i className={`pi ${action.icon} mr-2`}></i>}
                    {action.label}
                </Button>
            ))}
        </div>
    ) : null;

    return (
        <Dialog
            visible={visible}
            onHide={onHide}
            header={title}
            footer={footer}
            closable={closable}
            closeOnEscape={closeOnEscape}
            dismissableMask={dismissableMask}
            maximizable={maximizable}
            modal={modal}
            position={position}
            draggable={false}
            resizable={false}
            breakpoints={{ '960px': '75vw', '640px': '95vw' }}
            style={{
                width,
                backgroundColor: isDarkMode ? '#111827' : '#ffffff'
            }}
            className={className}
            pt={{
                root: {
                    className: `${isDarkMode ? 'dark' : ''} max-h-[90vh] sm:max-h-[85vh] rounded-lg overflow-hidden !bg-gray-900`,
                    style: {
                        backgroundColor: isDarkMode ? '#111827 !important' : '#ffffff !important'
                    }
                },
                header: {
                    className: `${isDarkMode
                        ? '!bg-gray-900 text-white border-b border-gray-700'
                        : '!bg-white text-gray-900 border-b border-gray-200'
                        } px-4 py-3 sm:px-6 sm:py-4 ${headerClassName}`,
                    style: {
                        backgroundColor: isDarkMode ? '#111827 !important' : '#ffffff !important'
                    }
                },
                content: {
                    className: `${isDarkMode
                        ? '!bg-gray-900 text-gray-200'
                        : '!bg-white text-gray-900'
                        } px-4 py-3 sm:px-6 sm:py-4 overflow-y-auto max-h-[60vh] ${contentClassName}`,
                    style: {
                        backgroundColor: isDarkMode ? '#111827 !important' : '#ffffff !important'
                    }
                },
                footer: {
                    className: `${isDarkMode
                        ? '!bg-gray-900 border-t border-gray-700'
                        : '!bg-white border-t border-gray-200'
                        } px-4 py-3 sm:px-6 sm:py-4`,
                    style: {
                        backgroundColor: isDarkMode ? '#111827 !important' : '#ffffff !important'
                    }
                },
                mask: {
                    className: 'backdrop-blur-sm'
                },
                closeButton: {
                    className: `${isDarkMode
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        } transition-colors duration-200 !w-8 !h-8 sm:!w-10 sm:!h-10`
                },
                headerTitle: {
                    className: `text-lg sm:text-xl font-semibold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`
                }
            }}
        >
            {children}
        </Dialog>
    );
};
