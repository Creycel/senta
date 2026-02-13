import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Bienvenida.css";

export default function Bienvenida() {
    const images = [
        "https://wallpapers.com/images/hd/enterprise-business-plan-proposal-end6o50uzp5vv22l.jpg",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=60&w=3000&auto=format&fit=crop",
        "https://wallpapers.com/images/hd/enterprise-business-discussion-kj1sdmwjlafkba9z.jpg"
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div
            className="bienvenida-container"
            style={{
                backgroundImage: `url(${images[index]})`
            }}
        >
            <div className="bienvenida-overlay">
                <div className="bienvenida-card">
                    <h1>Bienvenido a Senta</h1>

                    <p>
                        Senta es una plataforma donde empresas y profesionales
                        pueden conectarse de forma segura. Aquí podrás encontrar
                        candidatos verificados o publicar tus servicios.
                    </p>

                    <p>
                        Nuestro objetivo es facilitar la contratación y la
                        búsqueda de oportunidades en un entorno confiable.
                    </p>

                    <div className="bienvenida-botones">
                        <Link to="/login" className="btn-login">
                            Iniciar sesión
                        </Link>

                        <Link to="/registro/persona" className="btn-registro">
                            Registrarse
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
