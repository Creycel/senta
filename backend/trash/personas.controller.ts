// Control de registros en la base de datos.
// REGISTROS DE LA TABLA Persona
import { Router } from "express";
import { verificarConexionSENTA, sql } from "../connection/db.ts";
import bcrypt from "bcrypt";

const router = Router();

// VER PERSONAS  (GET /personas)
export const verPersonas = async (_req: any, res: any) => {
  try {
    const pool = await verificarConexionSENTA();
    const resultado = await pool
      ?.request()
      .query(
        "SELECT Nombre, Apellidos, FechaNacimiento, Edad, Nacionalidad, Pais, Sexo, Usuario, Contrasena FROM Personas;",
      );

    console.table(resultado?.recordset);
    res.json(resultado?.recordset);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error obteniendo personas", detalle: error });
  }
};

//REGISTRAR PERSONA  (POST /personas)
export const registrarPersona = async (req: any, res: any) => {
  const {
    Nombre,
    Apellidos,
    FechaNacimiento,
    Nacionalidad,
    Pais,
    Sexo,
    Usuario,
    Contrasena,
  } = req.body;

  const database = "senta";

  try {
    // Encriptando contraseña
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedContrasena = await bcrypt.hash(Contrasena, salt);

    const pool = await verificarConexionSENTA();
    if (!pool)
      throw new Error("No se pudo establecer conexión con la base de datos");

    const resultado = await pool
      .request()
      .input("Nombre", sql.VarChar(50), Nombre)
      .input("Apellidos", sql.VarChar(100), Apellidos)
      .input("FechaNacimiento", sql.VarChar, FechaNacimiento.split("T")[0])
      .input("Nacionalidad", sql.VarChar(30), Nacionalidad)
      .input("Pais", sql.VarChar(50), Pais)
      .input("Sexo", sql.Char(1), Sexo)
      .input("Usuario", sql.VarChar(35), Usuario)
      .input("Contrasena", sql.VarChar(60), hashedContrasena).query(`
        INSERT INTO Personas (Nombre, Apellidos, FechaNacimiento, Nacionalidad, Pais, Sexo, Usuario, Contrasena)
        VALUES (@Nombre, @Apellidos, @FechaNacimiento, @Nacionalidad, @Pais, @Sexo, @Usuario, @Contrasena)
      `);

    res.json({
      message: `Registro insertado en "${database}"`,
      filasAfectadas: resultado.rowsAffected,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error registrando persona",
      detalle: error,
    });
  }
};

//ELIMINAR PERSONA (DELETE /personas/:usuario)
export const eliminarPersona = async (req: any, res: any) => {
  const { usuario } = req.params;

  try {
    const pool = await verificarConexionSENTA();

    const resultado = await pool
      ?.request()
      .input("Usuario", sql.VarChar(35), usuario)
      .query("DELETE FROM Personas WHERE Usuario = @Usuario");

    res.json({
      message: `Usuario ${usuario} eliminado`,
      resultado,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error eliminando usuario ${usuario}`,
      detalle: error,
    });
  }
};

// ACTUALIZAR PERSONA (PUT /personas/:usuario)
export const actualizarPersona = async (req: any, res: any) => {
  const { usuario } = req.params;

  const {
    Nombre,
    Apellidos,
    FechaNacimiento,
    Nacionalidad,
    Pais,
    Sexo,
    Contrasena,
  } = req.body;

  try {
    const pool = await verificarConexionSENTA();

    const resultado = await pool
      ?.request()
      .input("Nombre", Nombre)
      .input("Apellidos", Apellidos)
      .input("FechaNacimiento", FechaNacimiento)
      .input("Nacionalidad", Nacionalidad)
      .input("Pais", Pais)
      .input("Sexo", Sexo)
      .input("Usuario", usuario)
      .input("Contrasena", Contrasena).query(`
        UPDATE Personas
        SET 
          Nombre = @Nombre,
          Apellidos = @Apellidos,
          FechaNacimiento = @FechaNacimiento,
          Nacionalidad = @Nacionalidad,
          Pais = @Pais,
          Sexo = @Sexo,
          Contrasena = @Contrasena
        WHERE Usuario = @Usuario;
      `);

    res.json({
      message: `Usuario ${usuario} actualizado`,
      filasAfectadas: resultado?.rowsAffected?.[0],
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar la persona",
      detalle: error,
    });
  }
};

console.log(verPersonas);
