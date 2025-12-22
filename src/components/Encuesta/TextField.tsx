import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

interface TextFieldProps {
    /** Etiqueta del campo */
    label: string;

    /** Valor del campo */
    value: string;

    /** Callback cuando cambia el valor */
    onChange: (value: string) => void;

    /** Placeholder del campo */
    placeholder?: string;

    /** Número de filas (si es mayor a 1, se renderiza como textarea) */
    rows?: number;

    /** Permitir redimensionar el textarea */
    resizable?: boolean;

    /** Mostrar contador de palabras */
    showWordCount?: boolean;

    /** Límite máximo de palabras */
    maxWords?: number;

    /** Límite máximo de caracteres */
    maxLength?: number;

    /** Campo requerido */
    required?: boolean;

    /** Campo deshabilitado */
    disabled?: boolean;

    /** Texto de ayuda adicional */
    helperText?: string;

    /** Mensaje de error */
    error?: string;

    /** Clase CSS adicional */
    className?: string;
}

export const TextField = ({
    label,
    value,
    onChange,
    placeholder = '',
    rows = 1,
    resizable = false,
    showWordCount = true,
    maxWords,
    maxLength,
    required = false,
    disabled = false,
    helperText,
    error,
    className = ''
}: TextFieldProps) => {
    const { isDarkMode } = useTheme();
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);

    // Calcular palabras y caracteres
    useEffect(() => {
        const words = value.trim() === '' ? 0 : value.trim().split(/\s+/).length;
        setWordCount(words);
        setCharCount(value.length);
    }, [value]);

    // Manejar cambio de valor
    const handleChange = (newValue: string) => {
        // Validar límite de caracteres
        if (maxLength && newValue.length > maxLength) {
            return;
        }

        // Validar límite de palabras
        if (maxWords) {
            const words = newValue.trim() === '' ? 0 : newValue.trim().split(/\s+/).length;
            if (words > maxWords) {
                return;
            }
        }

        onChange(newValue);
    };

    // Verificar si hay error por límite de palabras
    const hasWordLimitError = maxWords && wordCount > maxWords;

    // Estilos base del input/textarea
    const inputBaseStyles = `
        w-full px-4 py-3 rounded-lg border-2 
        transition-all duration-200
        font-normal text-base
        focus:outline-none focus:ring-2
        ${disabled ? 'cursor-not-allowed opacity-60' : ''}
        ${!resizable && rows > 1 ? 'resize-none' : ''}
    `;

    // Estilos según el estado y tema
    const inputStateStyles = error || hasWordLimitError
        ? `border-red-500 focus:border-red-500 focus:ring-red-200 ${isDarkMode
            ? 'bg-gray-800 text-white placeholder-gray-500'
            : 'bg-white text-gray-900 placeholder-gray-400'
        }`
        : isDarkMode
            ? `bg-gray-800 text-white placeholder-gray-500 border-gray-600 
               focus:border-cyan-400 focus:ring-cyan-400/20
               hover:border-gray-500`
            : `bg-white text-gray-900 placeholder-gray-400 border-gray-300 
               focus:border-ug-blue focus:ring-ug-blue/20
               hover:border-gray-400`;

    const inputClasses = `${inputBaseStyles} ${inputStateStyles}`;

    // Estilos del label
    const labelClasses = `
        block mb-2 font-semibold text-sm
        ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}
        ${error || hasWordLimitError ? 'text-red-500 dark:text-red-400' : ''}
    `;

    // Estilos del contador
    const counterClasses = `
        text-xs font-medium
        ${hasWordLimitError
            ? 'text-red-500 dark:text-red-400'
            : isDarkMode
                ? 'text-gray-400'
                : 'text-gray-500'
        }
    `;

    return (
        <div className={`w-full ${className}`}>
            {/* Label */}
            <label className={labelClasses}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {/* Input o Textarea */}
            {rows > 1 ? (
                <InputTextarea
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder={placeholder}
                    rows={rows}
                    disabled={disabled}
                    maxLength={maxLength}
                    className={inputClasses}
                    aria-label={label}
                    aria-required={required}
                    aria-invalid={error || hasWordLimitError ? "true" : "false"}
                    autoResize={resizable}
                />
            ) : (
                <InputText
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    maxLength={maxLength}
                    className={inputClasses}
                    aria-label={label}
                    aria-required={required}
                    aria-invalid={error || hasWordLimitError ? "true" : "false"}
                />
            )}

            {/* Fila inferior: Helper text, error y contadores */}
            <div className="flex justify-between items-start mt-2 gap-2">
                {/* Helper text o error */}
                <div className="flex-1">
                    {error && (
                        <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
                            <i className="pi pi-exclamation-circle"></i>
                            {error}
                        </p>
                    )}
                    {!error && hasWordLimitError && (
                        <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
                            <i className="pi pi-exclamation-circle"></i>
                            Has excedido el límite de palabras
                        </p>
                    )}
                    {!error && !hasWordLimitError && helperText && (
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                            {helperText}
                        </p>
                    )}
                </div>

                {/* Contadores */}
                {showWordCount && (
                    <div className="flex flex-col items-end gap-1">
                        {/* Contador de palabras */}
                        <span className={counterClasses}>
                            {wordCount} {maxWords ? `/ ${maxWords}` : ''} palabra{wordCount !== 1 ? 's' : ''}
                        </span>

                        {/* Contador de caracteres (si hay límite) */}
                        {maxLength && (
                            <span className={counterClasses}>
                                {charCount} / {maxLength} caracteres
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
