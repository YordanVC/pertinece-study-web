import { type ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'sidebar' | 'sidebar-active';

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: ButtonVariant;
    icon?: string;
    isCollapsed?: boolean;
    isActive?: boolean;
    isDarkMode?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    loading?: boolean;
}

export const Button = ({
    children,
    onClick,
    variant = 'primary',
    icon,
    isCollapsed = false,
    isActive = false,
    isDarkMode = false,
    className = '',
    type = 'button',
    disabled = false,
    loading = false
}: ButtonProps) => {
    // Estilos base comunes a todos los botones
    const baseStyles = `
        transition-all duration-300 ease-in-out
        transform hover:scale-[1.02] active:scale-[0.98]
        relative overflow-hidden group
        font-medium rounded-lg
        ${disabled || loading ? 'opacity-60 cursor-not-allowed hover:scale-100 active:scale-100' : 'cursor-pointer'}
    `;

    // Estilos específicos por variante
    const variantStyles = {
        primary: `
            px-4 py-2
            bg-ug-blue text-white
            hover:bg-ug-blue-dark
            shadow-[0_2px_8px_rgba(0,93,164,0.3)]
            hover:shadow-[0_4px_16px_rgba(0,93,164,0.4)]
        `,
        secondary: `
            px-4 py-2
            ${isDarkMode
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
            }
        `,
        success: `
            px-4 py-2
            bg-green-600 text-white
            hover:bg-green-700
            shadow-[0_2px_8px_rgba(34,197,94,0.3)]
            hover:shadow-[0_4px_16px_rgba(34,197,94,0.4)]
        `,
        danger: `
            w-full flex items-center justify-center
            py-2 font-bold text-base
            ${isCollapsed ? 'lg:px-3' : 'px-4'}
            ${isDarkMode
                ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-[0_4px_12px_rgba(220,38,38,0.4)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.6)]'
                : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-[0_4px_12px_rgba(239,68,68,0.4)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.6)]'
            }
        `,
        sidebar: `
            w-full h-15 flex items-center
            ${isCollapsed ? 'lg:justify-center lg:p-3' : 'p-3'}
            ${isDarkMode
                ? 'text-gray-300 hover:bg-gray-700 hover:text-cyan-400 shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_16px_rgba(6,182,212,0.2)]'
                : 'text-gray-700 hover:bg-ug-gray hover:text-ug-blue shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,93,164,0.15)] active:shadow-[0_2px_6px_rgba(0,0,0,0.1)]'
            }
        `,
        'sidebar-active': `
            w-full h-15 flex items-center
            ${isCollapsed ? 'lg:justify-center lg:p-3' : 'p-3'}
            bg-ug-blue text-white shadow-[0_4px_12px_rgba(0,93,164,0.4)]
        `
    };

    // Determinar la variante correcta para sidebar
    const activeVariant = variant === 'sidebar' && isActive ? 'sidebar-active' : variant;

    // Estilos del icono
    const iconStyles = `
        transition-all duration-300
        group-hover:scale-110
        group-active:scale-95
        text-xl
        ${isCollapsed ? '' : 'mr-3'}
        ${activeVariant === 'sidebar-active'
            ? 'text-white'
            : isDarkMode && variant === 'sidebar'
                ? 'group-hover:text-cyan-400'
                : variant === 'sidebar'
                    ? 'group-hover:text-ug-blue'
                    : ''
        }
    `;

    const iconSizeClass = variant === 'danger' ? 'text-2xl' : 'text-xl';

    return (
        <button
            type={type}
            onClick={disabled || loading ? undefined : onClick}
            disabled={disabled || loading}
            className={`${baseStyles} ${variantStyles[activeVariant]} ${className}`}
        >
            {/* Efecto de brillo al hacer clic */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent
                opacity-0 group-active:opacity-20
                transform -translate-x-full group-active:translate-x-full
                transition-all duration-500 ease-out">
            </span>

            {/* Icono o spinner de loading */}
            {loading ? (
                <i className={`pi pi-spinner pi-spin ${iconStyles} ${iconSizeClass}`}></i>
            ) : icon ? (
                <i className={`pi ${icon} ${iconStyles} ${iconSizeClass}`}></i>
            ) : null}

            {/* Texto del botón */}
            <span className={`relative z-10 transition-all duration-300 ${isCollapsed && (variant === 'sidebar' || variant === 'danger') ? 'lg:hidden' : ''}`}>
                {children}
            </span>
        </button>
    );
};
