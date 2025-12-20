import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button as CustomButton } from '../../components/Button/Button';
import { OverlayPanel } from './OverlayPanel';
import bgImage from '../../assets/bg-3.jpg';
import logoSvg from '../../assets/UgLettersOnly.svg';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Toggle } from '../../components/Toggle/Toggle';
import { useToast } from '../../context/ToastContext';

interface LoginFormData {
    username: string;
    password: string;
}

interface RegisterFormData {
    username: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
}

const LoginPage = () => {
    const [isRegisterActive, setIsRegisterActive] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const { isDarkMode, toggleTheme } = useTheme();

    // React Hook Forms para Login
    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: errorsLogin },
        control: controlLogin,
    } = useForm<LoginFormData>({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    // React Hook Forms para Registro
    const {
        register: registerSignup,
        handleSubmit: handleSubmitSignup,
        formState: { errors: errorsSignup },
        control: controlSignup,
    } = useForm<RegisterFormData>({
        defaultValues: {
            username: '',
            name: '',
            lastname: '',
            email: '',
            password: ''
        }
    });

    const onLogin = async (data: LoginFormData) => {
        console.log('Login data:', data);
        navigate('/');
        toast.showSuccess('Sesión iniciada', 'Has iniciado sesión correctamente.');
        setTimeout(() => toast.showError('Sesión iniciada', 'Has iniciado sesión correctamente.'), 3000);
        setTimeout(() => toast.showWarn('Sesión iniciada', 'Has iniciado sesión correctamente.'), 4000);
        // Aquí irá la lógica de autenticación
    };

    const onRegister = async (data: RegisterFormData) => {
        console.log('Register data:', data);
        // Aquí irá la lógica de registro
    };

    // Estilos dinámicos para inputs según el tema
    const inputClass = (hasError: boolean) => {
        const baseClasses = 'w-full p-[13px_50px_13px_20px] rounded-lg border-none text-base font-medium placeholder:font-normal transition-none';
        const themeClasses = isDarkMode
            ? 'bg-gray-700 text-gray-100 placeholder:text-gray-400'
            : 'bg-[#f0f0f0] text-[#333] placeholder:text-[#888]';
        const errorClass = hasError ? 'border-red-500' : '';
        return `${baseClasses} ${themeClasses} ${errorClass}`;
    };

    const iconClass = `absolute right-5 top-1/2 -translate-y-1/2 text-xl transition-none ${isDarkMode ? 'text-gray-300' : 'text-[#333]'}`;

    return (
        <div
            className={`min-h-screen w-full flex justify-center items-center p-5 fixed inset-0 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : ''}`}
            style={{
                backgroundImage: isDarkMode ? 'none' : `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Toggle de tema en la esquina superior derecha */}
            <div className="absolute top-4 right-4 z-50">
                <Toggle
                    checked={isDarkMode}
                    onChange={toggleTheme}
                    checkedIcon="pi-moon"
                    uncheckedIcon="pi-sun"
                    checkedBgColor="from-indigo-400 to-indigo-600"
                    uncheckedBgColor="from-yellow-400 to-yellow-600"
                    checkedIconColor="text-blue-800"
                    uncheckedIconColor="text-green-800"
                />
            </div>

            {/*Container*/}
            <div
                key={`login-container-${isDarkMode}`}
                className={`relative w-[950px] h-[680px] rounded-[30px] shadow-[0_0_30px_rgba(0,0,0,0.2)] overflow-hidden max-w-full contain-layout
                max-[650px]:w-[min(92vw,500px)] max-[650px]:h-[min(90svh,700px)] ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>

                {/*------------------------FORM LOGIN-----------------------------------*/}
                <div className={`absolute w-1/2 h-full right-0 flex items-center text-center p-8.75 transition-all duration-600 ease-in-out will-change-transform z-1
                    ${isRegisterActive ? 'delay-700 translate-x-[-200%]' : 'delay-700 translate-x-0'}
                    max-[650px]:w-full! max-[650px]:h-[calc(100%-20svh)]! max-[650px]:p-6 max-[650px]:bottom-0 max-[650px]:right-0! max-[650px]:translate-x-0! max-[650px]:z-1!
                    ${isRegisterActive ? 'max-[650px]:translate-y-[100svh]! max-[650px]:invisible! max-[650px]:delay-300!' : 'max-[650px]:translate-y-0! max-[650px]:visible! max-[650px]:delay-700!'}
                    max-[400px]:h1p-5 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-[#333]'}`}>
                    <form onSubmit={handleSubmitLogin(onLogin)} className="w-full p-2 scrollbar-none overflow-y-auto max-h-full">
                        <h1 className='font-bold text-3xl mb-3 max-[400px]:text-2xl'>SISTEMA DE ESTUDIO DE PERTINENCIA</h1>
                        <div className="flex justify-center mb-4 max-[650px]:mb-[clamp(0.75rem,2vw,1.25rem)]">
                            <img src={logoSvg} alt="Universidad de Guayaquil" className="h-16 w-auto max-[650px]:h-[clamp(4rem,12vw,6rem)]" />
                        </div>
                        <h1 className="text-2xl mb-2 max-[650px]:text-[clamp(1.5rem,5vw,2rem)] max-[650px]:mb-[clamp(0.75rem,2vw,1.25rem)] mt-0 max-[400px]:text-xl">Iniciar sesión</h1>

                        <div className="relative my-5 max-[650px]:my-5">
                            <InputText
                                type="text"
                                placeholder="Nombre de usuario"
                                className={inputClass(!!errorsLogin.username)}
                                {...registerLogin('username', { required: 'El nombre de usuario es requerido' })}
                            />
                            <i className={`pi pi-user ${iconClass}`}></i>
                            {errorsLogin.username && (
                                <small className="text-red-500 block text-left mt-1 text-sm">{errorsLogin.username.message}</small>
                            )}
                        </div>

                        <div className="relative my-4 max-[650px]:my-2">
                            <Controller
                                name="password"
                                control={controlLogin}
                                rules={{ required: 'La contraseña es requerida' }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Password
                                            {...field}
                                            placeholder="Contraseña"
                                            toggleMask
                                            feedback={false}
                                            inputClassName={inputClass(!!fieldState.error)}
                                        />
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

                {/*------------------------FORM REGISTRO-----------------------------------*/}
                <div className={`absolute w-1/2 h-full left-0 flex items-center text-center p-[35px] transition-all duration-[600ms] ease-in-out will-change-transform z-[1]
                    ${isRegisterActive ? 'opacity-100 translate-x-0 delay-[700ms]' : 'opacity-0 translate-x-[200%] delay-[300ms]'}
                    max-[650px]:!w-full max-[650px]:!h-[calc(100%-20svh)] max-[650px]:p-4 max-[650px]:!right-0 max-[650px]:!left-auto max-[650px]:!pb-6 max-[650px]:top-0 max-[650px]:!translate-x-0
                    ${isRegisterActive ? 'max-[650px]:!opacity-100 max-[650px]:!translate-y-0 max-[650px]:!delay-[700ms]' : 'max-[650px]:!opacity-0 max-[650px]:!translate-y-[-100svh] max-[650px]:!delay-[300ms]'}
                    max-[400px]:p-3 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-[#333]'}`}>
                    <form onSubmit={handleSubmitSignup(onRegister)} className="w-full p-2 overflow-y-auto max-h-full scrollbar-none">
                        <h1 className='font-bold text-3xl mb-3 max-[400px]:text-2xl'>SISTEMA DE ESTUDIO DE PERTINENCIA</h1>
                        <div className="flex justify-center mb-4 max-[650px]:mb-[clamp(0.5rem,1.5vw,1rem)]">
                            <img src={logoSvg} alt="Universidad de Guayaquil" className="h-16 w-auto max-[650px]:h-[clamp(3.5rem,10vw,5rem)]" />
                        </div>
                        <h1 className="text-2xl mb-2 max-[650px]:text-[clamp(1.5rem,5vw,2rem)] max-[400px]:text-[30px]">Registro</h1>

                        <div className="relative my-4 max-[650px]:my-2">
                            <InputText
                                type="text"
                                placeholder="Usuario"
                                className={inputClass(!!errorsSignup.username)}
                                {...registerSignup('username', { required: 'El usuario es requerido' })}
                            />
                            <i className={`pi pi-user ${iconClass}`}></i>
                            {errorsSignup.username && (
                                <small className="text-red-500 block text-left mt-1 text-sm">{errorsSignup.username.message}</small>
                            )}
                        </div>

                        <div className="relative my-4 max-[650px]:my-2">
                            <InputText
                                type="text"
                                placeholder="Nombres"
                                className={inputClass(!!errorsSignup.name)}
                                {...registerSignup('name', { required: 'El nombre es requerido' })}
                            />
                            <i className={`pi pi-id-card ${iconClass}`}></i>
                            {errorsSignup.name && (
                                <small className="text-red-500 block text-left mt-1 text-sm">{errorsSignup.name.message}</small>
                            )}
                        </div>

                        <div className="relative my-4 max-[650px]:my-2">
                            <InputText
                                type="text"
                                placeholder="Apellidos"
                                className={inputClass(!!errorsSignup.lastname)}
                                {...registerSignup('lastname', { required: 'El apellido es requerido' })}
                            />
                            <i className={`pi pi-id-card ${iconClass}`}></i>
                            {errorsSignup.lastname && (
                                <small className="text-red-500 block text-left mt-1 text-sm">{errorsSignup.lastname.message}</small>
                            )}
                        </div>

                        <div className="relative my-4 max-[650px]:my-2">
                            <InputText
                                type="email"
                                placeholder="Correo electrónico"
                                className={inputClass(!!errorsSignup.email)}
                                {...registerSignup('email', {
                                    required: 'El correo es requerido',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Correo electrónico inválido'
                                    }
                                })}
                            />
                            <i className={`pi pi-envelope ${iconClass}`}></i>
                            {errorsSignup.email && (
                                <small className="text-red-500 block text-left mt-1 text-sm">{errorsSignup.email.message}</small>
                            )}
                        </div>

                        <div className="relative my-4 max-[650px]:my-2">
                            <Controller
                                name="password"
                                control={controlSignup}
                                rules={{ required: 'La contraseña es requerida' }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Password
                                            {...field}
                                            placeholder="Contraseña"
                                            toggleMask
                                            feedback={false}
                                            inputClassName={inputClass(!!fieldState.error)}
                                        />
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
                {/*------------------------OVERLAYS-----------------------------------*/}
                <div className="absolute w-full h-full pointer-events-none contain-layout">
                    <OverlayPanel
                        title="¡Bienvenido al sistema!"
                        description="¿No tienes una cuenta?"
                        buttonText="Registro"
                        onClick={() => setIsRegisterActive(true)}
                        isActive={isRegisterActive}
                        position="left"
                    />

                    <OverlayPanel
                        title="¡Bienvenido al sistema!"
                        description="¿Ya tienes una cuenta?"
                        buttonText="Login"
                        onClick={() => setIsRegisterActive(false)}
                        isActive={isRegisterActive}
                        position="right"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
