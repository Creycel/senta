import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../auth/Registro.css"
import logo from "../media/senta-logo.png"
import api from "../api/api";

export default function RegistroProfesionales() {
    const { registrarse } = useContext(AuthContext)
    const navigate = useNavigate()

    const [formulario, setFormulario] = useState({
        nombre: "",
        apellidos: "",
        carreraespecializacion: "",
        telefono: "",
        correousuario: "",
        usuario: "",
        contrasena: "",
    })

    const manejarCambiosInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value })
    }

    const manejarCambiosSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value })
    }

    const manejarEnviados = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validación básica
        if (!formulario.carreraespecializacion) {
            alert("Por favor selecciona una carrera o especialización");
            return;
        }

        try {
            await api.post("/api/profesionales/registro", formulario);
            console.log("Datos enviados:", formulario);
            alert("Profesional registrado de manera correcta")

            window.close()

            registrarse()
            navigate("/inicio")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const mensajeError = error.response?.data?.error || error.message || "Error desconocido";
            alert("Error al registrar: " + mensajeError);
            console.error("Error completo:", error);
        }
    }

    return (
        <>
            <div className="logo-registro">
                <img src={logo} alt="senta-logo-png" width={200} height={200} />
            </div>
            <div className="cuerpo">
                <div className="descripcion">
                    <p>Esta sección es única y exclusivamente para registrarse como profesional en Senta.</p>
                </div>

                {/* 
                <div className="otro-formulario-registro">
                    <div className="formulario-persona">
                        <Link to={"/Registro/persona"}>Registra tu persona</Link>
                    </div>
                    <div className="formulario-profesional">
                        <Link to={"/Registro/empresa"}>Registra tu empresa</Link>
                    </div>
                </div>
                */}

                <div className="dentro-cuerpo-registro">
                    <form onSubmit={manejarEnviados}>
                        <div className="cuerpo-formulario-registro">

                            <div className="informacion-registro">
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Nombre"
                                    value={formulario.nombre}
                                    onChange={manejarCambiosInput}
                                    required
                                />
                            </div>

                            <div className="informacion-registro">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input
                                    type="text"
                                    id="apellidos"
                                    name="apellidos"
                                    placeholder="Apellidos"
                                    value={formulario.apellidos}
                                    onChange={manejarCambiosInput}
                                    required
                                />
                            </div>

                            <div className="informacion-registro">
                                <label htmlFor="carreraespecializacion">Carrera / Especialización</label>
                                <select
                                    id="carreraespecializacion"
                                    name="carreraespecializacion"
                                    value={formulario.carreraespecializacion}
                                    onChange={manejarCambiosSelect}
                                    required>

                                    <option value="">- - -</option>
                                    <option value="Técnico en Informática">Técnico en Informática</option>
                                    <option value="Técnico en Soporte de Computadoras">Técnico en Soporte de Computadoras</option>
                                    <option value="Técnico en Redes">Técnico en Redes</option>
                                    <option value="Técnico en Desarrollo de Software">Técnico en Desarrollo de Software</option>
                                    <option value="Técnico en Electrónica o Telecomunicaciones">Técnico en Electrónica o Telecomunicaciones</option>
                                    <option value="Tecnólogo en Sistemas">Tecnólogo en Sistemas</option>
                                    <option value="Tecnólogo en Análisis y Desarrollo de Software">Tecnólogo en Análisis y Desarrollo de Software</option>
                                    <option value="Tecnólogo en Seguridad Informática">Tecnólogo en Seguridad Informática</option>
                                    <option value="Tecnólogo en Ciberseguridad y Redes">Tecnólogo en Ciberseguridad y Redes</option>
                                    <option value="Tecnólogo en Inteligencia Artificial o Datos">Tecnólogo en Inteligencia Artificial o Datos</option>
                                    <option value="Ingeniería en Sistemas">Ingeniería en Sistemas</option>
                                    <option value="Ingeniería en Software">Ingeniería en Software</option>
                                    <option value="Ingeniería en Computación">Ingeniería en Computación</option>
                                    <option value="Ingeniería en Tecnologías de la Información">Ingeniería en Tecnologías de la Información</option>
                                    <option value="Licenciatura en Informática">Licenciatura en Informática</option>
                                    <option value="Licenciatura en Ciencias de la Computación">Licenciatura en Ciencias de la Computación</option>
                                    <option value="Licenciatura en Tecnología Educativa">Licenciatura en Tecnología Educativa</option>
                                    <option value="Licenciatura en Seguridad Informática">Licenciatura en Seguridad Informática</option>
                                    <option value="Especialización en Seguridad Informática">Especialización en Seguridad Informática</option>
                                    <option value="Especialización en Big Data y Análisis de Datos">Especialización en Big Data y Análisis de Datos</option>
                                    <option value="Especialización en Redes y Comunicaciones">Especialización en Redes y Comunicaciones</option>
                                    <option value="Maestría en Ciencias de la Computación">Maestría en Ciencias de la Computación</option>
                                    <option value="Maestría en Ingeniería de Software">Maestría en Ingeniería de Software</option>
                                    <option value="Maestría en Ciberseguridad">Maestría en Ciberseguridad</option>
                                    <option value="Maestría en Inteligencia Artificial">Maestría en Inteligencia Artificial</option>
                                    <option value="Maestría en Ciencia de Datos (Data Science)">Maestría en Ciencia de Datos</option>
                                    <option value="Maestría en Administración de Tecnologías de la Información (TI Management)">Maestría en Administración de TI</option>
                                    <option value="Doctorado en Ciencias de la Computación (Ph.D.)">Doctorado en Ciencias de la Computación</option>
                                    <option value="Doctorado en Inteligencia Artificial">Doctorado en Inteligencia Artificial</option>
                                    <option value="Doctorado en Ingeniería de Software">Doctorado en Ingeniería de Software</option>
                                    <option value="Doctorado en Seguridad Informática o Criptografía">Doctorado en Seguridad Informática</option>
                                    <option value="Certificación CompTIA (A+, Network+, Security+)">Certificación CompTIA</option>
                                    <option value="Certificación Cisco (CCNA, CCNP, CCIE)">Certificación Cisco</option>
                                    <option value="Certificación Microsoft (Azure, MCSA, MCSE)">Certificación Microsoft</option>
                                    <option value="Certificación AWS (Amazon Web Services)">Certificación AWS</option>
                                    <option value="Certificación Google Cloud">Certificación Google Cloud</option>
                                    <option value="Certificación CEH (Certified Ethical Hacker)">Certificación CEH</option>
                                    <option value="Certificación PMP (Project Management Professional)">Certificación PMP</option>
                                    <option value="Certificación ITIL (Gestión de Servicios TI)">Certificación ITIL</option>
                                    <option value="Certificación Scrum Master / Agile">Certificación Scrum Master</option>
                                </select>
                            </div>


                            <div className="informacion-registro">
                                <label htmlFor="telefono">Teléfono</label>
                                <input
                                    type="tel"
                                    id="telefono"
                                    name="telefono"
                                    placeholder="Teléfono"
                                    value={formulario.telefono}
                                    onChange={manejarCambiosInput}
                                />
                            </div>

                            <div className="informacion-registro">
                                <label htmlFor="correousuario">Correo Electrónico o Usuario</label>
                                <input
                                    type="email"
                                    id="correousuario"
                                    name="correousuario"
                                    placeholder="correo@ejemplo.com / Usuario"
                                    value={formulario.correousuario}
                                    onChange={manejarCambiosInput}
                                    required
                                />
                            </div>

                            <div className="informacion-registro">
                                <label htmlFor="usuario">Usuario</label>
                                <input
                                    type="text"
                                    id="usuario"
                                    name="usuario"
                                    placeholder="Nombre de usuario"
                                    value={formulario.usuario}
                                    onChange={manejarCambiosInput}
                                    required
                                />
                            </div>

                            <div className="informacion-registro">
                                <label htmlFor="contrasena">Contraseña</label>
                                <input
                                    type="password"
                                    id="contrasena"
                                    name="contrasena"
                                    placeholder="Contraseña"
                                    value={formulario.contrasena}
                                    onChange={manejarCambiosInput}
                                    autoComplete="new-password"
                                    required
                                />
                            </div>

                            <div className="boton-formulario-registro">
                                <button type="submit">Terminar registro</button>
                            </div>

                        </div>
                    </form>
                    <div className="descripcion">
                        <p>Completa el formulario para obtener los servicios que necesitas de esta plataforma.</p>
                    </div>
                </div>
            </div>
        </>
    )
}