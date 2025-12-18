interface TooltipProps {
    message: string;
    className?: string;
}

export const Tooltip = ({ message, className = '' }: TooltipProps) => {
    return (
        <div className={`hidden lg:block fixed ml-2 top-1/2 -translate-y-1/2 z-[100]
            opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible
            transition-all duration-200 pointer-events-none ${className}`}
            style={{ left: '96px' }}>
            <div className="bg-ug-blue text-white px-3 py-2 rounded-lg shadow-xl whitespace-nowrap
                text-sm font-medium relative">
                {message}
                {/* Flecha del tooltip */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 
                    w-0 h-0 border-t-[6px] border-t-transparent 
                    border-r-[6px] border-r-ug-blue 
                    border-b-[6px] border-b-transparent">
                </div>
            </div>
        </div>
    );
};
