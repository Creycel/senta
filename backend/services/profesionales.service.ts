/*
Esta es la logica del negocio, aqui es donde se consulta, registra, actualiza y eliminan 
los registros de la base de datos desde el backend en la tabla Profesionales para la base de datos de SENTA.
*/

import { mssql, verificarConexionSENTA } from "../connection/db.ts";

// Registrar profesional en la base de datos
export async function registrarProfesionales(
  nombre: string,
  apellidos: string,
  carreraespecializacion: string,
  telefono: string,
  correousuario: string,
  contrasena: string,
) {
  try {
    const pool = await verificarConexionSENTA();

    const query = `
      INSERT INTO Profesionales (Nombre, Apellidos, CarreraEspecializacion, Telefono, CorreoUsuario, Contrasena)
      VALUES (@nombre, @apellidos, @carrera, @telefono, @correo, @contrasena);
      
      SELECT SCOPE_IDENTITY() AS IDProfesional;
    `;

    const resultado = await pool
      .request()
      .input("nombre", mssql.VarChar(50), nombre)
      .input("apellidos", mssql.VarChar(100), apellidos)
      .input("carrera", mssql.VarChar(300), carreraespecializacion)
      .input("telefono", mssql.VarChar(30), telefono)
      .input("correo", mssql.VarChar(300), correousuario)
      .input("contrasena", mssql.VarChar(60), contrasena)
      .query(query);

    return resultado.recordset[0];
  } catch (error) {
    if (error instanceof Error) {
      // Detectar duplicados de SQL Server
      if (
        error.message.includes("duplicate") ||
        error.message.includes("UNIQUE")
      ) {
        throw new Error(
          "El correo o usuario ya existe en la base de datos (duplicada)",
        );
      }
    }
    throw error;
  }
}

// Obtener todos los profesionales
export async function obtenerTodosProfesionales() {
  try {
    const pool = await verificarConexionSENTA();

    const query = `
      SELECT 
        IDProfesional,
        Nombre,
        Apellidos,
        CarreraEspecializacion,
        Telefono,
        CorreoUsuario,
        CONVERT(VARCHAR, GETDATE(), 120) as FechaConsulta
      FROM Profesionales
      ORDER BY IDProfesional DESC
    `;

    const resultado = await pool.request().query(query);
    return resultado.recordset;
  } catch (error) {
    console.error("Error al obtener profesionales:", error);
    throw error;
  }
}

// Obtener profesionales nuevos desde un ID específico (para polling)
export async function obtenerProfesionalesDesde(desdeId: number) {
  try {
    const pool = await verificarConexionSENTA();

    const query = `
      SELECT 
        IDProfesional,
        Nombre,
        Apellidos,
        CarreraEspecializacion,
        Telefono,
        CorreoUsuario
      FROM Profesionales
      WHERE IDProfesional > @desdeId
      ORDER BY IDProfesional DESC
    `;

    const resultado = await pool
      .request()
      .input("desdeId", mssql.Int, desdeId)
      .query(query);

    return resultado.recordset;
  } catch (error) {
    console.error("Error al obtener profesionales desde ID:", error);
    throw error;
  }
}
