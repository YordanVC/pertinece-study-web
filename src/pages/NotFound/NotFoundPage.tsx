import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import './NotFoundPage.css';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                {/* Animación del 404 */}
                <div className="error-code">
                    <span className="digit digit-1">4</span>
                    <span className="digit digit-0">0</span>
                    <span className="digit digit-2">4</span>
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
                <div className="error-actions">
                    <Button
                        label="Volver al inicio"
                        icon="pi pi-home"
                        onClick={() => navigate('/')}
                        className="p-button-lg"
                        style={{
                            backgroundColor: 'var(--color-ug-blue)',
                            borderColor: 'var(--color-ug-blue)',
                        }}
                    />
                    <Button
                        label="Ir atrás"
                        icon="pi pi-arrow-left"
                        onClick={() => navigate(-1)}
                        className="p-button-lg p-button-outlined"
                        style={{
                            color: 'var(--color-ug-blue)',
                            borderColor: 'var(--color-ug-blue)',
                        }}
                    />
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
