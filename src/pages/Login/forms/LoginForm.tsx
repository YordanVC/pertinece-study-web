import { Controller } from 'react-hook-form';
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button as CustomButton } from '../../../components/Button/Button';
import logoSvg from '../../../assets/UgLettersOnly.svg';
import { TITULO_LOGIN } from '../../../utils/constants';

import type { FormEventHandler } from 'react';

export interface LoginFormData {
    username: string;
    password: string;
}

interface LoginFormProps {
    onSubmit: FormEventHandler<HTMLFormElement>;
    register: UseFormRegister<LoginFormData>;
    errors: FieldErrors<LoginFormData>;
    control: Control<LoginFormData>;
    inputClass: (hasError: boolean) => string;
    iconClass: string;
    isDarkMode: boolean;
    isRegisterActive: boolean;
}

export const LoginForm = ({
    onSubmit,
    register,
    errors,
    control,
    inputClass,
    iconClass,
    isDarkMode,
    isRegisterActive
}: LoginFormProps) => {
    return (
        <div className={`absolute w-1/2 h-full right-0 flex items-center text-center p-8.75 transition-all duration-600 ease-in-out will-change-transform z-1
            ${isRegisterActive ? 'delay-700 translate-x-[-200%]' : 'delay-700 translate-x-0'}
            max-[650px]:w-full! max-[650px]:h-[calc(100%-20svh)]! max-[650px]:p-6 max-[650px]:bottom-0 max-[650px]:right-0! max-[650px]:translate-x-0! max-[650px]:z-1!
            ${isRegisterActive ? 'max-[650px]:translate-y-[100svh]! max-[650px]:invisible! max-[650px]:delay-300!' : 'max-[650px]:translate-y-0! max-[650px]:visible! max-[650px]:delay-700!'}
            max-[400px]:h1p-5 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-[#333]'}`}>
            <form onSubmit={onSubmit} className="w-full p-2 scrollbar-none overflow-y-auto max-h-full">
                <h1 className='font-bold text-3xl mb-3 max-[400px]:text-2xl'>{TITULO_LOGIN}</h1>
                <div className="flex justify-center mb-4 max-[650px]:mb-[clamp(0.75rem,2vw,1.25rem)]">
                    <img src={logoSvg} alt="Universidad de Guayaquil" className="h-16 w-auto max-[650px]:h-[clamp(4rem,12vw,6rem)]" />
                </div>
                <h1 className="text-2xl mb-2 max-[650px]:text-[clamp(1.5rem,5vw,2rem)] max-[650px]:mb-[clamp(0.75rem,2vw,1.25rem)] mt-0 max-[400px]:text-xl">Iniciar sesión</h1>

                <div className="my-5 max-[650px]:my-5">
                    <div className="relative">
                        <InputText
                            type="text"
                            placeholder="Nombre de usuario"
                            className={inputClass(!!errors.username)}
                            {...register('username', { required: 'El nombre de usuario es requerido' })}
                        />
                        <i className={`pi pi-user ${iconClass}`}></i>
                    </div>
                    {errors.username && (
                        <small className="text-red-500 block text-left mt-1 text-sm">{errors.username.message}</small>
                    )}
                </div>

                <div className="my-4 max-[650px]:my-2">
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: 'La contraseña es requerida' }}
                        render={({ field, fieldState }) => (
                            <>
                                <div className="relative">
                                    <Password
                                        {...field}
                                        placeholder="Contraseña"
                                        toggleMask
                                        feedback={false}
                                        inputClassName={inputClass(!!fieldState.error)}
                                    />
                                </div>
                                {fieldState.error && (
                                    <small className="text-red-500 block text-left mt-1 text-sm">
                                        {fieldState.error.message}
                                    </small>
                                )}
                            </>
                        )}
                    />
                </div>
                <CustomButton type="submit" variant="primary" className="!w-full !h-12 !rounded-lg !shadow-[0_0_10px_rgba(0,0,0,0.1)]">
                    Acceso
                </CustomButton>
            </form>
        </div>
    );
};
