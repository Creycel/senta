/*
Es aqui donde se ponen las condiciones de la manera en la que se realizaran los registros del sistema hacia la base de datos desde el bakend.
Aqui es donde pongo las condiciones reales para todos los registros de la tabla Empresas.
*/

/*
Es aqui donde se ponen las condiciones de la manera en la que se realizaran los registros del sistema hacia la base de datos desde el bakend.
Aqui es donde pongo las condiciones reales para todos los registros de la tabla Empresas.
*/
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  verEmpresas,
  registrarEmpresa,
  actualizarEmpresas,
  buscarEmpresas,
  eliminarEmpresas,
} from "../services/empresas.service.ts";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Ver empreas
export async function listarEmpresas(req: Request, res: Response) {
  try {
    const empresas = await verEmpresas();
    res.json(empresas);
    console.log(`Listado de empresas: ${empresas}`);
  } catch (error) {
    console.error(
      `ERROR. No se puede ver el total de empresas registradas: ${error}`,
    );
  }
}

// Registrar empresas
export async function agregarEmpresas(req: Request, res: Response) {
  try {
    const {
      nombre,
      tamano,
      formajuridica,
      actividadeconomica,
      alcancegeografico,
      direccion,
      telefono,
      correo,
      usuario,
      contrasena,
    } = req.body;

    console.log("\nProceso de registro para nueva empresa...");
    console.log("Datos recibidos:");
    console.table(req.body);

    if (!contrasena) {
      return res.status(400).json({
        error:
          "La entidad que se intenta registrar debe de agregar una contrasena",
      });
    }

    // hash de contraseña
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedContrasena = await bcrypt.hash(contrasena, salt);

    console.log("Registrando empresa...");

    await registrarEmpresa(
      nombre,
      tamano,
      formajuridica,
      actividadeconomica,
      alcancegeografico,
      direccion,
      telefono,
      correo,
      usuario,
      hashedContrasena,
    );

    console.log("Empresa registrada exitosamente");
    console.log(`${nombre} ya se ha registrado.`);

    res.json({
      message: `La empresa ${nombre} se ha registrado a la base de datos de manera exitosa`,
    });
  } catch (error) {
    console.error(`Error al intentar hacer el nuevo registro: ${error}`);

    if (error instanceof Error) {
      console.error("Mensaje del error:", error.message);
      console.error("Stack trace:", error.stack);
    }

    if (error instanceof Error && error.message.includes("duplicada")) {
      return res.status(409).json({
        error: "El usuario o correo electrónico ya existen.",
      });
    }

    res.status(500).json({
      error:
        "Error interno del servidor. No se pudo completar el registro de la empresa.",
      detalles: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}

// Editar empreas
export async function modificarEmpresas(req: Request, res: Response) {
  try {
    const { IDEmpresa } = req.params;

    const {
      nombre,
      tamano,
      formajuridica,
      actividadeconomica,
      alcancegeografico,
      direccion,
      telefono,
      correo,
      usuario,
      contrasena,
    } = req.body;

    if (!IDEmpresa) {
      return res.status(400).json({ error: "IDEmpresa es requerido." });
    }

    // Encriptar la contraseña si viene una nueva
    let hashedContrasena: string | undefined = "";
    if (contrasena) {
      hashedContrasena = await bcrypt.hash(contrasena, 10);
    }

    await actualizarEmpresas(
      Number(IDEmpresa),
      nombre,
      tamano,
      formajuridica,
      actividadeconomica,
      alcancegeografico,
      direccion,
      telefono,
      correo,
      usuario,
      hashedContrasena,
    );

    res.json({
      message: `El registro de la empresa ${nombre} ha sido actualizado...`,
    });
  } catch (error) {
    console.error(`ERROR. No se ha podido actualizar la empresa: ${error}`);
    res.status(500).json({
      error: "Error al actualizar a la empresa",
    });
  }
}

// Elimar empresa
export async function excluirEmpresas(req: Request, res: Response) {
  try {
    const { IDEmpresa } = req.params;
    const { nombre } = req.body;
    await eliminarEmpresas(Number(IDEmpresa));
    res.json({
      message: `La empresa ${nombre.toUpperCase()}
      \nID: ${IDEmpresa} fue ha sido eliminada.
      \nFecha: ${new Date().toLocaleString()}`,
    });
  } catch (error) {
    console.error(`ERROR. No se pudo eliminar a la empresa: ${error}`);
    res.status(500).json({ message: "Error al elimar la empresa" });
  }
}

// Otro bloque de codigo que me dio Gemini.com despues de tantos errores...
//Funcion de login que el frontend está esperando
export async function iniciarSesion(req: Request, res: Response) {
  try {
    const { usuario, contrasena } = req.body;

    console.log("Intentando login con:", { usuario }); // ✅ Log para debug

    if (!usuario || !contrasena) {
      return res
        .status(400)
        .json({ message: "Se requieren usuario y contraseña" });
    }

    const empresa = await buscarEmpresas(usuario);

    console.log("Empresa encontrada:", empresa ? "Sí" : "No"); // ✅ Log para debug

    if (!empresa) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const contrasenaValida = await bcrypt.compare(
      contrasena,
      empresa.contrasena,
    );

    console.log("Contraseña válida:", contrasenaValida);

    if (!contrasenaValida) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const JWT_SECRET = process.env.JWT_SECRET as string;

    if (!JWT_SECRET) {
      console.error("JWT_SECRET no está definido en las variables de entorno");
      return res
        .status(500)
        .json({ error: "Error de configuración del servidor" });
    }

    const token = jwt.sign(
      { id: empresa.IDEmpresa, usuario: empresa.usuario },
      JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({
      message: "Inicio de sesión exitoso.",
      usuario: empresa.usuario,
      token,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({
      error: "Error interno del servidor. No se pudo iniciar sesión.",
    });
  }
}
