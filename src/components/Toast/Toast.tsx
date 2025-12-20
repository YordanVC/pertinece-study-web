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
                boxShadow: isDarkMode
                    ? '0 0 0 1px rgba(34, 197, 94, 0.5), 0 4px 20px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.3)'
                    : '0 0 0 1px rgba(22, 163, 74, 0.3), 0 4px 20px rgba(22, 163, 74, 0.25), 0 0 30px rgba(22, 163, 74, 0.2)'
            },
            info: {
                borderColor: isDarkMode ? '#3b82f6' : '#2563eb',
                boxShadow: isDarkMode
                    ? '0 0 0 1px rgba(59, 130, 246, 0.5), 0 4px 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.3)'
                    : '0 0 0 1px rgba(37, 99, 235, 0.3), 0 4px 20px rgba(37, 99, 235, 0.25), 0 0 30px rgba(37, 99, 235, 0.2)'
            },
            warn: {
                borderColor: isDarkMode ? '#eab308' : '#ca8a04',
                boxShadow: isDarkMode
                    ? '0 0 0 1px rgba(234, 179, 8, 0.5), 0 4px 20px rgba(234, 179, 8, 0.4), 0 0 40px rgba(234, 179, 8, 0.3)'
                    : '0 0 0 1px rgba(202, 138, 4, 0.3), 0 4px 20px rgba(202, 138, 4, 0.25), 0 0 30px rgba(202, 138, 4, 0.2)'
            },
            error: {
                borderColor: isDarkMode ? '#ef4444' : '#dc2626',
                boxShadow: isDarkMode
                    ? '0 0 0 1px rgba(239, 68, 68, 0.5), 0 4px 20px rgba(239, 68, 68, 0.4), 0 0 40px rgba(239, 68, 68, 0.3)'
                    : '0 0 0 1px rgba(220, 38, 38, 0.3), 0 4px 20px rgba(220, 38, 38, 0.25), 0 0 30px rgba(220, 38, 38, 0.2)'
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
                life: message.life || 3000
            });
        },
        showSuccess: (summary: string, detail?: string) => {
            toastRef.current?.show({
                severity: 'success',
                summary,
                detail,
                life: 3000
            });
        },
        showInfo: (summary: string, detail?: string) => {
            toastRef.current?.show({
                severity: 'info',
                summary,
                detail,
                life: 3000
            });
        },
        showWarn: (summary: string, detail?: string) => {
            toastRef.current?.show({
                severity: 'warn',
                summary,
                detail,
                life: 4000
            });
        },
        showError: (summary: string, detail?: string) => {
            toastRef.current?.show({
                severity: 'error',
                summary,
                detail,
                life: 5000
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
                message: ({ state }: any) => {
                    const severity = (state.messages[0]?.severity || 'info') as ToastSeverity;
                    const severityStyles = getSeverityStyles(severity);
                    return {
                        className: `${isDarkMode
                            ? '!bg-gray-800'
                            : '!bg-white'
                            } rounded-lg backdrop-blur-sm`,
                        style: {
                            backgroundColor: isDarkMode ? '#1f2937 !important' : '#ffffff !important',
                            borderLeft: `4px solid ${severityStyles.borderColor} !important`
                        }
                    };
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
