import { useTheme } from '../../context/ThemeContext';
import { Checkbox } from 'primereact/checkbox';

export interface CheckboxOption {
    /** Valor único de la opción */
    value: string;

    /** Etiqueta a mostrar */
    label: string;

    /** Texto de ayuda adicional para esta opción */
    helperText?: string;

    /** Deshabilitar esta opción específica */
    disabled?: boolean;
}

export interface CheckboxFieldProps {
    /** Etiqueta de la pregunta */
    label: string;

    /** Valores seleccionados actualmente */
    value: string[];

    /** Callback cuando cambia la selección */
    onChange: (values: string[]) => void;

    /** Opciones disponibles */
    options: CheckboxOption[];

    /** Campo requerido (al menos una opción debe estar seleccionada) */
    required?: boolean;

    /** Campo deshabilitado (todas las opciones) */
    disabled?: boolean;

    /** Texto de ayuda adicional para toda la pregunta */
    helperText?: string;

    /** Mensaje de error */
    error?: string;

    /** Clase CSS adicional */
    className?: string;

    /** Orientación de las opciones */
    orientation?: 'vertical' | 'horizontal';

    /** Número mínimo de opciones a seleccionar */
    minSelections?: number;

    /** Número máximo de opciones a seleccionar */
    maxSelections?: number;
}

export const CheckboxField = ({
    label,
    value,
    onChange,
    options,
    required = false,
    disabled = false,
    helperText,
    error,
    className = '',
    orientation = 'vertical',
    minSelections,
    maxSelections
}: CheckboxFieldProps) => {
    const { isDarkMode } = useTheme();

    // Manejar cambio de selección
    const handleChange = (optionValue: string, checked: boolean) => {
        let newValues: string[];

        if (checked) {
            // Verificar límite máximo
            if (maxSelections && value.length >= maxSelections) {
                return;
            }
            newValues = [...value, optionValue];
        } else {
            newValues = value.filter(v => v !== optionValue);
        }

        onChange(newValues);
    };

    // Verificar si hay error por límites
    const hasMinError = minSelections && value.length < minSelections;
    const hasMaxError = maxSelections && value.length > maxSelections;
    const hasLimitError = hasMinError || hasMaxError;

    // Estilos del label principal
    const labelClasses = `
        block mb-3 font-semibold text-base
        ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}
        ${error || hasLimitError ? 'text-red-500 dark:text-red-400' : ''}
    `;

    // Estilos del contenedor de opciones
    const optionsContainerClasses = `
        flex gap-4
        ${orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'}
    `;

    // Estilos para cada opción
    const getOptionClasses = (isDisabled: boolean, isSelected: boolean) => `
        flex items-start gap-3 p-4 rounded-lg border-2 
        transition-all duration-200 cursor-pointer
        ${isDisabled ? 'cursor-not-allowed opacity-50' : 'hover:shadow-md'}
        ${isSelected
            ? isDarkMode
                ? 'border-cyan-400 bg-cyan-400/10'
                : 'border-ug-blue bg-ug-blue/5'
            : isDarkMode
                ? 'border-gray-600 bg-gray-800 hover:border-gray-500'
                : 'border-gray-300 bg-white hover:border-gray-400'
        }
    `;

    // Estilos del texto de la opción
    const getOptionTextClasses = (isDisabled: boolean) => `
        flex-1
        ${isDisabled
            ? isDarkMode ? 'text-gray-500' : 'text-gray-400'
            : isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }
    `;

    // Estilos del helper text de la opción
    const optionHelperClasses = `
        text-xs mt-1
        ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
    `;

    // Generar mensaje de contador
    const getCounterMessage = () => {
        if (minSelections && maxSelections) {
            return `${value.length} de ${minSelections}-${maxSelections} seleccionadas`;
        } else if (minSelections) {
            return `${value.length} seleccionadas (mínimo ${minSelections})`;
        } else if (maxSelections) {
            return `${value.length} de ${maxSelections} seleccionadas`;
        }
        return `${value.length} seleccionadas`;
    };

    return (
        <div className={`w-full ${className}`}>
            {/* Label principal */}
            <div className="flex justify-between items-start mb-3">
                <label className={labelClasses}>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {/* Contador de selecciones */}
                {(minSelections || maxSelections) && (
                    <span className={`
                        text-xs font-medium
                        ${hasLimitError
                            ? 'text-red-500 dark:text-red-400'
                            : isDarkMode
                                ? 'text-gray-400'
                                : 'text-gray-500'
                        }
                    `}>
                        {getCounterMessage()}
                    </span>
                )}
            </div>

            {/* Helper text de la pregunta */}
            {helperText && !error && !hasLimitError && (
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {helperText}
                </p>
            )}

            {/* Mensaje de error */}
            {error && (
                <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1 mb-3">
                    <i className="pi pi-exclamation-circle"></i>
                    {error}
                </p>
            )}

            {/* Mensaje de error por límites */}
            {!error && hasMinError && (
                <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1 mb-3">
                    <i className="pi pi-exclamation-circle"></i>
                    Debes seleccionar al menos {minSelections} opción{minSelections !== 1 ? 'es' : ''}
                </p>
            )}

            {!error && hasMaxError && (
                <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1 mb-3">
                    <i className="pi pi-exclamation-circle"></i>
                    No puedes seleccionar más de {maxSelections} opción{maxSelections !== 1 ? 'es' : ''}
                </p>
            )}

            {/* Opciones */}
            <div className={optionsContainerClasses}>
                {options.map((option) => {
                    const isSelected = value.includes(option.value);
                    const isDisabled = !!(disabled || option.disabled ||
                        (maxSelections && !isSelected && value.length >= maxSelections));
                    const optionId = `checkbox-${option.value}`;

                    return (
                        <div
                            key={option.value}
                            className={getOptionClasses(isDisabled, isSelected)}
                            onClick={() => {
                                if (!isDisabled) {
                                    handleChange(option.value, !isSelected);
                                }
                            }}
                        >
                            {/* Checkbox de PrimeReact */}
                            <Checkbox
                                inputId={optionId}
                                name={label}
                                value={option.value}
                                onChange={(e) => handleChange(option.value, e.checked ?? false)}
                                checked={isSelected}
                                disabled={isDisabled}
                                className="mt-0.5"
                                pt={{
                                    root: {
                                        className: 'flex-shrink-0'
                                    },
                                    box: {
                                        className: `
                                            ${isSelected
                                                ? isDarkMode
                                                    ? 'border-cyan-400 bg-cyan-400'
                                                    : 'border-ug-blue bg-ug-blue'
                                                : isDarkMode
                                                    ? 'border-gray-500 bg-gray-700'
                                                    : 'border-gray-400 bg-white'
                                            }
                                            ${!isDisabled && 'hover:border-opacity-80'}
                                        `
                                    },
                                    icon: {
                                        className: isSelected
                                            ? 'text-white'
                                            : ''
                                    }
                                }}
                            />

                            {/* Texto de la opción */}
                            <label
                                htmlFor={optionId}
                                className={`${getOptionTextClasses(isDisabled)} cursor-pointer`}
                            >
                                <div className="font-medium">
                                    {option.label}
                                </div>
                                {option.helperText && (
                                    <div className={optionHelperClasses}>
                                        {option.helperText}
                                    </div>
                                )}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
