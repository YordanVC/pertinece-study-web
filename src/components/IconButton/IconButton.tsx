import { type ReactNode } from 'react';

export type IconButtonVariant = 'primary' | 'secondary' | 'social' | 'custom';
export type IconButtonSize = 'sm' | 'md' | 'lg';

interface IconButtonProps {
    icon?: string;
    children?: ReactNode;
    onClick?: () => void;
    href?: string;
    variant?: IconButtonVariant;
    size?: IconButtonSize;
    bgColor?: string;
    hoverBgColor?: string;
    textColor?: string;
    hoverTextColor?: string;
    isDarkMode?: boolean;
    className?: string;
    ariaLabel?: string;
    target?: string;
    rel?: string;
}

export const IconButton = ({
    icon,
    children,
    onClick,
    href,
    variant = 'primary',
    size = 'md',
    bgColor,
    hoverBgColor,
    textColor,
    hoverTextColor,
    isDarkMode = false,
    className = '',
    ariaLabel,
    target,
    rel
}: IconButtonProps) => {
    // Tamaños
    const sizeStyles = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-9 h-9 text-lg',
        lg: 'w-12 h-12 text-xl'
    };

    // Variantes predefinidas
    const variantStyles = {
        primary: isDarkMode
            ? 'bg-ug-blue text-white hover:bg-ug-blue-dark'
            : 'bg-ug-blue text-white hover:bg-ug-blue-dark',
        secondary: isDarkMode
            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
        social: isDarkMode
            ? 'bg-gray-700 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900'
            : 'bg-ug-gray text-ug-blue hover:bg-ug-blue hover:text-white',
        custom: ''
    };

    // Usar colores personalizados si se proporcionan
    const customStyles = variant === 'custom' ? {
        backgroundColor: bgColor,
        color: textColor
    } : {};

    const baseClasses = `
        rounded-full flex items-center justify-center
        transition-all duration-300 transform
        hover:scale-110 active:scale-95
        ${sizeStyles[size]}
        ${variant !== 'custom' ? variantStyles[variant] : ''}
        ${variant === 'custom' && bgColor ? '' : ''}
        ${className}
    `;

    const customColorClasses = variant === 'custom' && (bgColor || textColor) ?
        `${bgColor || ''} ${textColor || ''} ${hoverBgColor || ''} ${hoverTextColor || ''}` : '';

    const finalClasses = `${baseClasses} ${customColorClasses}`.trim();

    const content = (
        <>
            {icon && <i className={`pi ${icon}`}></i>}
            {children}
        </>
    );

    // Si tiene href, renderizar como link
    if (href) {
        return (
            <a
                href={href}
                target={target}
                rel={rel}
                className={finalClasses}
                style={customStyles}
                aria-label={ariaLabel}
            >
                {content}
            </a>
        );
    }

    // Si no, renderizar como botón
    return (
        <button
            onClick={onClick}
            className={finalClasses}
            style={customStyles}
            aria-label={ariaLabel}
        >
            {content}
        </button>
    );
};
