import { Router } from "express";
import {
  verPersonas,
  registrarPersona,
  eliminarPersona,
  actualizarPersona,
} from "./personas.controller.ts";

const router = Router();

//Rutas para consultar, registrar, eliminar y actualizar personas en las tabla "Personas" en la base de datos.
router.get("/listar-personas", verPersonas);
router.post("/registrar-persona", registrarPersona);
router.delete("/:persona", eliminarPersona);
router.put("/:persona", actualizarPersona);

export default router;
