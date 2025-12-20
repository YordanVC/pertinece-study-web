import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from '../Sidebar/SideBar';
import { mainMenuItems } from '../../config/menuItems';
import bgImage from '../../assets/bg-3.jpg';
import { Toggle } from '../Toggle/Toggle';
import { IconButton } from '../IconButton/IconButton';
import { useTheme } from '../../context/ThemeContext';
export const MainLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className={`flex min-h-screen w-full overflow-x-clip transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-ug-gray'}`}>
            {/* Botón hamburguesa para móvil */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-2 left-2 z-50 p-3 bg-ug-blue text-white rounded-lg shadow-lg hover:bg-ug-blue-dark transition-all hover:scale-105 active:scale-95"
                aria-label="Toggle menu"
            >
                <i className={`pi ${isMobileMenuOpen ? 'pi-times' : 'pi-bars'} text-xl`}></i>
            </button>
            <Sidebar
                menuItems={mainMenuItems}
                logoAlt="UG Logo"
                isMobileMenuOpen={isMobileMenuOpen}
                onMobileMenuClose={() => setIsMobileMenuOpen(false)}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                isDarkMode={isDarkMode}
            />
            <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-80'
                }`}>
                <header className={`w-full p-4 h-16 border-b flex items-center justify-between px-4 lg:px-8 shadow-sm transition-colors duration-300 ${isDarkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                    }`}>
                    <h1 className={`text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold ${isMobileMenuOpen ? 'ml-0' : 'ml-12'}  lg:ml-0 transition-colors duration-300 leading-tight ${isDarkMode ? 'text-cyan-400' : 'text-ug-blue'
                        }`}>
                        Sistema Estudio de Pertinencia UG
                    </h1>

                    {/* Toggle de modo oscuro/claro */}
                    {!isMobileMenuOpen && (
                        <Toggle
                            checked={isDarkMode}
                            onChange={toggleTheme}
                            checkedIcon="pi-moon"
                            uncheckedIcon="pi-sun"
                            checkedBgColor="from-indigo-400 to-indigo-600"
                            uncheckedBgColor="from-yellow-400 to-yellow-600"
                            checkedIconColor="text-blue-800"
                            uncheckedIconColor="text-green-800"
                        />
                    )}

                </header>
                <section
                    className="
                        relative flex-1 overflow-y-auto
                        mt-0 p-4 sm:p-6 lg:p-8
                        transition-colors duration-300
                        bg-cover bg-center bg-no-repeat bg-fixed
                    "
                    style={{ backgroundImage: `url(${bgImage})` }}
                >
                    {/* Overlay */}
                    <div
                        className={`
                        absolute inset-0
                        transition-colors duration-300
                        ${isDarkMode
                                ? 'bg-black/60 backdrop-blur-sm'
                                : 'bg-white/40'}
                        `}
                    />
                    {/* Contenido */}
                    <div className="relative z-10">
                        <Outlet />
                    </div>
                </section>


                {/* Footer */}
                <footer className={`border-t transition-colors duration-300 ${isDarkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                    }`}>
                    <div className="px-4 lg:px-8 py-4 flex flex-col  sm:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <div className={` text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                            © 2025 Universidad de Guayaquil. Todos los derechos reservados.
                        </div>

                        {/* Redes Sociales */}
                        <div className="flex items-center gap-4">
                            <IconButton
                                icon="pi-facebook"
                                href="https://www.facebook.com/UdeGuayaquil"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="social"
                                size="md"
                                isDarkMode={isDarkMode}
                                ariaLabel="Facebook"
                            />
                            <IconButton
                                icon="pi-instagram"
                                href="https://www.instagram.com/universidad_guayaquil/"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="social"
                                size="md"
                                isDarkMode={isDarkMode}
                                ariaLabel="Instagram"
                            />
                            <IconButton
                                icon="pi-youtube"
                                href="https://www.youtube.com/@UdeGuayaquil"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="social"
                                size="md"
                                isDarkMode={isDarkMode}
                                ariaLabel="YouTube"
                            />
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};