import { useState } from 'react';
import type { StepperProps } from '../../types/stepper.types';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../Button/Button';

export const Stepper = ({
    steps,
    allowBackNavigation = true,
    onComplete,
    initialStep = 0,
    title,
    description,
    className = '',
    nextButtonText = 'Siguiente',
    previousButtonText = 'Anterior',
    finishButtonText = 'Finalizar'
}: StepperProps) => {
    const { isDarkMode } = useTheme();
    const [currentStep, setCurrentStep] = useState(initialStep);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
    const [isValidating, setIsValidating] = useState(false);

    const isLastStep = currentStep === steps.length - 1;
    const isFirstStep = currentStep === 0;

    // Determinar si se puede navegar hacia atrás
    const canNavigateBack = () => {
        if (isFirstStep) return false;
        const currentStepConfig = steps[currentStep];
        // Si el paso actual tiene canGoBack definido, usarlo, sino usar el global
        return currentStepConfig.canGoBack !== undefined
            ? currentStepConfig.canGoBack
            : allowBackNavigation;
    };

    // Navegar a un paso específico
    const goToStep = (stepIndex: number) => {
        if (stepIndex < 0 || stepIndex >= steps.length) return;

        // Solo permitir navegar a pasos ya completados o al paso siguiente inmediato
        if (stepIndex < currentStep) {
            // Navegación hacia atrás
            if (canNavigateBack()) {
                setCurrentStep(stepIndex);
            }
        } else if (stepIndex === currentStep + 1) {
            // Avanzar al siguiente paso (debe usar nextStep con validación)
            nextStep();
        } else if (completedSteps.has(stepIndex)) {
            // Navegar a un paso ya completado
            setCurrentStep(stepIndex);
        }
    };

    // Avanzar al siguiente paso
    const nextStep = async () => {
        const currentStepConfig = steps[currentStep];

        // Validar el paso actual si tiene función de validación
        if (currentStepConfig.onValidate) {
            setIsValidating(true);
            try {
                const isValid = await currentStepConfig.onValidate();
                if (!isValid) {
                    setIsValidating(false);
                    return;
                }
            } catch (error) {
                console.error('Error en validación:', error);
                setIsValidating(false);
                return;
            }
            setIsValidating(false);
        }

        // Marcar el paso actual como completado
        setCompletedSteps(prev => new Set(prev).add(currentStep));

        // Si es el último paso, ejecutar onComplete
        if (isLastStep) {
            onComplete?.();
        } else {
            // Avanzar al siguiente paso
            setCurrentStep(prev => prev + 1);
        }
    };

    // Retroceder al paso anterior
    const previousStep = () => {
        if (canNavigateBack() && currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    // Determinar el estado de un paso (pending, active, completed)
    const getStepStatus = (stepIndex: number): 'pending' | 'active' | 'completed' => {
        if (stepIndex === currentStep) return 'active';
        if (completedSteps.has(stepIndex)) return 'completed';
        return 'pending';
    };

    // Estilos para cada estado del paso
    const getStepStyles = (stepIndex: number) => {
        const status = getStepStatus(stepIndex);
        const baseStyles = 'transition-all duration-300 cursor-pointer';

        if (status === 'active') {
            return `${baseStyles} ${isDarkMode
                ? 'bg-ug-blue text-white border-ug-blue shadow-[0_2px_8px_rgba(0,93,164,0.4)]'
                : 'bg-ug-blue text-white border-ug-blue shadow-[0_2px_8px_rgba(0,93,164,0.3)]'
                }`;
        }

        if (status === 'completed') {
            return `${baseStyles} ${isDarkMode
                ? 'bg-green-600 text-white border-green-600 hover:bg-green-700'
                : 'bg-green-500 text-white border-green-500 hover:bg-green-600'
                }`;
        }

        // pending
        return `${baseStyles} ${isDarkMode
            ? 'bg-gray-700 text-gray-400 border-gray-600 hover:bg-gray-600'
            : 'bg-gray-200 text-gray-600 border-gray-300 hover:bg-gray-300'
            }`;
    };

    return (
        <div className={`flex flex-col h-full ${className}`}>
            {/* Título */}
            {title && (
                <>
                    <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'
                            }`}>
                            {title}
                        </h1>
                    </div>
                    {/* Descripcion */}
                    {description && (
                        <p className={`px-6 py-2 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            {description}
                        </p>
                    )}
                </>
            )}

            {/* Tabs de pasos */}
            <div className={`px-4 sm:px-6 py-4 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                }`}>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    {steps.map((step, index) => {
                        const status = getStepStatus(index);
                        const isClickable = status === 'completed' ||
                            (status === 'active' && canNavigateBack()) ||
                            index < currentStep;

                        return (
                            <button
                                key={index}
                                onClick={() => isClickable && goToStep(index)}
                                disabled={!isClickable && status === 'pending'}
                                className={`
                                    flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 
                                    rounded-lg border-2 font-medium text-sm sm:text-base
                                    ${getStepStyles(index)}
                                    ${!isClickable && status === 'pending' ? 'cursor-not-allowed opacity-60' : ''}
                                `}
                            >
                                {/* Número o icono del paso */}
                                <span className={`
                                    flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold
                                    ${status === 'active'
                                        ? 'bg-white text-ug-blue'
                                        : status === 'completed'
                                            ? 'bg-white text-green-600'
                                            : isDarkMode
                                                ? 'bg-gray-600 text-gray-300'
                                                : 'bg-gray-300 text-gray-600'
                                    }
                                `}>
                                    {status === 'completed' ? (
                                        <i className="pi pi-check"></i>
                                    ) : step.icon ? (
                                        <i className={`pi ${step.icon} text-xs`}></i>
                                    ) : (
                                        index + 1
                                    )}
                                </span>

                                {/* Label del paso */}
                                <span className="hidden sm:inline">{step.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Contenido del paso actual */}
            <div className={`flex-1 overflow-auto px-4 sm:px-6 py-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                }`}>
                <div className="max-w-6xl mx-auto">
                    {steps[currentStep]?.content}
                </div>
            </div>

            {/* Botones de navegación */}
            <div className={`px-4 sm:px-6 py-4 border-t ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                }`}>
                <div className="flex justify-between items-center gap-3">
                    {/* Botón anterior */}
                    <Button
                        variant="secondary"
                        onClick={previousStep}
                        disabled={!canNavigateBack() || isFirstStep}
                        className="w-auto"
                        icon="pi-arrow-left"
                        isDarkMode={isDarkMode}
                    >
                        {previousButtonText}
                    </Button>

                    {/* Indicador de progreso */}
                    <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        Paso {currentStep + 1} de {steps.length}
                    </div>

                    {/* Botón siguiente/finalizar */}
                    <Button
                        variant={isLastStep ? "success" : "primary"}
                        onClick={nextStep}
                        loading={isValidating}
                        disabled={isValidating}
                        className="w-auto"
                        icon={isLastStep ? "pi-check" : "pi-arrow-right"}
                    >
                        {isLastStep ? finishButtonText : nextButtonText}
                    </Button>
                </div>
            </div>
        </div>
    );
};
