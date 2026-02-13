import { Router } from "express";
import {
  agregarProfesionales,
  listarProfesionales,
  obtenerNuevosProfesionales,
} from "../controllers/profesionales.controller.ts";

const router = Router();

router.post("/registro", agregarProfesionales);
router.get("/", listarProfesionales);
router.get("/nuevos", obtenerNuevosProfesionales);

export default router;
