import { useNavigate, useLocation } from 'react-router-dom';
import defaultLogo from '../../assets/UgHorizontalColor.svg';
import ugLettersOnly from '../../assets/UgLettersOnly.svg';
import type { SidebarProps } from '../../types/sidebar.types';

export const Sidebar = ({
    menuItems,
    logoSrc = defaultLogo,
    logoAlt = 'Logo',
    isMobileMenuOpen = false,
    onMobileMenuClose,
    isCollapsed = false,
    onToggleCollapse,
    isDarkMode = false
}: SidebarProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const handleNavigation = (path: string) => {
        navigate(path);
        onMobileMenuClose?.();
    };

    // Función para obtener ícono por defecto si no existe
    const getItemIcon = (icon?: string) => {
        return icon || 'pi pi-circle';
    };

    return (
        <>
            {/* Overlay para móvil */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-transparent z-40 transition-opacity"
                    onClick={onMobileMenuClose}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-40
                h-screen flex flex-col relative
                transform transition-all duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0 lg:translate-x-0'}
                ${isCollapsed ? 'lg:w-24' : 'lg:w-72'}
                ${isDarkMode ? 'bg-gray-800 border-r border-gray-700' : 'bg-white border-r border-gray-200'}
            `}>
                {/* Botón de colapsar/expandir para desktop */}
                <button
                    onClick={onToggleCollapse}
                    className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-50
                        w-12 h-24 bg-ug-blue text-white rounded-full
                        items-center justify-center
                        hover:bg-ug-blue-dark transition-all duration-300
                        shadow-xl hover:shadow-2xl
                        hover:scale-110 active:scale-95"
                    aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
                >
                    <i className={`pi ${isCollapsed ? 'pi-chevron-right' : 'pi-chevron-left'} text-2xl font-bold`}></i>
                </button>

                <div className={`p-6 flex justify-center items-center transition-all duration-300 ${isCollapsed ? 'lg:p-3' : ''}`}>
                    {isCollapsed ? (
                        <div className={`w-16 h-16 flex lg:flex items-center justify-center rounded-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-1000/50 shadow-inner' : 'bg-transparent'
                            }`}>
                            <img
                                src={ugLettersOnly}
                                alt="UG"
                                className={`w-12 h-12 transition-all duration-300 ${isDarkMode ? 'brightness-150 contrast-125' : ''
                                    }`}
                            />
                        </div>
                    ) : (
                        <>
                            {/* Logo pequeño para mobile */}
                            <div className={`w-16 h-16 flex lg:hidden items-center justify-center rounded-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-1000/50 shadow-inner' : 'bg-transparent'
                                }`}>
                                <img
                                    src={ugLettersOnly}
                                    alt="UG"
                                    className={`w-12 h-12 transition-all duration-300 ${isDarkMode ? 'brightness-150 contrast-125' : ''
                                        }`}
                                />
                            </div>
                            {/* Logo completo para desktop */}
                            <div className={`hidden lg:flex items-center justify-center transition-all duration-300 ${isDarkMode ? 'bg-gray-700/30 px-4 py-2 rounded-lg' : 'bg-transparent'
                                }`}>
                                <img
                                    src={logoSrc}
                                    alt={logoAlt}
                                    className={`h-12 transition-all duration-300 ${isDarkMode ? 'brightness-125 contrast-110' : ''
                                        }`}
                                />
                            </div>
                        </>
                    )}
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <div key={item.label} className="relative group/tooltip">
                            <button
                                onClick={() => handleNavigation(item.path)}
                                className={`
                                w-full h-15 flex items-center rounded-lg 
                                transition-all duration-300 ease-in-out
                                transform hover:scale-[1.02] active:scale-[0.98]
                                relative overflow-hidden
                                group
                                ${isCollapsed ? 'lg:justify-center lg:p-3' : 'p-3'}
                                ${isActive(item.path)
                                        ? 'bg-ug-blue text-white shadow-[0_4px_12px_rgba(0,93,164,0.4)]'
                                        : isDarkMode
                                            ? 'text-gray-300 hover:bg-gray-700 hover:text-cyan-400 shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_16px_rgba(6,182,212,0.2)]'
                                            : 'text-gray-700 hover:bg-ug-gray hover:text-ug-blue shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,93,164,0.15)] active:shadow-[0_2px_6px_rgba(0,0,0,0.1)]'
                                    }
                            `}
                            >
                                <span className={`
                                absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent
                                opacity-0 group-active:opacity-20
                                transform -translate-x-full group-active:translate-x-full
                                transition-all duration-500 ease-out
                            `}></span>
                                <i className={`
                                ${getItemIcon(item.icon)}
                                transition-all duration-300
                                group-hover:scale-110
                                group-active:scale-95
                                text-xl
                                ${isCollapsed ? '' : 'mr-3'}
                                ${isActive(item.path)
                                        ? 'text-white'
                                        : isDarkMode
                                            ? 'group-hover:text-cyan-400'
                                            : 'group-hover:text-ug-blue'
                                    }
                            `}></i>
                                <span className={`font-medium relative z-10 transition-all duration-300 ${isCollapsed ? 'lg:hidden' : ''}`}>
                                    {item.label}
                                </span>
                            </button>

                            {/* Tooltip para sidebar colapsado */}
                            {isCollapsed && (
                                <div className="hidden lg:block absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50
                                    opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible
                                    transition-all duration-200 pointer-events-none">
                                    <div className="bg-ug-blue text-white px-3 py-2 rounded-lg shadow-xl whitespace-nowrap
                                        text-sm font-medium relative">
                                        {item.label}
                                        {/* Flecha del tooltip */}
                                        <div className="absolute right-full top-1/2 -translate-y-1/2 
                                            w-0 h-0 border-t-[6px] border-t-transparent 
                                            border-r-[6px] border-r-ug-blue 
                                            border-b-[6px] border-b-transparent">
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>
        </>
    );
};