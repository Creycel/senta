/*
Esta es la logica del negocio, aqui es donde se consulta, registra, actualiza y eliminan 
los registros de la base de datos desde el backend en la tabla Personas para la base de datos de SENTA.
*/

import { verificarConexionSENTA, mssql } from "../connection/db.ts";
import type { Personas } from "../models/persona.model.ts";

// Listar todas las personas de la tabla Personas desde la terminal (backend).
export async function verPersonas(): Promise<Personas[]> {
  const pool = await verificarConexionSENTA();
  const listado = await pool.request().query("SELECT * FROM Personas");
  return listado.recordset as Personas[];
}

// Agregar registros a la tabla Personas desde el backend.
export async function registrarPersona(
  nombre: string,
  apellidos: string,
  fechanacimiento: string,
  nacionalidad: string,
  pais: string,
  sexo: string,
  usuario: string,
  contrasena: string,
): Promise<void> {
  const pool = await verificarConexionSENTA();
  await pool
    .request()
    .input("nombre", mssql.VarChar, nombre)
    .input("apellidos", mssql.VarChar, apellidos)
    .input("fechanacimiento", mssql.Date, new Date(fechanacimiento))
    .input("nacionalidad", mssql.VarChar, nacionalidad)
    .input("pais", mssql.VarChar, pais)
    .input("sexo", mssql.Char, sexo)
    .input("usuario", mssql.VarChar, usuario)
    .input("contrasena", mssql.VarChar, contrasena).query(`
        INSERT INTO Personas(
            Nombre,
            Apellidos,
            FechaNacimiento,
            Nacionalidad,
            Pais,
            Sexo,
            Usuario,
            Contrasena
        )
        VALUES(
            @nombre,
            @apellidos,
            @fechanacimiento,
            @nacionalidad,
            @pais,
            @sexo,
            @usuario,
            @contrasena
        )`);
}

// Buscar una persona por su nombre de usuario para el proceso de Login.
// Este bloque de codigo me lo dio Gemini.com
export async function buscarPersonaPorUsuario(
  usuario: string,
): Promise<Personas | undefined> {
  try {
    const pool = await verificarConexionSENTA();
    const resultado = await pool
      .request()
      .input("usuario", mssql.VarChar, usuario)
      .query("SELECT * FROM Personas WHERE Usuario = @usuario");

    console.log(`Buscando al usuario "${usuario}" en la tabla Personas.`);
    console.log("Informacion del usuario:");
    console.table(resultado.recordset[0]);
    return resultado.recordset[0] as Personas | undefined;
  } catch (error) {
    console.error(
      `El ${usuario} parece no estar registrado en la base de datos: ${error}`,
    );
  }
}

// Actualizar registros en la tabla Personas desde el backend.
export async function actualizarPersona(
  idPersona: number,
  nombre?: string,
  apellidos?: string,
  fechanacimiento?: string,
  nacionalidad?: string,
  pais?: string,
  sexo?: string,
  usuario?: string,
  contrasena?: string,
): Promise<void> {
  const pool = await verificarConexionSENTA();
  await pool
    .request()
    .input("idPersona", mssql.Int, idPersona)
    .input("nombre", mssql.VarChar, nombre)
    .input("apellidos", mssql.VarChar, apellidos)
    .input(
      "fechanacimiento",
      mssql.Date,
      fechanacimiento ? new Date(fechanacimiento) : null,
    )
    .input("nacionalidad", mssql.VarChar, nacionalidad)
    .input("pais", mssql.VarChar, pais)
    .input("sexo", mssql.Char, sexo)
    .input("usuario", mssql.VarChar, usuario)
    .input("contrasena", mssql.VarChar, contrasena).query(`
        UPDATE Personas
        SET
            Nombre = @nombre,
            Apellidos = @apellidos,
            FechaNacimiento = @fechanacimiento,
            Nacionalidad = @nacionalidad,
            Pais = @pais,
            Sexo = @sexo,
            Usuario = @usuario,
            Contrasena = @contrasena
        WHERE IDPersona = @idPersona;
`);
}

// Eliminar registros de la tabla Personas desde la terminal (backend).
export async function eliminarPersona(
  idPersona: number, // IDPersona es el único campo necesario para el DELETE
): Promise<void> {
  const pool = await verificarConexionSENTA();
  await pool
    .request()
    .input("idPersona", mssql.Int, idPersona)
    .query("DELETE FROM Personas WHERE IDPersona = @idPersona;");
}
