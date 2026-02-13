import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../auth/Registro.css"
import logo from "../media/senta-logo.png"
import api from "../api/api";

export default function RegistroEmpresas() {
    const { registrarse } = useContext(AuthContext)
    const navigate = useNavigate()

    const [formulario, setFormulario] = useState({
        nombre: "",
        tamano: "",
        formajuridica: "",
        actividadeconomica: "",
        alcancegeografico: "",
        direccion: "",
        telefono: "",
        correo: "",
        usuario: "",
        contrasena: ""
    })


    const manejarCambiosInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value })
    }

    const manejarCambiosSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value })
    }

    const manejarEnviados = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.post("/api/empresas/registro", formulario);
            console.log("Datos enviados:", formulario);
            alert("Empresa registrada de manera correcta")

            registrarse()
            navigate("/inicio")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // Mostrar el mensaje de error del servidor
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
                    <p>Esta sección es única y exclusivamente para registrar tu empresa en Senta.</p>
                </div>

                {/* {Se supone que la direccion sea "/IniciarSesion", pero es "/". Tengo que corregirla} */}
                <div className="otro-formulario-registro">
                    <div className="formulario-persona">
                        <Link to={"/Registro/persona"}>Registra tu persona</Link>
                    </div>
                    {/* 
                    <div className="formulario-profesional">
                        <Link to={""}>Registrate como profesional TI</Link>
                    </div>
                    */}
                </div>



                <div className="dentro-cuerpo-registro">
                    <form onSubmit={manejarEnviados}>
                        <div className="cuerpo-formulario-registro">

                            <div className="informacion-registro">
                                <label htmlFor="">Nombre </label>
                                <input type="text" name="nombre" placeholder="Nombre" onChange={manejarCambiosInput} required />
                            </div>

                            <div className="informacion-registro">
                                <label htmlFor="">Tamaño</label>
                                <select id="tamano" name="tamano" onChange={manejarCambiosSelect} required>
                                    <option value="" disabled selected>- - -</option>
                                    <option value="Microempresa">Microempresa</option>
                                    <option value="PYMES">PYMES</option>
                                    <option value="Grande">Grande</option>
                                </select>
                            </div>

                            <div className="informacion-registro">
                                <label htmlFor="">Forma jurídica</label>
                                <select id="formajuridica" name="formajuridica" onChange={manejarCambiosSelect} required>
                                    <option value="" disabled selected>- - -</option>
                                    <option value="Empresario individual">Empresario individual</option>
                                    <option value="Sociedades">Sociedades</option>
                                    <option value="Sociedad Anónima (S.A.)">Sociedad Anónima (S.A.)</option>
                                    <option value="Sociedad de Responsabilidad Limitada (S.R.L.)">Sociedad de Responsabilidad Limitada (S.R.L.)</option>
                                    <option value="Sociedad en comandita">Sociedad en comandita</option>
                                    <option value="Sociedad colectiva">Sociedad colectiva</option>
                                    <option value="Sociedad cooperativa">Sociedad cooperativa</option>
                                </select>
                            </div>

                            <div className="informacion-registro">
                                <label htmlFor="">Actividad económica</label>
                                <select id="actividadeconomica" name="actividadeconomica" onChange={manejarCambiosSelect} required>
                                    <option value="" disabled selected>- - -</option>
                                    <option value="Sector primario">Sector primario</option>
                                    <option value="Sector secundario">Sector secundario</option>
                                    <option value="Sector terciario">Sector terciario</option>
                                    <option value="Sector cuaternario">Sector cuaternario</option>
                                </select>
                            </div>

                            <div className="informacion-registro">
                                <label htmlFor="">Alcance geográfico</label>
                                <select id="alcancegeografico" name="alcancegeografico" onChange={manejarCambiosSelect} required>
                                    <option value="" disabled selected>- - -</option>
                                    <option value="Local">Local</option>
                                    <option value="Regional">Regional</option>
                                    <option value="Nacional">Nacional</option>
                                    <option value="Internacional o multinacional">Internacional o multinacional</option>
                                </select>
                            </div>

                            <div className="informacion-registro">
                                <label htmlFor="">Dirección</label>
                                <input type="text" name="direccion" placeholder="Dirección" onChange={manejarCambiosInput} />
                            </div>

                            <div className="informacion-registro">
                                <label htmlFor="">Teléfono</label>
                                <input type="text" name="telefono" placeholder="Teléfono" onChange={manejarCambiosInput} />
                            </div>

                            <div className="informacion-registro">
                                <label htmlFor="">Correo </label>
                                <input type="text" name="correo" placeholder="Correo" onChange={manejarCambiosInput} required />
                            </div>

                            <div className="informacion-registro">
                                <label htmlFor="">Usuario</label>
                                <input type="text" name="usuario" placeholder="Usuario" onChange={manejarCambiosInput} />
                            </div>

                            <div className="informacion-registro">
                                <label htmlFor="">Contraseña </label>
                                <input type="password" name="contrasena" placeholder="Contraseña" onChange={manejarCambiosInput} required />
                            </div>

                            <div className="boton-formulario-registro">
                                <button>Terminar registro</button>
                            </div>
                        </div>
                        <div className="descripcion">
                            <p>Completa el formulario para obtener los servicios que necesitas de esta plataforma.</p>
                        </div>
                    </form>
                </div>
                <div className="enelace-inicio-de-sesion-registro">
                    {/* {Se supone que la direccion sea "/IniciarSesion", pero es "/". Tengo que corregirla} */}
                    <Link to={"/"}>Inicia sesion</Link>
                </div>
            </div>


        </>
    )
}