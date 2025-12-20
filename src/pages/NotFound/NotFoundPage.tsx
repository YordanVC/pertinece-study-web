import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../../assets/animations/404-notFound.json';
import './NotFoundPage.css';
import { Button } from '../../components/Button/Button';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                {/* Animación Lottie */}
                <div className="error-illustration">
                    <Lottie
                        animationData={animationData}
                        loop={true}
                        className="lottie-animation"
                    />
                </div>

                {/* Círculos decorativos animados */}
                <div className="floating-circles">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-3"></div>
                    <div className="circle circle-4"></div>
                </div>

                {/* Mensaje */}
                <div className="error-message">
                    <h1 className="error-title">Página no encontrada</h1>
                    <p className="error-description">
                        Lo sentimos, la página que estás buscando no existe o ha sido movida.
                    </p>
                </div>

                {/* Botones de acción */}
                <div className="error-actions h-15 flex flex-col sm:flex-row gap-3">
                    <Button
                        variant="primary"
                        icon="pi pi-home"
                        onClick={() => navigate('/')}
                        className="p-button-lg w-full sm:w-auto py-6"
                    >Volver al inicio</Button>
                    <Button
                        variant="secondary"
                        icon="pi pi-arrow-left"
                        onClick={() => navigate(-1)}
                        className="p-button-lg bg-white w-full sm:w-auto py-6"
                    >Volver atrás</Button>
                    <br />
                </div>

                {/* Información adicional */}
                <div className="error-footer">
                    <p className="error-help">
                        <i className="pi pi-info-circle"></i>
                        Si crees que esto es un error, por favor contacta al soporte técnico.
                    </p>
                </div>
            </div>
        </div>
    );
};
