import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button as CustomButton } from '../../components/Button/Button';
import Lottie from 'lottie-react';
import bgImage from '../../assets/bg-3.jpg';
import logoSvg from '../../assets/UgLettersOnly.svg';
import loginSuccessAnimation from '../../assets/animations/login-success.json';

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

    // React Hook Forms para Login
    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: errorsLogin }
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
        formState: { errors: errorsSignup }
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
        // Aquí irá la lógica de autenticación
    };

    const onRegister = async (data: RegisterFormData) => {
        console.log('Register data:', data);
        // Aquí irá la lógica de registro
    };

    return (
        <div
            className="min-h-screen w-full flex justify-center items-center p-5 fixed inset-0"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Contenedor principal */}
            <div className={`relative w-[900px] h-[620px] bg-white rounded-[30px] shadow-[0_0_30px_rgba(0,0,0,0.2)] overflow-hidden max-w-full 
                max-[650px]:h-[calc(100vh-40px)] max-[650px]:w-[calc(100vw-40px)]`}>

                {/* Formulario de Login */}
                <div className={`absolute w-1/2 h-full bg-white flex items-center text-[#333] text-center p-[35px] z-[1] transition-all duration-[600ms] ease-in-out 
                    ${isRegisterActive ? 'delay-[1200ms] right-1/2' : 'delay-[1200ms] right-0'}
                    max-[650px]:!w-full max-[650px]:!h-[65%] max-[650px]:p-6
                    max-[650px]:${isRegisterActive ? '!bottom-[35%] !right-0' : '!bottom-0 !right-0'}
                    max-[400px]:p-5`}>
                    <form onSubmit={handleSubmitLogin(onLogin)} className="w-full scrollbar-none overflow-y-auto max-h-full">
                        {/* Logo UG arriba del título */}
                        <div className="flex justify-center mb-4 max-[650px]:mb-2">
                            <img src={logoSvg} alt="Universidad de Guayaquil" className="h-16 w-auto max-[650px]:h-12" />
                        </div>
                        <h1 className="text-4xl mb-2 max-[650px]:text-3xl max-[400px]:text-[28px]">Acceso</h1>

                        {/* Username Input */}
                        <div className="relative my-5">
                            <InputText
                                type="text"
                                placeholder="Nombre de usuario"
                                className={`w-full !p-[13px_50px_13px_20px] !bg-[#f0f0f0] !rounded-lg !border-none !text-base !text-[#333] !font-medium placeholder:text-[#888] placeholder:font-normal ${errorsLogin.username ? '!border-red-500' : ''
                                    }`}
                                {...registerLogin('username', { required: 'El nombre de usuario es requerido' })}
                            />
                            <i className="pi pi-user absolute right-5 top-1/2 -translate-y-1/2 text-xl text-[#333]"></i>
                            {errorsLogin.username && (
                                <small className="text-red-500 block text-left mt-1 text-sm">{errorsLogin.username.message}</small>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="relative my-5">
                            <Password
                                placeholder="Contraseña"
                                toggleMask
                                feedback={false}
                                pt={{
                                    root: { className: 'w-full' },
                                    input: {
                                        className: `w-full !p-[13px_50px_13px_20px] !bg-[#f0f0f0] !rounded-lg !border-none !text-base !text-[#333] !font-medium placeholder:text-[#888] placeholder:font-normal ${errorsLogin.password ? '!border-red-500' : ''
                                            }`
                                    },
                                    showIcon: { className: '!hidden' },
                                    hideIcon: { className: '!hidden' }
                                }}
                                {...registerLogin('password', { required: 'La contraseña es requerida' })}
                            />
                            <i className="pi pi-lock absolute right-5 top-1/2 -translate-y-1/2 text-xl text-[#333] pointer-events-none z-10"></i>
                            {errorsLogin.password && (
                                <small className="text-red-500 block text-left mt-1 text-sm">{errorsLogin.password.message}</small>
                            )}
                        </div>

                        {/* Submit Button */}
                        <CustomButton type="submit" variant="primary" className="!w-full !h-12 !rounded-lg !shadow-[0_0_10px_rgba(0,0,0,0.1)]">
                            Acceso
                        </CustomButton>
                    </form>
                </div>

                {/* Formulario de Registro */}
                <div className={`absolute right-0 w-1/2 h-full bg-white flex items-center text-[#333] text-center p-[35px] z-[1] transition-all duration-[600ms] ease-in-out ${isRegisterActive ? 'visible right-1/2 delay-[1200ms]' : 'invisible delay-[600ms]'} max-[400px]:p-5`}>
                    <form onSubmit={handleSubmitSignup(onRegister)} className="w-full overflow-y-auto max-h-full scrollbar-none">
                        {/* Logo UG arriba del título */}
                        <div className="flex justify-center mb-4">
                            <img src={logoSvg} alt="Universidad de Guayaquil" className="h-16 w-auto" />
                        </div>
                        <h1 className="text-4xl mb-2 max-[400px]:text-[30px]">Registro</h1>

                        {/* Username Input */}
                        <div className="relative my-4">
                            <InputText
                                type="text"
                                placeholder="Usuario"
                                className={`w-full !p-[13px_50px_13px_20px] !bg-[#f0f0f0] !rounded-lg !border-none !text-base !text-[#333] !font-medium placeholder:text-[#888] placeholder:font-normal ${errorsSignup.username ? '!border-red-500' : ''
                                    }`}
                                {...registerSignup('username', { required: 'El usuario es requerido' })}
                            />
                            <i className="pi pi-user absolute right-5 top-1/2 -translate-y-1/2 text-xl text-[#333]"></i>
                            {errorsSignup.username && (
                                <small className="text-red-500 block text-left mt-1 text-sm">{errorsSignup.username.message}</small>
                            )}
                        </div>

                        {/* Name Input */}
                        <div className="relative my-4">
                            <InputText
                                type="text"
                                placeholder="Nombres"
                                className={`w-full !p-[13px_50px_13px_20px] !bg-[#f0f0f0] !rounded-lg !border-none !text-base !text-[#333] !font-medium placeholder:text-[#888] placeholder:font-normal ${errorsSignup.name ? '!border-red-500' : ''
                                    }`}
                                {...registerSignup('name', { required: 'El nombre es requerido' })}
                            />
                            <i className="pi pi-id-card absolute right-5 top-1/2 -translate-y-1/2 text-xl text-[#333]"></i>
                            {errorsSignup.name && (
                                <small className="text-red-500 block text-left mt-1 text-sm">{errorsSignup.name.message}</small>
                            )}
                        </div>

                        {/* Lastname Input */}
                        <div className="relative my-4">
                            <InputText
                                type="text"
                                placeholder="Apellidos"
                                className={`w-full !p-[13px_50px_13px_20px] !bg-[#f0f0f0] !rounded-lg !border-none !text-base !text-[#333] !font-medium placeholder:text-[#888] placeholder:font-normal ${errorsSignup.lastname ? '!border-red-500' : ''
                                    }`}
                                {...registerSignup('lastname', { required: 'El apellido es requerido' })}
                            />
                            <i className="pi pi-id-card absolute right-5 top-1/2 -translate-y-1/2 text-xl text-[#333]"></i>
                            {errorsSignup.lastname && (
                                <small className="text-red-500 block text-left mt-1 text-sm">{errorsSignup.lastname.message}</small>
                            )}
                        </div>

                        {/* Email Input */}
                        <div className="relative my-4">
                            <InputText
                                type="email"
                                placeholder="Correo electrónico"
                                className={`w-full !p-[13px_50px_13px_20px] !bg-[#f0f0f0] !rounded-lg !border-none !text-base !text-[#333] !font-medium placeholder:text-[#888] placeholder:font-normal ${errorsSignup.email ? '!border-red-500' : ''
                                    }`}
                                {...registerSignup('email', {
                                    required: 'El correo es requerido',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Correo electrónico inválido'
                                    }
                                })}
                            />
                            <i className="pi pi-envelope absolute right-5 top-1/2 -translate-y-1/2 text-xl text-[#333]"></i>
                            {errorsSignup.email && (
                                <small className="text-red-500 block text-left mt-1 text-sm">{errorsSignup.email.message}</small>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="relative my-4">
                            <Password
                                placeholder="Contraseña"
                                toggleMask
                                feedback={false}
                                pt={{
                                    root: { className: 'w-full' },
                                    input: {
                                        className: `w-full !p-[13px_50px_13px_20px] !bg-[#f0f0f0] !rounded-lg !border-none !text-base !text-[#333] !font-medium placeholder:text-[#888] placeholder:font-normal ${errorsSignup.password ? '!border-red-500' : ''
                                            }`
                                    },
                                    showIcon: { className: '!hidden' },
                                    hideIcon: { className: '!hidden' }
                                }}
                                {...registerSignup('password', { required: 'La contraseña es requerida' })}
                            />
                            <i className="pi pi-lock absolute right-5 top-1/2 -translate-y-1/2 text-xl text-[#333] pointer-events-none z-10"></i>
                            {errorsSignup.password && (
                                <small className="text-red-500 block text-left mt-1 text-sm">{errorsSignup.password.message}</small>
                            )}
                        </div>

                        {/* Submit Button */}
                        <CustomButton type="submit" variant="primary" className="!w-full !h-12 !rounded-lg !shadow-[0_0_10px_rgba(0,0,0,0.1)]">
                            Registro
                        </CustomButton>
                    </form>
                </div>

                {/* Toggle Box - Panel de Bienvenida */}
                <div className="absolute w-full h-full pointer-events-none">
                    {/* Fondo animado */}
                    <div className={`absolute w-[300%] h-full bg-gradient-to-r from-ug-blue to-ug-blue-dark rounded-[100px] z-[2] transition-all duration-[1800ms] ease-in-out ${isRegisterActive ? 'left-1/2' : '-left-[250%]'}`} />

                    {/* Panel Izquierdo - Registro */}
                    <div className={`absolute w-1/2 h-full text-white flex flex-col justify-center items-center z-[2] transition-all duration-[600ms] ease-in-out pointer-events-auto ${isRegisterActive ? '-left-1/2 delay-[600ms]' : 'left-0 delay-[1200ms]'}`}>
                        <div className="mb-8">
                            <Lottie
                                animationData={loginSuccessAnimation}
                                loop={true}
                                className="w-48 h-48"
                            />
                        </div>
                        <h1 className="text-4xl font-semibold mb-4 max-[400px]:text-[30px]">¡Hola, Bienvenido!</h1>
                        <p className="text-sm mb-8">¿No tienes una cuenta?</p>
                        <CustomButton
                            variant="secondary"
                            className="!w-40 !h-12 !bg-transparent !border-2 !border-white !text-white hover:!bg-white hover:!text-ug-blue !shadow-none"
                            onClick={() => setIsRegisterActive(true)}
                        >
                            Registro
                        </CustomButton>
                    </div>

                    {/* Panel Derecho - Login */}
                    <div className={`absolute w-1/2 h-full text-white flex flex-col justify-center items-center z-[2] transition-all duration-[600ms] ease-in-out pointer-events-auto ${isRegisterActive ? 'right-0 delay-[1200ms]' : '-right-1/2 delay-[600ms]'}`}>
                        <div className="mb-8">
                            <Lottie
                                animationData={loginSuccessAnimation}
                                loop={true}
                                className="w-48 h-48"
                            />
                        </div>
                        <h1 className="text-4xl font-semibold mb-4 max-[400px]:text-[30px]">¡Bienvenido de Nuevo!</h1>
                        <p className="text-sm mb-8">¿Ya tienes una cuenta?</p>
                        <CustomButton
                            variant="secondary"
                            className="!w-40 !h-12 !bg-transparent !border-2 !border-white !text-white hover:!bg-white hover:!text-ug-blue !shadow-none"
                            onClick={() => setIsRegisterActive(false)}
                        >
                            Login
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
