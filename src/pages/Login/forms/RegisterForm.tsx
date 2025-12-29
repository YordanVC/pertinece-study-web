import { Controller } from 'react-hook-form';
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button as CustomButton } from '../../../components/Button/Button';
import logoSvg from '../../../assets/UgLettersOnly.svg';
import { TITULO_LOGIN } from '../../../utils/constants';

import type { FormEventHandler } from 'react';

export interface RegisterFormData {
    username: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
}

interface RegisterFormProps {
    onSubmit: FormEventHandler<HTMLFormElement>;
    register: UseFormRegister<RegisterFormData>;
    errors: FieldErrors<RegisterFormData>;
    control: Control<RegisterFormData>;
    inputClass: (hasError: boolean) => string;
    iconClass: string;
    isDarkMode: boolean;
    isRegisterActive: boolean;
}

export const RegisterForm = ({
    onSubmit,
    register,
    errors,
    control,
    inputClass,
    iconClass,
    isDarkMode,
    isRegisterActive
}: RegisterFormProps) => {
    return (
        <div className={`absolute w-1/2 h-full left-0 flex items-center text-center p-[35px] transition-all duration-[600ms] ease-in-out will-change-transform z-[1]
            ${isRegisterActive ? 'opacity-100 translate-x-0 delay-[700ms]' : 'opacity-0 translate-x-[200%] delay-[300ms]'}
            max-[650px]:!w-full max-[650px]:!h-[calc(100%-20svh)] max-[650px]:p-4 max-[650px]:!right-0 max-[650px]:!left-auto max-[650px]:!pb-6 max-[650px]:top-0 max-[650px]:!translate-x-0
            ${isRegisterActive ? 'max-[650px]:!opacity-100 max-[650px]:!translate-y-0 max-[650px]:!delay-[700ms]' : 'max-[650px]:!opacity-0 max-[650px]:!translate-y-[-100svh] max-[650px]:!delay-[300ms]'}
            max-[400px]:p-3 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-[#333]'}`}>
            <form onSubmit={onSubmit} className="w-full p-2 overflow-y-auto max-h-full scrollbar-none">
                <h1 className='font-bold text-3xl mb-3 max-[400px]:text-2xl'>{TITULO_LOGIN}</h1>
                <div className="flex justify-center mb-4 max-[650px]:mb-[clamp(0.5rem,1.5vw,1rem)]">
                    <img src={logoSvg} alt="Universidad de Guayaquil" className="h-16 w-auto max-[650px]:h-[clamp(3.5rem,10vw,5rem)]" />
                </div>
                <h1 className="text-2xl mb-2 max-[650px]:text-[clamp(1.5rem,5vw,2rem)] max-[400px]:text-[30px]">Registro</h1>

                <div className="my-4 max-[650px]:my-2">
                    <div className="relative">
                        <InputText
                            type="text"
                            placeholder="Usuario"
                            className={inputClass(!!errors.username)}
                            {...register('username', { required: 'El usuario es requerido' })}
                        />
                        <i className={`pi pi-user ${iconClass}`}></i>
                    </div>
                    {errors.username && (
                        <small className="text-red-500 block text-left mt-1 text-sm">{errors.username.message}</small>
                    )}
                </div>

                <div className="my-4 max-[650px]:my-2">
                    <div className="relative">
                        <InputText
                            type="text"
                            placeholder="Nombres"
                            className={inputClass(!!errors.name)}
                            {...register('name', { required: 'El nombre es requerido' })}
                        />
                        <i className={`pi pi-id-card ${iconClass}`}></i>
                    </div>
                    {errors.name && (
                        <small className="text-red-500 block text-left mt-1 text-sm">{errors.name.message}</small>
                    )}
                </div>

                <div className="my-4 max-[650px]:my-2">
                    <div className="relative">
                        <InputText
                            type="text"
                            placeholder="Apellidos"
                            className={inputClass(!!errors.lastname)}
                            {...register('lastname', { required: 'El apellido es requerido' })}
                        />
                        <i className={`pi pi-id-card ${iconClass}`}></i>
                    </div>
                    {errors.lastname && (
                        <small className="text-red-500 block text-left mt-1 text-sm">{errors.lastname.message}</small>
                    )}
                </div>

                <div className="my-4 max-[650px]:my-2">
                    <div className="relative">
                        <InputText
                            type="email"
                            placeholder="Correo electrónico"
                            className={inputClass(!!errors.email)}
                            {...register('email', {
                                required: 'El correo es requerido',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Correo electrónico inválido'
                                }
                            })}
                        />
                        <i className={`pi pi-envelope ${iconClass}`}></i>
                    </div>
                    {errors.email && (
                        <small className="text-red-500 block text-left mt-1 text-sm">{errors.email.message}</small>
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

                <CustomButton type="submit" variant="primary" className="!w-full !h-12 !rounded-lg !shadow-[0_0_10px_rgba(0,0,0,0.1)] max-[650px]:!bg-white max-[650px]:!text-ug-blue max-[650px]:!border-2 max-[650px]:!border-ug-blue max-[650px]:mb-4 max-[650px]:!h-14 max-[650px]:!text-base">
                    Registro
                </CustomButton>
            </form>
        </div>
    );
};
