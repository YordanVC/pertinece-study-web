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
            {/*Container*/}
            <div className={`relative w-[900px] h-[620px] bg-white rounded-[30px] shadow-[0_0_30px_rgba(0,0,0,0.2)] overflow-hidden max-w-full contain-layout
                max-[650px]:w-[min(92vw,500px)] max-[650px]:h-[min(90svh,700px)]`}>

                {/*------------------------FORM LOGIN-----------------------------------*/}
                <div className={`absolute w-1/2 h-full right-0 bg-white flex items-center text-[#333] text-center p-[35px] transition-transform duration-[600ms] ease-in-out will-change-transform z-[1]
                    ${isRegisterActive ? 'delay-[700ms] translate-x-[-200%]' : 'delay-[700ms] translate-x-0'}
                    max-[650px]:!w-full max-[650px]:!h-[calc(100%-20svh)] max-[650px]:p-6 max-[650px]:bottom-0 max-[650px]:!right-0 max-[650px]:!translate-x-0 max-[650px]:!z-[1]
                    ${isRegisterActive ? 'max-[650px]:!translate-y-[100svh] max-[650px]:!invisible max-[650px]:!delay-[300ms]' : 'max-[650px]:!translate-y-0 max-[650px]:!visible max-[650px]:!delay-[700ms]'}
                    max-[400px]:p-5`}>
                    <form onSubmit={handleSubmitLogin(onLogin)} className="w-full scrollbar-none overflow-y-auto max-h-full">
                        <div className="flex justify-center mb-4 max-[650px]:mb-[clamp(0.75rem,2vw,1.25rem)]">
                            <img src={logoSvg} alt="Universidad de Guayaquil" className="h-16 w-auto max-[650px]:h-[clamp(4rem,12vw,6rem)]" />
                        </div>
                        <h1 className="text-4xl mb-2 max-[650px]:text-[clamp(1.5rem,5vw,2rem)] font-bold max-[650px]:mb-[clamp(0.75rem,2vw,1.25rem)] mt-0 max-[400px]:text-2xl">Acceso</h1>

                        <div className="relative my-5 max-[650px]:my-5">
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

                        <div className="relative my-5 max-[650px]:my-5">
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

                        <CustomButton type="submit" variant="primary" className="!w-full !h-12 !rounded-lg !shadow-[0_0_10px_rgba(0,0,0,0.1)]">
                            Acceso
                        </CustomButton>
                    </form>
                </div>

                {/*------------------------FORM REGISTRO-----------------------------------*/}
                <div className={`absolute w-1/2 h-full left-0 bg-white flex items-center text-[#333] text-center p-[35px] transition-all duration-[600ms] ease-in-out will-change-transform z-[1]
                    ${isRegisterActive ? 'opacity-100 translate-x-0 delay-[700ms]' : 'opacity-0 translate-x-[200%] delay-[300ms]'}
                    max-[650px]:!w-full max-[650px]:!h-[calc(100%-20svh)] max-[650px]:p-4 max-[650px]:!right-0 max-[650px]:!left-auto max-[650px]:!pb-6 max-[650px]:top-0 max-[650px]:!translate-x-0
                    ${isRegisterActive ? 'max-[650px]:!opacity-100 max-[650px]:!translate-y-0 max-[650px]:!delay-[700ms]' : 'max-[650px]:!opacity-0 max-[650px]:!translate-y-[-100svh] max-[650px]:!delay-[300ms]'}
                    max-[400px]:p-3`}>
                    <form onSubmit={handleSubmitSignup(onRegister)} className="w-full overflow-y-auto max-h-full scrollbar-none">
                        <div className="flex justify-center mb-4 max-[650px]:mb-[clamp(0.5rem,1.5vw,1rem)]">
                            <img src={logoSvg} alt="Universidad de Guayaquil" className="h-16 w-auto max-[650px]:h-[clamp(3.5rem,10vw,5rem)]" />
                        </div>
                        <h1 className="text-4xl mb-2 max-[650px]:text-[clamp(1.5rem,5vw,2rem)] max-[400px]:text-[30px]">Registro</h1>

                        <div className="relative my-4 max-[650px]:my-2">
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

                        <div className="relative my-4 max-[650px]:my-2">
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

                        <div className="relative my-4 max-[650px]:my-2">
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

                        <div className="relative my-4 max-[650px]:my-2">
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

                        <div className="relative my-4 max-[650px]:my-2">
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

                        <CustomButton type="submit" variant="primary" className="!w-full !h-12 !rounded-lg !shadow-[0_0_10px_rgba(0,0,0,0.1)] max-[650px]:!bg-white max-[650px]:!text-ug-blue max-[650px]:!border-2 max-[650px]:!border-ug-blue max-[650px]:mb-4 max-[650px]:!h-14 max-[650px]:!text-base">
                            Registro
                        </CustomButton>
                    </form>
                </div>
                {/*------------------------OVERLAY IR REGISTRO-----------------------------------*/}
                <div className="absolute w-full h-full pointer-events-none contain-layout">
                    {/* Overlay de fondo removido para animación simple */}

                    <div className={`absolute w-1/2 h-full left-0 text-white flex flex-col justify-center items-center z-[2] transition-transform duration-[600ms] ease-in-out pointer-events-auto will-change-transform bg-gradient-to-r from-ug-blue to-ug-blue-dark
                        ${isRegisterActive ? 'translate-x-[-200%] delay-[300ms]' : 'translate-x-0 delay-[700ms]'}
                        max-[650px]:!w-full max-[650px]:!h-[20svh] max-[650px]:!left-0 max-[650px]:!z-[4] max-[650px]:top-0 max-[650px]:!translate-x-0
                        ${isRegisterActive ? 'max-[650px]:!translate-y-[-100%] max-[650px]:!delay-[300ms]' : 'max-[650px]:!translate-y-0 max-[650px]:!delay-[700ms]'}`}>
                        <div className="mb-8 max-[650px]:mb-[clamp(0.25rem,1vw,0.5rem)] max-[400px]:hidden">
                            <Lottie
                                animationData={loginSuccessAnimation}
                                loop={true}
                                className="w-48 h-48 max-[650px]:w-[clamp(4rem,12vw,7rem)] max-[650px]:h-[clamp(4rem,12vw,7rem)]"
                            />
                        </div>
                        <h1 className="text-4xl font-semibold mb-4 max-[650px]:text-[clamp(1.25rem,4vw,1.5rem)] max-[650px]:mb-[clamp(0.25rem,1vw,0.5rem)] max-[400px]:mb-2">¡Hola, Bienvenido!</h1>
                        <p className="text-sm mb-8 max-[650px]:text-[clamp(0.75rem,2.5vw,0.875rem)] max-[650px]:mb-[clamp(0.5rem,1.5vw,0.75rem)]">¿No tienes una cuenta?</p>
                        <CustomButton
                            variant="secondary"
                            className="!w-40 !h-12 !bg-transparent !border-2 !border-white !text-white hover:!bg-white hover:!text-ug-blue !shadow-none max-[650px]:!w-[clamp(8rem,30vw,10rem)] max-[650px]:!h-[clamp(2.75rem,10vw,3.25rem)] max-[650px]:!text-[clamp(0.875rem,3vw,1rem)] max-[650px]:!font-semibold"
                            onClick={() => setIsRegisterActive(true)}
                        >
                            Registro
                        </CustomButton>
                    </div>

                    {/*------------------------OVERLAY IR LOGIN-----------------------------------*/}
                    <div className={`absolute w-1/2 h-full right-0 text-white flex flex-col justify-center items-center z-[2] transition-transform duration-[600ms] ease-in-out pointer-events-auto will-change-transform bg-gradient-to-r from-ug-blue to-ug-blue-dark
                        ${isRegisterActive ? 'translate-x-0 delay-[700ms]' : 'translate-x-[200%] delay-[300ms]'}
                        max-[650px]:!w-full max-[650px]:!h-[20svh] max-[650px]:!right-0 max-[650px]:!z-[4] max-[650px]:bottom-0 max-[650px]:!translate-x-0 max-[650px]:rounded-b-[30px]
                        ${isRegisterActive ? 'max-[650px]:!translate-y-0 max-[650px]:!delay-[700ms]' : 'max-[650px]:!translate-y-[100%] max-[650px]:!delay-[300ms]'}`}>
                        <div className="mb-8 max-[650px]:mb-[clamp(0.25rem,1vw,0.5rem)] max-[400px]:hidden">
                            <Lottie
                                animationData={loginSuccessAnimation}
                                loop={true}
                                className="w-48 h-48 max-[650px]:w-[clamp(4rem,12vw,7rem)] max-[650px]:h-[clamp(4rem,12vw,7rem)]"
                            />
                        </div>
                        <h1 className="text-4xl font-semibold mb-4 max-[650px]:text-[clamp(1.25rem,4vw,1.5rem)] max-[650px]:mb-[clamp(0.25rem,1vw,0.5rem)] max-[400px]:mb-2">¡Bienvenido de Nuevo!</h1>
                        <p className="text-sm mb-8 max-[650px]:text-[clamp(0.75rem,2.5vw,0.875rem)] max-[650px]:mb-[clamp(0.25rem,1vw,0.5rem)]">¿Ya tienes una cuenta?</p>
                        <CustomButton
                            variant="secondary"
                            className="!w-40 !h-12 !bg-transparent !border-2 !border-white !text-white hover:!bg-white hover:!text-ug-blue !shadow-none max-[650px]:!w-[clamp(8rem,30vw,10rem)] max-[650px]:!h-[clamp(2.75rem,10vw,3.25rem)] max-[650px]:!text-[clamp(0.875rem,3vw,1rem)] max-[650px]:!font-semibold"
                            onClick={() => setIsRegisterActive(false)}
                        >
                            Login
                        </CustomButton>
                    </div >
                </div >
            </div >
        </div >
    );
};

export default LoginPage;
