import './Toggle.css';

interface ToggleProps {
    checked: boolean;
    onChange: (value: boolean) => void;
    checkedIcon?: string;
    uncheckedIcon?: string;
    checkedLabel?: string;
    uncheckedLabel?: string;
    checkedBgColor?: string;
    uncheckedBgColor?: string;
    checkedIconColor?: string;
    uncheckedIconColor?: string;
    className?: string;
    disabled?: boolean;
}

export const Toggle = ({
    checked,
    onChange,
    checkedIcon = 'pi-moon',
    uncheckedIcon = 'pi-sun',
    checkedLabel,
    uncheckedLabel,
    checkedBgColor = 'from-indigo-500 to-purple-600',
    uncheckedBgColor = 'from-yellow-400 to-orange-400',
    checkedIconColor = 'text-indigo-600',
    uncheckedIconColor = 'text-orange-500',
    className = '',
    disabled = false
}: ToggleProps) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {/* Label cuando está desactivado */}
            {uncheckedLabel && !checked && (
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {uncheckedLabel}
                </span>
            )}

            {/* Toggle Switch personalizado */}
            <button
                onClick={() => !disabled && onChange(!checked)}
                disabled={disabled}
                className={`
                    relative w-16 h-8 rounded-full transition-all duration-300
                    ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg active:scale-95'}
                    bg-gradient-to-r ${checked ? checkedBgColor : uncheckedBgColor}
                `}
                aria-label="Toggle"
            >
                {/* Botón deslizante */}
                <div className={`
                    absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg 
                    transition-all duration-300 transform
                    flex items-center justify-center
                    ${checked ? 'left-9' : 'left-1'}
                `}>
                    <i className={`pi ${checked ? checkedIcon : uncheckedIcon} ${checked ? checkedIconColor : uncheckedIconColor
                        } text-xs`}></i>
                </div>
            </button>

            {/* Label cuando está activado */}
            {checkedLabel && checked && (
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {checkedLabel}
                </span>
            )}
        </div>
    );
};

