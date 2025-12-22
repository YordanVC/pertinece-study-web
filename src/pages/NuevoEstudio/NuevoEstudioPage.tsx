import { Stepper } from '../../components/Stepper/Stepper';
import type { StepConfig } from '../../types/stepper.types';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { STANDARDIZATION_DESCRIPTION } from '../../utils/constants';
import { useState } from 'react';
import { Editor } from 'primereact/editor';
import { useTheme } from '../../context/ThemeContext';

export const NuevoEstudioPage = () => {
    const [contextoInternacional, setContextoInternacional] = useState('');

    const { showSuccess, showError, showWarn } = useToast();
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const letterTitleColor = isDarkMode ? 'text-gray-200' : 'text-gray-700';
    // Definir los pasos del wizard
    const steps: StepConfig[] = [
        {
            label: 'Información General',
            icon: 'pi-info-circle',
            content: (
                <div className="space-y-6">
                    <h2 className={`text-xl font-semibold ${letterTitleColor} mb-4`}>
                        Información Inicial del Estudio
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <p className="text-gray-600 dark:text-gray-300">
                            Aquí irá el formulario de información inicial...
                        </p>
                        {/* Aquí agregarás tus campos de formulario */}
                    </div>
                </div>
            ),
            onValidate: () => {
                // Simular validación
                showWarn('Validando información general...');
                return true;
            }
        },
        {
            label: 'Estandarización',
            icon: 'pi-cog',
            content: (
                <div className="space-y-6">
                    <h2 className={`text-xl font-semibold ${letterTitleColor} mb-4`}>
                        Contexto internacional
                    </h2>
                    {/* Editor de PrimeReact */}
                    <Editor
                        value={contextoInternacional}
                        onTextChange={(e) => setContextoInternacional(e.htmlValue || '')}
                        style={{ height: '320px' }}
                        className={`${isDarkMode ? 'dark-editor' : ''}`}
                        placeholder="Problemas o necesidades en áreas como tecnología, sostenibilidad, salud, educación, economía, entre otros, que afectan a varios países y demandan profesionales especializados."
                    />
                </div>
            ),
            onValidate: async () => {
                if (contextoInternacional.trim() === '') {
                    showError('El campo de contexto internacional es obligatorio.');
                    return false;
                }
                return true;
            }
        },
        {
            label: 'Configuración',
            icon: 'pi-sliders-h',
            content: (
                <div className="space-y-6">
                    <h2 className={`text-xl font-semibold ${letterTitleColor} mb-4`}>
                        Configuración del Estudio
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <p className="text-gray-600 dark:text-gray-300">
                            Aquí irá la configuración adicional...
                        </p>
                        {/* Aquí agregarás campos de configuración */}
                    </div>
                </div>
            ),
            canGoBack: true
        },
        {
            label: 'Configuración',
            icon: 'pi-sliders-h',
            content: (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        Configuración del Estudio
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <p className="text-gray-600 dark:text-gray-300">
                            Aquí irá la configuración adicional...
                        </p>
                        {/* Aquí agregarás campos de configuración */}
                    </div>
                </div>
            ),
            canGoBack: true
        },
        {
            label: 'Configuración',
            icon: 'pi-sliders-h',
            content: (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        Configuración del Estudio
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <p className="text-gray-600 dark:text-gray-300">
                            Aquí irá la configuración adicional...
                        </p>
                        {/* Aquí agregarás campos de configuración */}
                    </div>
                </div>
            ),
            canGoBack: true
        },
        {
            label: 'Configuración',
            icon: 'pi-sliders-h',
            content: (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        Configuración del Estudio
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <p className="text-gray-600 dark:text-gray-300">
                            Aquí irá la configuración adicional...
                        </p>
                        {/* Aquí agregarás campos de configuración */}
                    </div>
                </div>
            ),
            canGoBack: true
        },
        {
            label: 'Configuración',
            icon: 'pi-sliders-h',
            content: (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        Configuración del Estudio
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <p className="text-gray-600 dark:text-gray-300">
                            Aquí irá la configuración adicional...
                        </p>
                        {/* Aquí agregarás campos de configuración */}
                    </div>
                </div>
            ),
            canGoBack: true
        },
        {
            label: 'Configuración',
            icon: 'pi-sliders-h',
            content: (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        Configuración del Estudio
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <p className="text-gray-600 dark:text-gray-300">
                            Aquí irá la configuración adicional...
                        </p>
                        {/* Aquí agregarás campos de configuración */}
                    </div>
                </div>
            ),
            canGoBack: true
        },
        {
            label: 'Configuración',
            icon: 'pi-sliders-h',
            content: (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        Configuración del Estudio
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <p className="text-gray-600 dark:text-gray-300">
                            Aquí irá la configuración adicional...
                        </p>
                        {/* Aquí agregarás campos de configuración */}
                    </div>
                </div>
            ),
            canGoBack: true
        },
        {
            label: 'Revisión',
            icon: 'pi-eye',
            content: (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        Revisión Final
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Revisa toda la información antes de finalizar...
                        </p>

                        {/* Resumen de la información */}
                        <div className="space-y-4">
                            <div className="border-l-4 border-ug-blue pl-4">
                                <h3 className="font-semibold text-gray-800 dark:text-white">Información General</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Datos completados ✓</p>
                            </div>

                            <div className="border-l-4 border-green-500 pl-4">
                                <h3 className="font-semibold text-gray-800 dark:text-white">Estandarización</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Configuración completada ✓</p>
                            </div>

                            <div className="border-l-4 border-yellow-500 pl-4">
                                <h3 className="font-semibold text-gray-800 dark:text-white">Configuración</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Parámetros establecidos ✓</p>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            canGoBack: true
        }
    ];

    // Manejar la finalización del wizard
    const handleComplete = () => {
        showSuccess('¡Estudio creado exitosamente!');
        // Aquí guardarías la información y navegarías a otra página
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <div className="h-full">
            <Stepper
                steps={steps}
                title="Estandarización del Estudio de Pertinencia"
                description={STANDARDIZATION_DESCRIPTION}
                allowBackNavigation={true}
                onComplete={handleComplete}
                nextButtonText="Siguiente"
                previousButtonText="Anterior"
                finishButtonText="Crear Estudio"
            />
        </div>
    );
};
