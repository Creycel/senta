/*
Esta es la logica del negocio, aqui es donde se consulta, registra, actualiza y eliminan 
los registros de la base de datos desde el backend en la tabla Empresas para la base de datos de SENTA.
*/

// Pool de conexiones
import { verificarConexionSENTA, mssql } from "../connection/db.ts";
import type Empresas from "../models/empresa.model.ts";

// Consultar registros de la tabla Empresas
export async function verEmpresas(): Promise<Empresas[]> {
  const pool = await verificarConexionSENTA();
  const listado = await pool.request().query("SELECT * FROM Empresas");
  return listado.recordset as Empresas[];
}

// Registrar empresas en la tabla Empresas
export async function registrarEmpresa(
  nombre: string,
  tamano: string,
  formajuridica: string,
  actividadeconomica: string,
  alcancegeografico: string,
  direccion: string,
  telefono: string,
  correo: string,
  usuario: string,
  contrasena: string,
): Promise<void> {
  const pool = await verificarConexionSENTA();
  await pool
    .request()
    .input("nombre", mssql.VarChar, nombre)
    .input("tamano", mssql.VarChar, tamano)
    .input("formajuridica", mssql.VarChar, formajuridica)
    .input("actividadeconomica", mssql.VarChar, actividadeconomica)
    .input("alcancegeografico", mssql.VarChar, alcancegeografico)
    .input("direccion", mssql.VarChar, direccion)
    .input("telefono", mssql.VarChar, telefono)
    .input("correo", mssql.VarChar, correo)
    .input("usuario", mssql.VarChar, usuario)
    .input("contrasena", mssql.VarChar, contrasena).query(`
    INSERT INTO Empresas(
      Nombre,
      Tamano,
      FormaJuridica,
      ActividadEconomica,
      AlcanceGeografico,
      Direccion,
      Telefono,
      Correo,
      Usuario,
      Contrasena
    ) VALUES(
      @nombre,
      @tamano,
      @formajuridica,
      @actividadeconomica,
      @alcancegeografico,
      @direccion,
      @telefono,
      @correo,
      @usuario,
      @contrasena)
`);
}

// Buscar una empresa por su nombre de usuario para el proceso de Login.
// Este bloque de codigo me lo dio Gemini.com
export async function buscarEmpresas(
  usuario: string,
): Promise<Empresas | undefined> {
  const pool = await verificarConexionSENTA();
  const result = await pool
    .request()
    .input("usuario", mssql.VarChar, usuario)
    .query("SELECT * FROM Empresas WHERE Usuario = @usuario");

  const registro = result.recordset[0];

  if (!registro) {
    return undefined;
  }

  // Mapear las columnas de SQL Server (PascalCase) a tu interfaz (camelCase)
  return {
    IDEmpresa: registro.IDEmpresa,
    nombre: registro.Nombre,
    tamano: registro.Tamano,
    formajuridica: registro.FormaJuridica,
    actividadeconomica: registro.ActividadEconomica,
    alcancegeografico: registro.AlcanceGeografico,
    direccion: registro.Direccion,
    telefono: registro.Telefono,
    correo: registro.Correo,
    usuario: registro.Usuario,
    contrasena: registro.Contrasena, // ✅ Esto es lo importante
  } as Empresas;
}

// Actualizar registros en la tabla Empresas desde el backend.
export async function actualizarEmpresas(
  IDEmpresa: number,
  nombre: string,
  tamano: string,
  formajuridica: string,
  actividadeconomica: string,
  alcancegeografico: string,
  direccion: string,
  telefono: string,
  correo: string,
  usuario: string,
  contrasena: string,
): Promise<void> {
  const pool = await verificarConexionSENTA();
  await pool
    .request()
    .input("IDEmpresa", mssql.Int, IDEmpresa)
    .input("nombre", mssql.VarChar, nombre)
    .input("tamano", mssql.VarChar, tamano)
    .input("formajuridica", mssql.VarChar, formajuridica)
    .input("actividadeconomica", mssql.VarChar, actividadeconomica)
    .input("alcancegeografico", mssql.VarChar, alcancegeografico)
    .input("direccion", mssql.VarChar, direccion)
    .input("telefono", mssql.VarChar, telefono)
    .input("correo", mssql.VarChar, correo)
    .input("usuario", mssql.VarChar, usuario)
    .input("contrasena", mssql.VarChar, contrasena).query(`
    UPDATE Empresas SET
      Nombre = @nombre,
      Tamano = @tamano,
      FormaJuridica = @formajuridica,
      ActividadEconomica = @actividadeconomica,
      AlcanceGeografico = @alcancegeografico,
      Direccion = @direccion,
      Telefono = @telefono,
      Correo = @correo,
      Usuario = @usuario,
      Contrasena = @contrasena
    WHERE IDEmpresa = @IDEmpresa;`);
}
// Eliminar registros de la tabla Empresas desde la terminal (backend).
export async function eliminarEmpresas(IDEmpresa: number): Promise<void> {
  const pool = await verificarConexionSENTA();
  await pool
    .request()
    .input("IDEmpresa", mssql.Int, IDEmpresa)
    .query(`DELETE FROM Empresas WHERE IDEmpresa = @IDEmpresa;`);
}
