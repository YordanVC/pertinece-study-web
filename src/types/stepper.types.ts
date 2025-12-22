import type { ReactNode } from 'react';

export interface StepConfig {
    /** Etiqueta del paso que se muestra en el tab */
    label: string;
    
    /** Contenido del paso (componente a renderizar) */
    content: ReactNode;
    
    /** Función de validación que se ejecuta antes de avanzar al siguiente paso */
    onValidate?: () => boolean | Promise<boolean>;
    
    /** Si se puede regresar desde este paso (override del allowBackNavigation global) */
    canGoBack?: boolean;
    
    /** Icono opcional para el paso */
    icon?: string;
}

export interface StepperProps {
    /** Array de configuración de pasos */
    steps: StepConfig[];
    
    /** Permite navegación hacia atrás globalmente */
    allowBackNavigation?: boolean;
    
    /** Callback cuando se completa el último paso */
    onComplete?: () => void;
    
    /** Paso inicial (0-indexed) */
    initialStep?: number;
    
    /** Título del stepper */
    title?: string;
    
    /** Descripción del stepper */
    description?: string;

    
    /** Clase CSS adicional */
    className?: string;
    
    /** Texto del botón siguiente */
    nextButtonText?: string;
    
    /** Texto del botón anterior */
    previousButtonText?: string;
    
    /** Texto del botón finalizar */
    finishButtonText?: string;
}
