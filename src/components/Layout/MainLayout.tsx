import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Sidebar } from '../Sidebar/SideBar';
import { mainMenuItems } from '../../config/menuItems';
import bgImage from '../../assets/bg-3.jpg';

export const MainLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Aplicar/remover clase dark al documento
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className={`flex min-h-screen relative transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-ug-gray'}`}>
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
            <main className="flex-1 flex flex-col w-full">
                <header className={`h-16 border-b flex items-center justify-between px-4 lg:px-8 shadow-sm transition-colors duration-300 ${isDarkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                    }`}>
                    <h1 className={`text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold ${isMobileMenuOpen ? 'ml-0' : 'ml-12'}  lg:ml-0 transition-colors duration-300 leading-tight ${isDarkMode ? 'text-cyan-400' : 'text-ug-blue'
                        }`}>
                        Sistema Estudio de Pertinencia UG
                    </h1>

                    {/* Toggle de modo oscuro/claro */}
                    {!isMobileMenuOpen && (
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`relative w-16 h-8 rounded-full transition-all duration-300 shadow-inner
                            ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}
                            hover:shadow-lg active:scale-95`}
                            aria-label="Toggle dark mode"
                        >
                            {/* Track del toggle */}
                            <div className={`absolute inset-0.5 rounded-full transition-colors duration-300
                            ${isDarkMode ? 'bg-linear-to-r from-indigo-500 to-purple-600' : 'bg-linear-to-r from-yellow-400 to-orange-400'}`}>
                            </div>

                            {/* Botón deslizante */}
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 transform
                            ${isDarkMode ? 'left-9' : 'left-1'}
                            flex items-center justify-center`}>
                                {isDarkMode ? (
                                    <i className="pi pi-moon text-indigo-600 text-xs"></i>
                                ) : (
                                    <i className="pi pi-sun text-orange-500 text-xs"></i>
                                )}
                            </div>
                        </button>
                    )}

                </header>
                <section
                    className={`p-4 sm:p-6 lg:p-8 overflow-y-auto relative flex-1 transition-colors duration-300`}
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'fixed'
                    }}
                >
                    {/* Overlay para mejorar legibilidad */}
                    <div className={`absolute inset-0 backdrop-blur-[1px] transition-colors duration-300 ${isDarkMode ? 'bg-gray-500/70' : 'bg-white/40'
                        }`}></div>
                    <div className="relative z-10">
                        <Outlet /> {/* Aquí se renderiza el contenido de las rutas */}
                    </div>
                </section>

                {/* Footer */}
                <footer className={`border-t transition-colors duration-300 ${isDarkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                    }`}>
                    <div className="px-4 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <div className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                            © 2025 Universidad de Guayaquil. Todos los derechos reservados.
                        </div>

                        {/* Redes Sociales */}
                        <div className="flex items-center gap-4">
                            <a
                                href="https://www.facebook.com/UdeGuayaquil"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${isDarkMode
                                    ? 'bg-gray-700 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900'
                                    : 'bg-ug-gray text-ug-blue hover:bg-ug-blue hover:text-white'
                                    }`}
                                aria-label="Facebook"
                            >
                                <i className="pi pi-facebook text-lg"></i>
                            </a>
                            <a
                                href="https://www.instagram.com/universidad_guayaquil/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${isDarkMode
                                    ? 'bg-gray-700 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900'
                                    : 'bg-ug-gray text-ug-blue hover:bg-ug-blue hover:text-white'
                                    }`}
                                aria-label="Instagram"
                            >
                                <i className="pi pi-instagram text-lg"></i>
                            </a>
                            <a
                                href="https://www.youtube.com/@UdeGuayaquil"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${isDarkMode
                                    ? 'bg-gray-700 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900'
                                    : 'bg-ug-gray text-ug-blue hover:bg-ug-blue hover:text-white'
                                    }`}
                                aria-label="YouTube"
                            >
                                <i className="pi pi-youtube text-lg"></i>
                            </a>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};