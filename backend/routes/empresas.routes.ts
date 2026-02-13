import { Router } from "express";
import {
  listarEmpresas,
  agregarEmpresas,
  modificarEmpresas,
  iniciarSesion,
  excluirEmpresas,
} from "../controllers/empresas.controller.ts";

const router = Router();

router.get("/", listarEmpresas);
router.post("/registro", agregarEmpresas);
router.post("/login", iniciarSesion);
router.put("/:IDEmpresa", modificarEmpresas);
router.delete("/:IDEmpresa", excluirEmpresas);

export default router;
