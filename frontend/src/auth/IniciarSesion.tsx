import axios from "axios";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../auth/IniciarSesion.css"
import logo from "../media/senta-logo.png"
import api from "../api/api";

export default function IniciarSesion() {
    const { iniciarSesion } = useContext(AuthContext)
    const navigate = useNavigate()

    const [formulario, setFormulario] = useState({
        usuario: "",
        contrasena: ""
    });

    const manejarCambios = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };

    // Este bluque de condigo me lo dio chatGPT.com
    // Estaba cogiendo lucha con eso. Tengo que estudiarlo.
    const manejarEnviados = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let res = null;
            let ultimoError = null;

            const endpoints = [
                { url: "/api/empresas/login", tipo: "empresa" },
                { url: "/api/personas/login", tipo: "persona" },
                { url: "/api/profesionales/login", tipo: "profesional" }
            ];

            for (const ep of endpoints) {
                try {
                    res = await api.post(ep.url, formulario);
                    break;
                } catch (error) {
                    ultimoError = error;
                    continue;
                }
            }

            if (!res) {
                // Verifica si el error es de conexión
                if (axios.isAxiosError(ultimoError) && ultimoError.code === 'ERR_NETWORK') {
                    alert("No se puede conectar al servidor. Verifica que el backend esté ejecutándose.");
                } else {
                    alert("Credenciales inválidas o usuario no encontrado.");
                }
                return;
            }

            alert("Bienvenido " + res.data.usuario);
            localStorage.setItem("token", res.data.token);
            iniciarSesion();
            navigate("/inicio");

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                alert("Error al iniciar sesión: " + (error.response?.data?.message || "Credenciales inválidas"));
                return;
            }

            const err = error as Error;
            alert("Error inesperado: " + err.message);
        }
    };
    return (
        <>
            <div className="logo-iniciosesion">
                <img src={logo} alt="senta-logo-png" width={200} height={200} />
            </div>

            <div className="cuerpo-iniciosesion">
                <div className="dentro-cuerpo-iniciosesion">
                    <form onSubmit={manejarEnviados}>
                        <div className="cuerpo-formulario-iniciosesion">
                            <div className="informacion-iniciosesion">
                                <label htmlFor="usuario">Usuario</label>
                                <input type="text" id="usuario" name="usuario" placeholder="Usuario" autoComplete="username" onChange={manejarCambios} required />
                            </div>

                            <div className="informacion-iniciosesion">
                                <label htmlFor="contrasena">Contraseña</label>
                                <input type="password" id="contrasena" name="contrasena" placeholder="Contraseña" autoComplete="current-password" onChange={manejarCambios} required />
                            </div>

                            <div className="boton-formulario-iniciosesion">
                                <button type="submit">Iniciar</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="enelace-inicio-de-sesion-iniciosesion">
                    <Link to={"/Registro/persona"}>Registrarse como persona o empresa</Link>
                </div>
            </div>
        </>
    );
}
