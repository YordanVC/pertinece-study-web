import { useNavigate, useLocation } from 'react-router-dom';
import defaultLogo from '../../assets/UgHorizontalColor.svg';
import ugLettersOnly from '../../assets/UgLettersOnly.svg';
import type { SidebarProps } from '../../types/sidebar.types';
import { Tooltip } from '../Tooltip/Tooltip';
import { Button } from '../Button/Button';
import { createPortal } from 'react-dom';

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
                    className="lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity"
                    onClick={onMobileMenuClose}
                ></div>
            )}

            {/* Botón de colapsar/expandir para desktop - FUERA del sidebar */}
            <button
                onClick={onToggleCollapse}
                className={`hidden lg:flex fixed top-1/2 -translate-y-1/2 z-[60]
                    w-12 h-24 bg-ug-blue text-white rounded-full
                    items-center justify-center
                    hover:bg-ug-blue-dark transition-all duration-300
                    shadow-xl hover:shadow-2xl
                    hover:scale-110 active:scale-95
                    ${isCollapsed ? 'left-[80px]' : 'left-[320px]'}
                `}
                aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
                style={{ marginLeft: '-24px' }}
            >
                <i className={`pi ${isCollapsed ? 'pi-chevron-right' : 'pi-chevron-left'} text-2xl font-bold`}></i>
            </button>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-40
                h-screen flex flex-col
                transform transition-all duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0 w-80 sm:w-96' : '-translate-x-full w-0 lg:translate-x-0'}
                ${isCollapsed ? 'lg:w-20' : 'lg:w-80'}
                ${isDarkMode ? 'bg-[#1e293b] border-r border-gray-600' : 'bg-white border-r border-gray-200'}
            `}
                style={{ overflowY: 'auto', overflowX: 'hidden' }}
            >

                <div className={` mt-2 h-16 flex justify-center items-center transition-all duration-300 mb-2 ${isCollapsed ? 'lg:p-3' : 'p-0 lg:p-6'}`}>
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
                            <div className={`w-16 h-16 flex lg:hidden items-center justify-center transition-all duration-300 ${isDarkMode ? 'bg-gray-1000/50 shadow-inner' : 'bg-transparent'
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
                <nav className="mt-8 flex-1 px-4 space-y-3 overflow-y-auto">
                    {menuItems.map((item) => (
                        <div key={item.label} className="relative group/tooltip">
                            <Button
                                variant="sidebar"
                                onClick={() => handleNavigation(item.path)}
                                icon={getItemIcon(item.icon)}
                                isCollapsed={isCollapsed}
                                isActive={isActive(item.path)}
                                isDarkMode={isDarkMode}
                            >
                                {item.label}
                            </Button>

                            {/* Tooltip para sidebar colapsado */}
                            {isCollapsed && <Tooltip message={item.label} />}
                        </div>
                    ))}
                </nav>

                {/* Botón de Logout */}
                <div className={`px-4 py-4  border-gray-200 ${isDarkMode ? 'dark:border-gray-700' : ''}`}>
                    <div className="relative group/tooltip">
                        <Button
                            variant="danger"
                            onClick={() => {
                                // Aquí irá la lógica de logout
                                console.log('Logout clicked');
                            }}
                            icon="pi-sign-out"
                            isCollapsed={isCollapsed}
                            isDarkMode={isDarkMode}
                        >
                            Cerrar Sesión
                        </Button>
                        {isCollapsed && <Tooltip message="Cerrar Sesión" />}
                    </div>
                </div>
            </aside>
        </>
    );
};