export interface HamburgerButtonProps {
    /** Estado del menú (abierto/cerrado) */
    isOpen: boolean;

    /** Callback cuando se hace click */
    onClick: () => void;

    /** Clase CSS adicional */
    className?: string;
}

/**
 * Botón hamburguesa animado que se transforma en X
 * Animación morphing moderna y fluida
 */
export const HamburgerButton = ({
    isOpen,
    onClick,
    className = ''
}: HamburgerButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`lg:hidden fixed top-2 left-2 z-50 p-3 bg-ug-blue text-white rounded-lg shadow-lg hover:bg-ug-blue-dark transition-all hover:scale-105 active:scale-95 ${className}`}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
        >
            <div className="relative w-6 h-5 flex flex-col justify-between">
                {/* Línea superior */}
                <span
                    className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ease-in-out origin-center
                        ${isOpen
                            ? 'rotate-45 translate-y-[9px]'
                            : 'rotate-0 translate-y-0'
                        }`}
                ></span>

                {/* Línea del medio */}
                <span
                    className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ease-in-out
                        ${isOpen
                            ? 'opacity-0 scale-x-0'
                            : 'opacity-100 scale-x-100'
                        }`}
                ></span>

                {/* Línea inferior */}
                <span
                    className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ease-in-out origin-center
                        ${isOpen
                            ? '-rotate-45 -translate-y-[9px]'
                            : 'rotate-0 translate-y-0'
                        }`}
                ></span>
            </div>
        </button>
    );
};
