import { type ReactNode, useState } from "react";
import AuthContext from "./AuthContext";

interface Prop {
    children: ReactNode,
}

export default function AuthProvider({ children }: Prop) {
    // Estado global de autenticacion
    const [autenticado, setAutenticado] = useState(false)

    // Funcion para registrarse
    const registrarse = () => {
        setAutenticado(true)
    }

    // Funcion para iniciar sesion
    const iniciarSesion = () => {
        setAutenticado(true)
    }

    // Funcion para cerrar sesion
    const cerrarSesion = () => {
        setAutenticado(false)
    }

    return (
        <AuthContext.Provider value={{ autenticado, registrarse, iniciarSesion, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    )
}