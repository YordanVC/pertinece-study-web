import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

/**
 * Interfaz para el usuario autenticado
 */
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
    avatar?: string;
}

/**
 * Interfaz para el contexto de autenticación
 */
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    showLogoutConfirmation: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string, name: string) => Promise<void>;
    requestLogout: () => void;
    cancelLogout: () => void;
    confirmLogout: () => void;
}

/**
 * Contexto de autenticación
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider de autenticación con mock data
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

    // Simular verificación de sesión al cargar la app
    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);
            try {
                // Simular delay de red
                await new Promise(resolve => setTimeout(resolve, 500));

                // Verificar si hay un usuario guardado en localStorage (mock)
                const storedUser = localStorage.getItem('mockUser');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Error checking auth:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    /**
     * Mock login - Simula autenticación
     */
    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Validación básica mock
            if (!email || !password) {
                throw new Error('Email y contraseña son requeridos');
            }

            // Crear usuario mock
            const mockUser: User = {
                id: '1',
                email: email,
                name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
                role: email.includes('admin') ? 'admin' : 'user',
                avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=0D8ABC&color=fff`
            };

            // Guardar en localStorage (mock de sesión)
            localStorage.setItem('mockUser', JSON.stringify(mockUser));
            localStorage.setItem('mockToken', 'mock-jwt-token-' + Date.now());

            setUser(mockUser);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Mock register - Simula registro
     */
    const register = async (email: string, password: string, name: string) => {
        setIsLoading(true);
        try {
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Validación básica mock
            if (!email || !password || !name) {
                throw new Error('Todos los campos son requeridos');
            }

            // Crear usuario mock
            const mockUser: User = {
                id: Date.now().toString(),
                email: email,
                name: name,
                role: 'user',
                avatar: `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff`
            };

            // Guardar en localStorage (mock de sesión)
            localStorage.setItem('mockUser', JSON.stringify(mockUser));
            localStorage.setItem('mockToken', 'mock-jwt-token-' + Date.now());

            setUser(mockUser);
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Logout - Cerrar sesión (uso interno)
     */
    const logout = () => {
        localStorage.removeItem('mockUser');
        localStorage.removeItem('mockToken');
        setUser(null);
        setShowLogoutConfirmation(false);
    };

    /**
     * Solicitar confirmación de logout
     */
    const requestLogout = () => {
        setShowLogoutConfirmation(true);
    };

    /**
     * Cancelar logout
     */
    const cancelLogout = () => {
        setShowLogoutConfirmation(false);
    };

    /**
     * Confirmar y ejecutar logout
     */
    const confirmLogout = () => {
        logout();
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        showLogoutConfirmation,
        login,
        logout,
        register,
        requestLogout,
        cancelLogout,
        confirmLogout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Hook para usar el contexto de autenticación
 * @throws Error si se usa fuera del AuthProvider
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
