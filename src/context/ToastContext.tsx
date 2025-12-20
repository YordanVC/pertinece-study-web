import { createContext, useContext, useRef, type ReactNode } from 'react';
import { Toast, type ToastRef } from '../components/Toast';

interface ToastContextType {
    showSuccess: (summary: string, detail?: string) => void;
    showInfo: (summary: string, detail?: string) => void;
    showWarn: (summary: string, detail?: string) => void;
    showError: (summary: string, detail?: string) => void;
    clear: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const toastRef = useRef<ToastRef>(null);

    const showSuccess = (summary: string, detail?: string) => {
        toastRef.current?.showSuccess(summary, detail);
    };

    const showInfo = (summary: string, detail?: string) => {
        toastRef.current?.showInfo(summary, detail);
    };

    const showWarn = (summary: string, detail?: string) => {
        toastRef.current?.showWarn(summary, detail);
    };

    const showError = (summary: string, detail?: string) => {
        toastRef.current?.showError(summary, detail);
    };

    const clear = () => {
        toastRef.current?.clear();
    };

    return (
        <ToastContext.Provider value={{ showSuccess, showInfo, showWarn, showError, clear }}>
            {children}
            <Toast ref={toastRef} />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast debe usarse dentro de ToastProvider');
    }
    return context;
};
