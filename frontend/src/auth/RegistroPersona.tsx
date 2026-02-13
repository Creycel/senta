import axios from "axios"
import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../auth/Registro.css"
import logo from "../media/senta-logo.png"

export default function RegistroPersona() {
    const { registrarse } = useContext(AuthContext)
    const navigate = useNavigate()

    const [formulario, setFormulario] = useState({
        nombre: "",
        apellidos: "",
        fechanacimiento: "",
        nacionalidad: "",
        pais: "",
        sexo: "",
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
            await axios.post(
                "http://localhost:3000/api/personas/registro",
                formulario
            )

            alert("Usuario registrado correctamente")

            registrarse()
            navigate("/inicio")
        } catch (error: unknown) {
            alert("Error al registrar: " + error)
            console.log(error)
        }
    }

    return (
        <>
            <div className="logo-registro">
                <img src={logo} alt="senta-logo-png" width={200} height={200} />
            </div>
            <div className="cuerpo">
                <div className="descripcion">
                    <p>Esta sección es única y exclusivamente para registrarse como persona en Senta.</p>
                </div>

                {/* {Se supone que la direccion sea "/IniciarSesion", pero es "/". Tengo que corregirla} */}
                <div className="otro-formulario-registro">
                    <div className="formulario-empresa">
                        <Link to={"/Registro/empresa"}>Registra tu empresa</Link>
                    </div>
                    {/* 
                    <div className="formulario-profesional">
                        <Link to={"/registro/profesionales"}>Registrate como profesional TI</Link>
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
                                <label htmlFor="">Apellidos </label>
                                <input type="text" name="apellidos" placeholder="Apellidos" onChange={manejarCambiosInput} required />
                            </div>

                            <div className="informacion-registro">
                                <label htmlFor="">Fecha de nacimiento </label>
                                <input type="date" name="fechanacimiento" placeholder="Fecha de nacimiento" onChange={manejarCambiosInput} />
                            </div>

                            <div className="informacion-registro">
                                {/* {Seleccion multiple de opciones para los paises} */}
                                <label htmlFor="">Nacionalidad </label>
                                <select id="nacionalidad" name="nacionalidad" onChange={manejarCambiosSelect} required>
                                    <option value="" disabled selected>Nacionalidad</option>
                                    <option value="India">India</option>
                                    <option value="Estadounidense">Estadounidense</option>
                                    <option value="China">China</option>
                                    <option value="Alemana">Alemana</option>
                                    <option value="Británica">Británica</option>
                                    <option value="Canadiense">Canadiense</option>
                                    <option value="Francesa">Francesa</option>
                                    <option value="Brasileña">Brasileña</option>
                                    <option value="Vietnamita">Vietnamita</option>
                                    <option value="Filipina">Filipina</option>
                                    <option value="Nigeriana">Nigeriana</option>
                                    <option value="Ucraniana">Ucraniana</option>
                                    <option value="Polaca">Polaca</option>
                                    <option value="Mexicana">Mexicana</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Rusa">Rusa</option>
                                    <option value="Sudafricana">Sudafricana</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Tailandesa">Tailandesa</option>
                                    <option value="Coreana">Coreana</option>
                                    <option value="Dominicana">Dominicana</option>
                                </select>
                            </div>

                            <div className="informacion-registro">
                                <label htmlFor="">Pais </label>
                                {/* {Seleccion multiple de paises} */}
                                <select id="pais" name="pais" onChange={manejarCambiosSelect} required>
                                    <option value="" disabled selected>País</option>
                                    <option value="India">India</option>
                                    <option value="Estados Unidos">Estados Unidos</option>
                                    <option value="China">China</option>
                                    <option value="Alemania">Alemania</option>
                                    <option value="Reino Unido">Reino Unido</option>
                                    <option value="Canadá">Canadá</option>
                                    <option value="Francia">Francia</option>
                                    <option value="Brasil">Brasil</option>
                                    <option value="Vietnam">Vietnam</option>
                                    <option value="Filipinas">Filipinas</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Ucrania">Ucrania</option>
                                    <option value="Polonia">Polonia</option>
                                    <option value="México">México</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Rusia">Rusia</option>
                                    <option value="Sudáfrica">Sudáfrica</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Tailandia">Tailandia</option>
                                    <option value="Corea del Sur">Corea del Sur</option>
                                    <option value="República Dominicana">República Dominicana</option>
                                </select>
                            </div>

                            <div className="informacion-registro">
                                <label htmlFor="">Sexo </label>
                                {/* {Seleccion multiple de sexo} */}
                                <select id="sexo" name="sexo" onChange={manejarCambiosSelect} required>
                                    <option value="" disabled selected>Sexo</option>
                                    <option value="M">M</option>
                                    <option value="F">F</option>
                                </select>
                            </div>

                            <div className="informacion-registro">
                                <label htmlFor="">Usuario </label>
                                <input type="text" name="usuario" placeholder="Ususario" onChange={manejarCambiosInput} required />
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