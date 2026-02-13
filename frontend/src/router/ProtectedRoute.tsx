import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useContext, type ReactNode } from "react";


interface Prop {
    children: ReactNode
}

export default function ProtectedRoute({ children }: Prop) {
    const { autenticado } = useContext(AuthContext)

    if (!autenticado) {
        return <Navigate to="/" />
    }

    return children
}