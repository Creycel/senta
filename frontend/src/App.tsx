import { Route, Routes } from "react-router-dom";
import Bienvenida from "../src/Bienvenida";
import IniciarSesion from "./auth/IniciarSesion";
import RegistroPersona from "./auth/RegistroPersona";
import RegistroEmpresas from "./auth/RegistroEmpresa";
import RegistroProfesionales from "./auth/RegistroProfesionales";
import ProtectedRoute from "./router/ProtectedRoute";
import Blog from "./blog/Blog";
import Servicios from "./components/Servicios";
import Contacto from "./components/Contacto";
import Cuenta from "./components/Cuenta";
import Inicio from "./display/Inicio";

export default function App() {
  return (
    <Routes>
      {/* PANTALLA INICIAL */}
      <Route path="/" element={<Bienvenida />} />

      {/* AUTENTICACIÓN */}
      <Route path="/login" element={<IniciarSesion />} />
      <Route path="/registro/persona" element={<RegistroPersona />} />
      <Route path="/registro/empresa" element={<RegistroEmpresas />} />
      <Route path="/registro/profesionales" element={<RegistroProfesionales />} />

      {/* RUTAS PROTEGIDAS */}
      <Route
        path="/inicio"
        element={
          <ProtectedRoute>
            <Inicio />
          </ProtectedRoute>
        }
      />

      <Route
        path="/servicios"
        element={
          <ProtectedRoute>
            <Servicios />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contacto"
        element={
          <ProtectedRoute>
            <Contacto />
          </ProtectedRoute>
        }
      />

      <Route
        path="/blog"
        element={
          <ProtectedRoute>
            <Blog />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cuenta"
        element={
          <ProtectedRoute>
            <Cuenta />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
