import Lottie from 'lottie-react';
import { Button as CustomButton } from '../../components/Button/Button';
import loginSuccessAnimation from '../../assets/animations/login-success.json';

interface OverlayPanelProps {
    title: string;
    description: string;
    buttonText: string;
    onClick: () => void;
    isActive: boolean;
    position: 'left' | 'right';
}

export const OverlayPanel = ({ title, description, buttonText, onClick, isActive, position }: OverlayPanelProps) => {
    const isLeft = position === 'left';

    return (
        <div
            className={`absolute w-1/2 h-full ${isLeft ? 'left-0' : 'right-0'} text-white flex flex-col justify-center items-center z-[2] transition-transform duration-[600ms] ease-in-out pointer-events-auto will-change-transform bg-gradient-to-r from-ug-blue to-ug-blue-dark
                ${isLeft
                    ? isActive ? 'translate-x-[-200%] delay-300' : 'translate-x-0 delay-700'
                    : isActive ? 'translate-x-0 delay-700' : 'translate-x-[200%] delay-300'
                }
                max-[650px]:w-full! max-[650px]:h-[20svh]! max-[650px]:z-4! max-[650px]:translate-x-0! max-[650px]:${isLeft ? 'left-0 top-0!' : 'right-0 bottom-0!'}
                ${isLeft
                    ? isActive ? 'max-[650px]:translate-y-[-100%]! max-[650px]:delay-300!' : 'max-[650px]:translate-y-0! max-[650px]:delay-700!'
                    : isActive ? 'max-[650px]:translate-y-0! max-[650px]:delay-700!' : 'max-[650px]:translate-y-full! max-[650px]:delay-300!'
                }`}
        >
            <div className="mb-8 max-[650px]:mb-[clamp(0.25rem,1vw,0.5rem)] max-[400px]:hidden">
                <Lottie
                    animationData={loginSuccessAnimation}
                    loop={true}
                    className="w-48 h-48 max-[650px]:w-[clamp(4rem,12vw,7rem)] max-[650px]:h-[clamp(4rem,12vw,7rem)]"
                />
            </div>
            <h1 className="text-4xl font-semibold mb-4 max-[650px]:text-[clamp(1.25rem,4vw,1.5rem)] max-[650px]:mb-[clamp(0.25rem,1vw,0.5rem)] max-[400px]:mb-2">
                {title}
            </h1>
            <p className="text-sm mb-8 max-[650px]:text-[clamp(0.75rem,2.5vw,0.875rem)] max-[650px]:mb-[clamp(0.25rem,1vw,0.5rem)]">
                {description}
            </p>
            <CustomButton
                variant="secondary"
                className="!w-40 !h-12 !bg-transparent !border-2 !border-white !text-white hover:!bg-white hover:!text-ug-blue !shadow-none max-[650px]:!w-[clamp(8rem,30vw,10rem)] max-[650px]:!h-[clamp(2.75rem,10vw,3.25rem)] max-[650px]:!text-[clamp(0.875rem,3vw,1rem)] max-[650px]:!font-semibold"
                onClick={onClick}
            >
                {buttonText}
            </CustomButton>
        </div>
    );
};
