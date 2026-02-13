import { createContext } from "react";


interface AuthContextType {
    autenticado: boolean;
    registrarse: () => void;
    iniciarSesion: () => void;
    cerrarSesion: () => void;
}

const AuthContext = createContext<AuthContextType>(
    {
        autenticado: false,
        registrarse: () => { },
        iniciarSesion: () => { },
        cerrarSesion: () => { },
    }
);

export default AuthContext;