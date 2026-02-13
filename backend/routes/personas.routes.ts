import { Router } from "express";
import {
  listarPersonas,
  agregarPersona,
  modificarPersona,
  excluirPersona,
  iniciarSesion,
} from "../controllers/personas.controller.ts";

const router = Router();

router.get("/", listarPersonas);
router.post("/registro", agregarPersona);
router.post("/login", iniciarSesion);
router.put("/:IDPersona", modificarPersona);
router.delete("/:IDPersona", excluirPersona);

export default router;
