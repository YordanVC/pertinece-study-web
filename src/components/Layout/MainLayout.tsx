import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from '../Sidebar/SideBar';
import { mainMenuItems } from '../../config/menuItems';
import bgImage from '../../assets/bg-3.jpg';
import { Toggle } from '../Toggle/Toggle';
import { IconButton } from '../IconButton/IconButton';
import { HamburgerButton } from '../HamburgerButton/HamburgerButton';
import { useTheme } from '../../context/ThemeContext';
import {
    MENSAJE_FOOTER,
    TITULO_HEADER,
    URL_PERFIL_FB,
    URL_PERFIL_IG,
    URL_PERFIL_YT
} from '../../utils/constants';
export const MainLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className={`flex min-h-screen w-full overflow-x-clip transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-ug-gray'}`}>
            {/* Botón hamburguesa para móvil */}
            <HamburgerButton
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
            <Sidebar
                menuItems={mainMenuItems}
                logoAlt="UG Logo"
                isMobileMenuOpen={isMobileMenuOpen}
                onMobileMenuClose={() => setIsMobileMenuOpen(false)}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                isDarkMode={isDarkMode}
            />
            <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-70'
                }`}>
                <header className={`w-full p-4 h-18 border-b flex items-center justify-between px-4 lg:px-8 shadow-sm transition-colors duration-300 border-b ${isDarkMode
                    ? ' dark bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                    }`}>
                    <h1 className={`text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold ${isMobileMenuOpen ? 'ml-0' : 'ml-12'}  lg:ml-0 transition-colors duration-300 leading-tight ${isDarkMode ? 'text-cyan-400' : 'text-ug-blue'
                        }`}>
                        {TITULO_HEADER}
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
                            mt-0 p-4 sm:p-4 lg:p-8
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
                            {MENSAJE_FOOTER}
                        </div>

                        {/* Redes Sociales */}
                        <div className="flex items-center gap-4">
                            <IconButton
                                icon="pi-facebook"
                                href={URL_PERFIL_FB}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="social"
                                size="md"
                                isDarkMode={isDarkMode}
                                ariaLabel="Facebook"
                            />
                            <IconButton
                                icon="pi-instagram"
                                href={URL_PERFIL_IG}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="social"
                                size="md"
                                isDarkMode={isDarkMode}
                                ariaLabel="Instagram"
                            />
                            <IconButton
                                icon="pi-youtube"
                                href={URL_PERFIL_YT}
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

