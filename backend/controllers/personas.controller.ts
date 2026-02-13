/*
Es aqui donde se ponen las condiciones de la manera en la que se realizaran los registros del sistema hacia la base de datos desde el bakend.
Aqui es donde pongo las condiciones reales para todos los registros de la tabla Personas.
*/

import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  verPersonas,
  registrarPersona,
  actualizarPersona,
  eliminarPersona,
  buscarPersonaPorUsuario,
} from "../services/personas.service.ts";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function listarPersonas(req: Request, res: Response) {
  try {
    const personas = await verPersonas();
    res.json(personas);
  } catch (error) {
    console.error("Error al listar personas:", error);
    res.status(500).json({
      error:
        "Error. No se puede ver la lista de personas registradas en nuestra base de datos.",
    });
  }
}

export async function agregarPersona(req: Request, res: Response) {
  try {
    const {
      nombre,
      apellidos,
      fechanacimiento,
      nacionalidad,
      pais,
      sexo,
      usuario,
      contrasena,
    } = req.body;

    if (fechanacimiento < 2007) {
      console.log(
        "Las personas no menos de 18 anos no pueden registrarse a la base de datos",
      );
      return res.status(400).json({
        error:
          "Las personas no menos de 18 anos no pueden registrarse a la base de datos",
      });
    }

    if (!contrasena) {
      return res.status(400).json({
        error:
          "La personas que se esta registrando debe de agregar una contraseña",
      });
    }

    // hash de contraseña
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedContrasena = await bcrypt.hash(contrasena, salt);

    await registrarPersona(
      nombre,
      apellidos,
      fechanacimiento,
      nacionalidad,
      pais,
      sexo,
      usuario,
      hashedContrasena,
    );

    const fechaNacimiento = new Date(fechanacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

    try {
      console.log("\nProcesando nuevo registro...");
      if (edad >= 18) {
        console.log(
          `La persona ${nombre} ${apellidos} se ha registrado en la base de datos.`,
        );
      } else if (fechanacimiento <= "2007") {
        console.log(
          `La persona ${nombre} ${apellidos} no comple con la edad suficiente para registrarse en la base de datos.`,
        );
      }
    } catch (error) {
      console.error("No se puede, por eso: " + error);
    }

    console.log(`El usuario ${usuario} ya esta afiliado a la base de datos.`);

    res.json({
      message: `${nombre} ${apellidos} se ha registrado a la base de datos como  ${usuario} de manera exitosa. \nFecha: ${new Date().toLocaleString()}`,
    });
  } catch (error) {
    console.error(`Error al intentar hacer el nuevo registro: ${error}`);

    if (error instanceof Error && error.message.includes("duplicada")) {
      return res.status(409).json({
        error: "El usuario o correo electrónico ya existe.",
      });
    }

    res.status(500).json({
      error: "Error interno del servidor. La persona no se pudo registrar.",
    });
  }
}

export async function modificarPersona(req: Request, res: Response) {
  try {
    const { IDPersona } = req.params; // IDPersona es un string desde los params

    const {
      nombre,
      apellidos,
      fechanacimiento,
      nacionalidad,
      pais,
      sexo,
      usuario,
      contrasena,
    } = req.body;

    if (!IDPersona) {
      return res.status(400).json({ error: "IDPersona es requerido." });
    }

    // Encriptar la contraseña si viene una nueva
    let hashedContrasena: string | undefined = undefined;
    if (contrasena) {
      hashedContrasena = await bcrypt.hash(contrasena, 10);
    }

    await actualizarPersona(
      Number(IDPersona),
      nombre,
      apellidos,
      fechanacimiento,
      nacionalidad,
      pais,
      sexo,
      usuario,
      hashedContrasena,
    );

    res.json({ message: `El usuario con ID ${IDPersona} se ha actualizado.` });
  } catch (error) {
    console.error("Error al actualizar la persona:", error);
    res.status(500).json({
      error: "Error al actualizar la persona.",
    });
  }
}

export async function excluirPersona(req: Request, res: Response) {
  try {
    const { IDPersona } = req.params;
    const { nombre, apellidos } = req.body;
    await eliminarPersona(Number(IDPersona));
    res.json({
      message: `El usuario ${nombre} ${apellidos}\nID: ${IDPersona}\nFecha: ${new Date().toLocaleString()}`,
    });
  } catch (error) {
    console.error("Error al eliminar la persona:", error);
    res.status(500).json({ error: "Error al eliminar la persona." });
  }
}

// Otro bloque de codigo que me dio Gemini.com despues de tantos errores...
//Funcion de login que el frontend está esperando
export async function iniciarSesion(req: Request, res: Response) {
  try {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
      return res
        .status(400)
        .json({ message: "Usuario y contraseña son requeridos." });
    }

    const persona = await buscarPersonaPorUsuario(usuario);

    if (!persona) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const esContrasenaValida = await bcrypt.compare(
      contrasena,
      persona.Contrasena,
    );

    if (!esContrasenaValida) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    // Generar JWT (TENGO QUE ESTUDIAR MAS ESTO...)
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const token = jwt.sign(
      { id: persona.IDPersona, usuario: persona.Usuario },
      JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({
      message: "Inicio de sesión exitoso.",
      usuario: persona.Usuario,
      token,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({
      error: "Error interno del servidor. No se pudo iniciar sesión.",
    });
  }
}
