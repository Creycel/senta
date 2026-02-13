import { useState, useEffect } from 'react';
import './Perfiles.css';

interface Profesional {
    id: number;
    nombre: string;
    apellidos: string;
    carreraespecializacion: string;
    telefono: string;
    correousuario: string;
    fechaRegistro?: string;
}

export default function Perfiles() {
    const [profesionales, setProfesionales] = useState<Profesional[]>([]);
    const [conectado, setConectado] = useState(false);
    const [ultimoId, setUltimoId] = useState(0);

    useEffect(() => {
        const cargarProfesionalesIniciales = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/profesionales');
                if (response.ok) {
                    const data = await response.json();
                    setProfesionales(data.profesionales || []);

                    if (data.profesionales && data.profesionales.length > 0) {
                        const maxId = Math.max(...data.profesionales.map((p: Profesional) => p.id));
                        setUltimoId(maxId);
                    }

                    setConectado(true);
                }
            } catch (error) {
                console.error('Error al cargar profesionales:', error);
                setConectado(false);
            }
        };

        cargarProfesionalesIniciales();
    }, []);

    useEffect(() => {
        const consultarNuevosProfesionales = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/profesionales/nuevos?desde=${ultimoId}`
                );

                if (response.ok) {
                    const data = await response.json();

                    if (data.profesionales && data.profesionales.length > 0) {
                        setProfesionales(prev => [...data.profesionales, ...prev]);

                        const maxId = Math.max(...data.profesionales.map((p: Profesional) => p.id));
                        setUltimoId(maxId);

                        console.log('Nuevos profesionales detectados:', data.profesionales.length);
                    }

                    setConectado(true);
                }
            } catch (error) {
                console.error('Error al consultar nuevos profesionales:', error);
                setConectado(false);
            }
        };

        const intervalo = setInterval(consultarNuevosProfesionales, 3000);
        return () => clearInterval(intervalo);
    }, [ultimoId]);

    return (
        <div className="contenedor-principal">
            <div className="header-profesionales">
                <h2>Total de profesionales registrados ({profesionales.length})</h2>

                <span className={conectado ? "estado-conectado" : "estado-desconectado"}>
                    {conectado ? "🟢 Conectados" : "🔴 Desconectado"}
                </span>
            </div>

            <div className="grid-profesionales">
                {profesionales.length === 0 ? (
                    <div className="mensaje-vacio">
                        <p className="texto-vacio-1">No hay profesionales registrados aún</p>
                        <p className="texto-vacio-2">
                            Los nuevos registros aparecerán aquí automáticamente.
                        </p>
                    </div>
                ) : (
                    profesionales.map((prof) => (
                        <div
                            key={prof.id}
                            className="card-profesional"
                        >
                            <div className="header-card">
                                <div className="avatar-profesional">
                                    {prof.nombre.charAt(0)}
                                    {prof.apellidos.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="nombre-profesional">
                                        {prof.nombre} {prof.apellidos}
                                    </h3>
                                    <p className="id-profesional">ID: {prof.id}</p>
                                </div>
                            </div>

                            <p className="especializacion-prof">{prof.carreraespecializacion}</p>

                            <p className="texto-contacto">📧 {prof.correousuario}</p>

                            {prof.telefono && (
                                <p className="texto-contacto">📱 {prof.telefono}</p>
                            )}

                            {prof.fechaRegistro && (
                                <p className="fecha-registro">📅 {prof.fechaRegistro}</p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
