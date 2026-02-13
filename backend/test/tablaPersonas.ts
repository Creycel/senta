/* - - - - - - - - - - - - - - - - - - - - - - - - - - REGISTROS DE LA TABLA Persona - - - - - - - - - - - - - - - - - - - - - - - - - - */

import { verificarConexionSENTA, mssql } from "../connection/db.ts";
import bcrypt from "bcrypt";

export const verPersonas = async () => {
  try {
    const pool = await verificarConexionSENTA();
    const resultado = await pool
      ?.request()
      .query(
        "SELECT Nombre, Apellidos, FechaNacimiento, Edad, Nacionalidad, Pais, Sexo, Usuario, Contrasena FROM Personas;"
      );

    console.table("Resultados de la tabla Persona");
    console.log(`Total de personas: ${resultado?.rowsAffected}`)
    console.table(resultado?.recordset);
  } catch (error) {
    try {
      console.log(error);
    } catch (error) {
      alert(error);
    }
  }
};

const registrarPersona = async (
  Nombre: string,
  Apellidos: string,
  FechaNacimiento: string,
  Nacionalidad: string,
  Pais: string,
  Sexo: string,
  Usuario: string,
  Contrasena: string
) => {
  const database = "senta";
  try {
    // Encriptando las contrasenas
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedContrasena = await bcrypt.hash(Contrasena, salt);

    // Iniciando los registros de la tabla Persona
    const pool = await verificarConexionSENTA();
    if (!pool)
      throw new Error("No se pudo establecer conexión con la base de datos");

    const resultado = await pool
      .request()
      .input("Nombre", mssql.VarChar(50), Nombre)
      .input("Apellidos", mssql.VarChar(100), Apellidos)
      .input("FechaNacimiento", mssql.VarChar, FechaNacimiento.split("T")[0])
      .input("Nacionalidad", mssql.VarChar(30), Nacionalidad)
      .input("Pais", mssql.VarChar(50), Pais)
      .input("Sexo", mssql.Char(1), Sexo)
      .input("Usuario", mssql.VarChar(35), Usuario)
      .input("Contrasena", mssql.VarChar(60), hashedContrasena).query(`
        INSERT INTO Personas (Nombre, Apellidos, FechaNacimiento, Nacionalidad, Pais, Sexo, Usuario, Contrasena)
        VALUES (@Nombre, @Apellidos, @FechaNacimiento, @Nacionalidad, @Pais, @Sexo, @Usuario, @Contrasena)
      `);

    console.log(
      `Registro insertado en "${database}"... filas afectadas = ${resultado.rowsAffected}`
    );
  } catch (error) {
    if (Usuario == Usuario) {
      console.log(`El usuario ${Usuario} ya existe`);
    } else if (Usuario.length > 60) {
      console.log(
        `Excediste el máximo de caracteres para generar tu contraseña`
      );
    } else {
      console.log(`Esos caracteres estan raros`);
    }
    console.error(
      `Error de registro en la base de datos "${database}": ➡ ${error}`
    );
  }
};

const eliminarPersona = async (Usuario: string /* Contrasena: string */) => {
  try {
    const pool = await verificarConexionSENTA();
    const resultado = await pool
      ?.request()
      .input("Usuario", Usuario)
      //.input("Usuario", Contrasena)
      .query("DELETE FROM Personas WHERE Usuario = @Usuario");

    console.log(`El usuario ${Usuario} fue eliminado de la tabla Personas`);
    console.log(`Filas eliminadas ${resultado?.recordsets}`);
  } catch (error) {
    console.log(`Error al intentar eliminar al usuario ${Usuario}`);
    console.log(
      `${error}: Para eliminar usuarios necesitas proveer el nombre del usuario y su contrasena`
    );
  }
};

const actualizarPersona = async (
  Nombre: string,
  Apellidos: string,
  FechaNacimiento: string,
  Nacionalidad: string,
  Pais: string,
  Sexo: string,
  Usuario: string,
  Contrasena: string
) => {
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
      .input("Usuario", Usuario)
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

    if ((resultado?.rowsAffected?.[0] ?? 0) > 0) {
      console.log(
        `Persona con usuario '${Usuario}' actualizada correctamente.`
      );
    } else {
      console.log(`No se encontró una persona con el usuario '${Usuario}'.`);
    }
  } catch (error) {
    console.error("Error al actualizar la persona:", error);
  }
};

// registrarPersona(
//   "Jonas",
//   "Cuevas Serafin",
//   "2000-07-14",
//   "Dominicana",
//   "República Dominicana",
//   "M",
//   "Jonas",
//   "0000"
// );

// actualizarPersona(
//   "Jonas", // Nombre's
//   "Cueva Serafin", // Apellidos
//   "", // Fecha de nacimiento
//   "", // Nacionalidad
//   "", // Pais
//   "", // Sexo (Genero)
//   "", // Nombre de usuario
//   "" // Contrasena
// );

//eliminarPersona("Jonas");

verPersonas();
