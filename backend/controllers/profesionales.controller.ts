/*
Es aqui donde se ponen las condiciones de la manera en la que se realizaran los registros del sistema hacia la base de datos desde el bakend.
Aqui es donde pongo las condiciones reales para todos los registros de la tabla Profesionales.
*/
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  registrarProfesionales,
  obtenerTodosProfesionales,
  obtenerProfesionalesDesde,
} from "../services/profesionales.service.ts";
import { io } from "../server/index.ts"; // 👈 Importar io

// Registrar nuevo profesional
export async function agregarProfesionales(req: Request, res: Response) {
  try {
    const {
      nombre,
      apellidos,
      carreraespecializacion,
      telefono,
      correousuario,
      contrasena,
    } = req.body;

    if (!contrasena) {
      return res.status(400).json({
        error: "La persona que se está registrando debe agregar una contraseña",
      });
    }

    // Hash de la contraseña
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedContrasena = await bcrypt.hash(contrasena, salt);

    // 1️⃣ Guardar en la base de datos
    const resultado = await registrarProfesionales(
      nombre,
      apellidos,
      carreraespecializacion,
      telefono,
      correousuario,
      hashedContrasena
    );

    console.log(
      `La persona ${nombre} ${apellidos} se ha registrado en la base de datos.`
    );

    console.log(
      `El usuario ${correousuario} ya está afiliado a la base de datos.`
    );

    // Crear objeto para emitir (SIN contraseña)
    const profesionalParaEmitir = {
      id: resultado.IDProfesional,
      nombre,
      apellidos,
      carreraespecializacion,
      telefono,
      correousuario,
      fechaRegistro: new Date().toLocaleString("es-DO", {
        timeZone: "America/Santo_Domingo",
      }),
    };

    // Emitir a todos los clientes conectados via Socket.IO
    io.emit("nuevoProfesional", profesionalParaEmitir);
    console.log(
      "Profesional emitido a todos los clientes:",
      profesionalParaEmitir
    );

    // Responder al cliente que hizo la petición
    res.status(201).json({
      success: true,
      message: `${nombre} ${apellidos} se ha registrado a la base de datos como ${correousuario} de manera exitosa.`,
      fecha: new Date().toLocaleString("es-DO"),
      profesional: profesionalParaEmitir,
    });
  } catch (error) {
    console.error(
      "No se puede registrar en la tabla Profesionales por esto:",
      error
    );

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

// Obtener todos los profesionales
export async function listarProfesionales(req: Request, res: Response) {
  try {
    const profesionales = await obtenerTodosProfesionales();

    res.json({
      success: true,
      total: profesionales.length,
      profesionales: profesionales.map((p) => ({
        id: p.IDProfesional,
        nombre: p.Nombre,
        apellidos: p.Apellidos,
        carreraespecializacion: p.CarreraEspecializacion,
        telefono: p.Telefono,
        correousuario: p.CorreoUsuario,
        fechaRegistro: p.FechaConsulta,
      })),
    });
  } catch (error) {
    console.error("Error al listar profesionales:", error);
    res.status(500).json({
      error: "Error al obtener la lista de profesionales",
    });
  }
}

// Obtener profesionales nuevos (para polling)
export async function obtenerNuevosProfesionales(req: Request, res: Response) {
  try {
    const desde = parseInt(req.query.desde as string) || 0;
    const profesionales = await obtenerProfesionalesDesde(desde);

    res.json({
      success: true,
      total: profesionales.length,
      profesionales: profesionales.map((p) => ({
        id: p.IDProfesional,
        nombre: p.Nombre,
        apellidos: p.Apellidos,
        carreraespecializacion: p.CarreraEspecializacion,
        telefono: p.Telefono,
        correousuario: p.CorreoUsuario,
      })),
    });
  } catch (error) {
    console.error("Error al obtener nuevos profesionales:", error);
    res.status(500).json({
      error: "Error al obtener nuevos profesionales",
    });
  }
}
