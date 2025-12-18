import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
    message: string;
    className?: string;
}

export const Tooltip = ({ message, className = '' }: TooltipProps) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updatePosition = () => {
            if (containerRef.current) {
                const parent = containerRef.current.parentElement;
                if (parent) {
                    const rect = parent.getBoundingClientRect();
                    setPosition({
                        top: rect.top + rect.height / 2,
                        left: rect.right + 8
                    });
                }
            }
        };

        const parent = containerRef.current?.parentElement;
        if (parent) {
            parent.addEventListener('mouseenter', () => {
                updatePosition();
                setIsVisible(true);
            });
            parent.addEventListener('mouseleave', () => {
                setIsVisible(false);
            });

            updatePosition();
            window.addEventListener('scroll', updatePosition);
            window.addEventListener('resize', updatePosition);
        }

        return () => {
            window.removeEventListener('scroll', updatePosition);
            window.removeEventListener('resize', updatePosition);
        };
    }, []);

    return (
        <>
            <div ref={containerRef} className="hidden lg:block" />
            {createPortal(
                <div
                    className={`hidden lg:block fixed z-[9999] pointer-events-none transition-all duration-200 ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'} ${className}`}
                    style={{
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                        transform: 'translateY(-50%)'
                    }}
                >
                    <div className="bg-ug-blue text-white px-3 py-2 rounded-lg shadow-xl whitespace-nowrap text-sm font-medium relative">
                        {message}
                        {/* Flecha del tooltip */}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[6px] border-r-ug-blue border-b-[6px] border-b-transparent" />
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};
