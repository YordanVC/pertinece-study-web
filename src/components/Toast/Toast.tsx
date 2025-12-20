import { Toast as PrimeToast } from 'primereact/toast';
import { useRef, useImperativeHandle, forwardRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './Toast.css';

export type ToastSeverity = 'success' | 'info' | 'warn' | 'error';

export interface ToastMessage {
    severity: ToastSeverity;
    summary: string;
    detail?: string;
    life?: number;
}

export interface ToastRef {
    show: (message: ToastMessage) => void;
    showSuccess: (summary: string, detail?: string) => void;
    showInfo: (summary: string, detail?: string) => void;
    showWarn: (summary: string, detail?: string) => void;
    showError: (summary: string, detail?: string) => void;
    clear: () => void;
}

export const Toast = forwardRef<ToastRef>((_, ref) => {
    const toastRef = useRef<PrimeToast>(null);
    const { isDarkMode } = useTheme();

    // Colores de borde y sombra según el tipo de toast
    const getSeverityStyles = (severity: ToastSeverity) => {
        const styles = {
            success: {
                borderColor: isDarkMode ? '#22c55e' : '#16a34a',
                boxShadow: isDarkMode ? '0 4px 14px 0 rgba(34, 197, 94, 0.25)' : '0 4px 14px 0 rgba(22, 163, 74, 0.2)'
            },
            info: {
                borderColor: isDarkMode ? '#3b82f6' : '#2563eb',
                boxShadow: isDarkMode ? '0 4px 14px 0 rgba(59, 130, 246, 0.25)' : '0 4px 14px 0 rgba(37, 99, 235, 0.2)'
            },
            warn: {
                borderColor: isDarkMode ? '#eab308' : '#ca8a04',
                boxShadow: isDarkMode ? '0 4px 14px 0 rgba(234, 179, 8, 0.25)' : '0 4px 14px 0 rgba(202, 138, 4, 0.2)'
            },
            error: {
                borderColor: isDarkMode ? '#ef4444' : '#dc2626',
                boxShadow: isDarkMode ? '0 4px 14px 0 rgba(239, 68, 68, 0.25)' : '0 4px 14px 0 rgba(220, 38, 38, 0.2)'
            }
        };
        return styles[severity];
    };

    useImperativeHandle(ref, () => ({
        show: (message: ToastMessage) => {
            toastRef.current?.show({
                severity: message.severity,
                summary: message.summary,
                detail: message.detail,
                life: message.life || 3000,
                contentClassName: `toast-${message.severity}`
            });
        },
        showSuccess: (summary: string, detail?: string) => {
            toastRef.current?.show({
                severity: 'success',
                summary,
                detail,
                life: 3000,
                contentClassName: 'toast-success'
            });
        },
        showInfo: (summary: string, detail?: string) => {
            toastRef.current?.show({
                severity: 'info',
                summary,
                detail,
                life: 3000,
                contentClassName: 'toast-info'
            });
        },
        showWarn: (summary: string, detail?: string) => {
            toastRef.current?.show({
                severity: 'warn',
                summary,
                detail,
                life: 4000,
                contentClassName: 'toast-warn'
            });
        },
        showError: (summary: string, detail?: string) => {
            toastRef.current?.show({
                severity: 'error',
                summary,
                detail,
                life: 5000,
                contentClassName: 'toast-error'
            });
        },
        clear: () => {
            toastRef.current?.clear();
        }
    }));

    return (
        <PrimeToast
            ref={toastRef}
            position="top-right"
            pt={{
                root: {
                    className: 'w-full sm:w-96'
                },
                message: {
                    className: `${isDarkMode
                        ? '!bg-gray-800 !border-gray-700 shadow-xl'
                        : '!bg-white !border-gray-200 shadow-md'
                        } border-2 rounded-lg backdrop-blur-sm`,
                    style: {
                        backgroundColor: isDarkMode ? '#1f2937 !important' : '#ffffff !important'
                    }
                },
                content: {
                    className: 'flex items-center gap-3 p-4'
                },
                icon: {
                    className: `text-2xl flex-shrink-0 self-center flex items-center justify-center ${isDarkMode ? '!brightness-125' : ''}`
                },
                text: {
                    className: 'flex-1'
                },
                summary: {
                    className: `${isDarkMode ? '!text-white' : '!text-gray-900'} font-semibold text-base mb-1`
                },
                detail: {
                    className: `${isDarkMode ? '!text-gray-200' : '!text-gray-600'} text-sm leading-relaxed`
                },
                closeButton: {
                    className: `${isDarkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        } transition-colors duration-200 rounded-md p-1`
                }
            }}
        />
    );
});

Toast.displayName = 'Toast';
