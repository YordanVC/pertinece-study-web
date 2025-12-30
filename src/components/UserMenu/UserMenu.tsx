import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

interface UserMenuProps {
    isDarkMode: boolean;
}

/**
 * Componente de menú de usuario con avatar y opciones de logout
 */
export const UserMenu = ({ isDarkMode }: UserMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { user, requestLogout } = useAuth();

    // Cerrar menú al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleLogout = () => {
        setIsOpen(false);
        requestLogout();
    };

    if (!user) return null;

    return (
        <div className="relative" ref={menuRef}>
            {/* Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-2 p-0 rounded-full md:px-3 md:py-2 md:rounded-lg
                    transition-all duration-200
                    ${isDarkMode
                        ? 'md:hover:bg-gray-700 text-gray-200'
                        : 'md:hover:bg-gray-100 text-gray-700'
                    }
                `}
                aria-label="User menu"
            >
                {/* Avatar */}
                <div className="relative w-9 h-9">
                    <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC`}
                        alt={user.name}
                        className={`w-full h-full rounded-full border-3 object-cover ${isDarkMode ? 'border-white' : 'border-gray-300'
                            }`}
                    />
                    <div className={`hidden md:block absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 ${isDarkMode ? 'border-gray-800' : 'border-white'
                        }`}></div>
                </div>

                {/* User Info - Hidden on mobile */}
                <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-semibold leading-tight">{user.name}</span>
                    <span className={`text-xs leading-tight ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                    </span>
                </div>

                {/* Dropdown Icon - Hidden on mobile */}
                <i className={`hidden md:inline pi pi-chevron-down text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className={`
                        absolute right-0 mt-2 w-56 rounded-lg shadow-lg
                        border overflow-hidden z-50
                        ${isDarkMode
                            ? 'bg-gray-800 border-gray-700'
                            : 'bg-white border-gray-200'
                        }
                    `}
                >
                    {/* User Info Header */}
                    <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                // Aquí puedes navegar a perfil cuando esté implementado
                            }}
                            className={`
                                w-full px-4 py-2 text-left text-sm
                                flex items-center gap-3
                                transition-colors duration-150
                                ${isDarkMode
                                    ? 'hover:bg-gray-700 text-gray-200'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }
                            `}
                        >
                            <i className="pi pi-user text-base"></i>
                            <span>Mi Perfil</span>
                        </button>

                        <button
                            onClick={() => {
                                setIsOpen(false);
                                // Aquí puedes navegar a configuración cuando esté implementado
                            }}
                            className={`
                                w-full px-4 py-2 text-left text-sm
                                flex items-center gap-3
                                transition-colors duration-150
                                ${isDarkMode
                                    ? 'hover:bg-gray-700 text-gray-200'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }
                            `}
                        >
                            <i className="pi pi-cog text-base"></i>
                            <span>Configuración</span>
                        </button>
                    </div>

                    {/* Logout */}
                    <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <button
                            onClick={handleLogout}
                            className={`
                                w-full px-4 py-2 text-left text-sm
                                flex items-center gap-3
                                transition-colors duration-150
                                ${isDarkMode
                                    ? 'hover:bg-red-900/20 text-red-400'
                                    : 'hover:bg-red-50 text-red-600'
                                }
                            `}
                        >
                            <i className="pi pi-sign-out text-base"></i>
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
