import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/lara-light-blue/theme.css';

// Registrar componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement);

export const ResultadosPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Detectar el modo oscuro desde el documento
        const darkModeClass = document.documentElement.classList.contains('dark');
        setIsDarkMode(darkModeClass);

        // Observer para cambios en el modo oscuro
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    // Colores de la aplicación
    const colors = {
        primary: isDarkMode ? '#06b6d4' : '#005da4', // cyan-400 / ug-blue
        secondary: isDarkMode ? '#8b5cf6' : '#6366f1', // purple-500 / indigo-500
        success: isDarkMode ? '#10b981' : '#059669', // emerald-500 / emerald-600
        warning: isDarkMode ? '#f59e0b' : '#d97706', // amber-500 / amber-600
        danger: isDarkMode ? '#ef4444' : '#dc2626', // red-500 / red-600
        background: isDarkMode ? '#1f2937' : '#ffffff', // gray-800 / white
        text: isDarkMode ? '#e5e7eb' : '#374151', // gray-200 / gray-700
        border: isDarkMode ? '#374151' : '#e5e7eb' // gray-700 / gray-200
    };

    // Datos para el gráfico de dona (Estado de encuestas)
    const doughnutData = {
        labels: ['Completadas', 'En Progreso', 'Pendientes'],
        datasets: [
            {
                data: [45, 30, 25],
                backgroundColor: [colors.success, colors.warning, colors.danger],
                borderColor: colors.background,
                borderWidth: 2,
            }
        ]
    };

    // Datos para el gráfico de barras (Encuestas por carrera)
    const barData = {
        labels: ['Ing. Sistemas', 'Medicina', 'Derecho', 'Arquitectura', 'Economía'],
        datasets: [
            {
                label: 'Encuestas Completadas',
                data: [65, 59, 80, 81, 56],
                backgroundColor: colors.primary,
                borderColor: colors.primary,
                borderWidth: 1,
            },
            {
                label: 'Encuestas Pendientes',
                data: [35, 41, 20, 19, 44],
                backgroundColor: colors.secondary,
                borderColor: colors.secondary,
                borderWidth: 1,
            }
        ]
    };

    // Datos para el gráfico de líneas (Tendencia mensual)
    const lineData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            {
                label: 'Encuestas Completadas',
                data: [12, 19, 15, 25, 22, 30],
                borderColor: colors.primary,
                backgroundColor: `${colors.primary}33`,
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Participación (%)',
                data: [65, 70, 68, 75, 72, 80],
                borderColor: colors.success,
                backgroundColor: `${colors.success}33`,
                tension: 0.4,
                fill: true,
            }
        ]
    };

    // Opciones comunes para los gráficos
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: colors.text,
                    font: {
                        family: 'Inter, system-ui, sans-serif'
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: { color: colors.text },
                grid: { color: colors.border }
            },
            y: {
                ticks: { color: colors.text },
                grid: { color: colors.border }
            }
        }
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: colors.text,
                    font: {
                        family: 'Inter, system-ui, sans-serif'
                    }
                }
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Título */}
            <div className={`${isDarkMode ? 'text-cyan-400' : 'text-ug-blue'}`}>
                <h1 className="text-3xl font-bold">Dashboard de Resultados</h1>
                <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Visualización de datos y estadísticas de encuestas de pertinencia
                </p>
            </div>

            {/* Tarjetas de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className={`shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Encuestas</p>
                            <h3 className={`text-3xl font-bold mt-2 ${isDarkMode ? 'text-cyan-400' : 'text-ug-blue'}`}>328</h3>
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-cyan-400/20' : 'bg-ug-blue/10'}`}>
                            <i className={`pi pi-chart-bar text-2xl ${isDarkMode ? 'text-cyan-400' : 'text-ug-blue'}`}></i>
                        </div>
                    </div>
                </Card>

                <Card className={`shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completadas</p>
                            <h3 className="text-3xl font-bold mt-2 text-emerald-500">245</h3>
                        </div>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-emerald-500/20">
                            <i className="pi pi-check-circle text-2xl text-emerald-500"></i>
                        </div>
                    </div>
                </Card>

                <Card className={`shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>En Progreso</p>
                            <h3 className="text-3xl font-bold mt-2 text-amber-500">58</h3>
                        </div>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-amber-500/20">
                            <i className="pi pi-clock text-2xl text-amber-500"></i>
                        </div>
                    </div>
                </Card>

                <Card className={`shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Participación</p>
                            <h3 className={`text-3xl font-bold mt-2 ${isDarkMode ? 'text-purple-400' : 'text-indigo-600'}`}>75%</h3>
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-purple-400/20' : 'bg-indigo-600/10'}`}>
                            <i className={`pi pi-users text-2xl ${isDarkMode ? 'text-purple-400' : 'text-indigo-600'}`}></i>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Gráfico de Dona */}
                <Card
                    title="Estado de Encuestas"
                    className={`shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200'}`}
                >
                    <div className="h-64">
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                </Card>

                {/* Gráfico de Barras */}
                <Card
                    title="Encuestas por Carrera"
                    className={`lg:col-span-2 shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200'}`}
                >
                    <div className="h-64">
                        <Bar data={barData} options={chartOptions} />
                    </div>
                </Card>
            </div>

            {/* Gráfico de Líneas */}
            <Card
                title="Tendencia Mensual"
                className={`shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200'}`}
            >
                <div className="h-80">
                    <Line data={lineData} options={chartOptions} />
                </div>
            </Card>
        </div>
    );
};
