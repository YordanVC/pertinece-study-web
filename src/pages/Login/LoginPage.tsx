import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { Toggle } from '../../components/Toggle/Toggle';
import { OverlayPanel } from './OverlayPanel';
import { LoginForm, RegisterForm } from './forms';
import type { LoginFormData, RegisterFormData } from './forms';
import bgImage from '../../assets/bg-3.jpg';
import {
    BUTTON_TEXT_LOGIN_A_REGISTRO,
    BUTTON_TEXT_REGISTRO_A_LOGIN,
    HELPER_TEXT_LOGIN_A_REGISTRO,
    HELPER_TEXT_REGISTRO_A_LOGIN,
    MENSAJE_BIENVENIDA_LOGIN
} from '../../utils/constants';

const LoginPage = () => {
    const [isRegisterActive, setIsRegisterActive] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();
    const { isDarkMode, toggleTheme } = useTheme();
    const { login, register: authRegister, isAuthenticated } = useAuth();

    // Redirigir si ya está autenticado
    if (isAuthenticated) {
        const from = (location.state as any)?.from?.pathname || '/';
        navigate(from, { replace: true });
    }

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
            password: '',
            confirmPassword: ''
        }
    });

    const onLogin = async (data: LoginFormData) => {
        try {
            await login(data.username, data.password);
            toast.showSuccess('Sesión iniciada', 'Has iniciado sesión correctamente.');

            // Redirigir a la página que intentaba acceder o al home
            const from = (location.state as any)?.from?.pathname || '/';
            navigate(from, { replace: true });
        } catch (error) {
            toast.showError('Error de autenticación', 'Usuario o contraseña incorrectos.');
            console.error('Login error:', error);
        }
    };

    const onRegister = async (data: RegisterFormData) => {
        try {
            // Validar que las contraseñas coincidan
            if (data.password !== data.confirmPassword) {
                toast.showError('Error de validación', 'Las contraseñas no coinciden.');
                return;
            }

            await authRegister(data.email, data.password, `${data.name} ${data.lastname}`);
            toast.showSuccess('Registro exitoso', 'Tu cuenta ha sido creada correctamente.');

            // Redirigir al home después del registro
            navigate('/', { replace: true });
        } catch (error) {
            toast.showError('Error de registro', 'No se pudo crear la cuenta. Intenta nuevamente.');
            console.error('Register error:', error);
        }
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
            className={`min-h-screen w-full flex justify-center items-center p-5 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : ''}`}
            style={{
                backgroundImage: isDarkMode ? 'none' : `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Toggle de tema en la esquina superior derecha */}
            <div className="absolute top-4 right-4 max-[650px]:top-2 max-[650px]:right-2 z-50">
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
                className={`relative w-[950px] h-[750px] max-h-[90vh] rounded-[30px] shadow-[0_0_30px_rgba(0,0,0,0.2)] overflow-hidden max-w-full contain-layout
                max-[650px]:w-[min(92vw,500px)] max-[650px]:h-[min(90svh,700px)] mt-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>

                {/*------------------------FORM LOGIN-----------------------------------*/}
                <LoginForm
                    onSubmit={handleSubmitLogin(onLogin)}
                    register={registerLogin}
                    errors={errorsLogin}
                    control={controlLogin}
                    inputClass={inputClass}
                    iconClass={iconClass}
                    isDarkMode={isDarkMode}
                    isRegisterActive={isRegisterActive}
                />

                {/*------------------------FORM REGISTRO-----------------------------------*/}
                <RegisterForm
                    onSubmit={handleSubmitSignup(onRegister)}
                    register={registerSignup}
                    errors={errorsSignup}
                    control={controlSignup}
                    inputClass={inputClass}
                    iconClass={iconClass}
                    isDarkMode={isDarkMode}
                    isRegisterActive={isRegisterActive}
                />

                {/*------------------------OVERLAYS-----------------------------------*/}
                <div className="absolute w-full h-full pointer-events-none contain-layout">
                    <OverlayPanel
                        title={MENSAJE_BIENVENIDA_LOGIN}
                        description={HELPER_TEXT_LOGIN_A_REGISTRO}
                        buttonText={BUTTON_TEXT_LOGIN_A_REGISTRO}
                        onClick={() => setIsRegisterActive(true)}
                        isActive={isRegisterActive}
                        position="left"
                    />

                    <OverlayPanel
                        title={MENSAJE_BIENVENIDA_LOGIN}
                        description={HELPER_TEXT_REGISTRO_A_LOGIN}
                        buttonText={BUTTON_TEXT_REGISTRO_A_LOGIN}
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
