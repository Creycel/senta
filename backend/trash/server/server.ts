// Archivo de configuracion de Express
import express from "express";
import cors from "cors";
import morgan from "morgan";

// IMPORTAR RUTAS
import registroPersonasRoutes from "../personas.routes.ts";

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// RUTAS
app.use("/api/registro-persona", registroPersonasRoutes);

// Ruta base para pruebas
app.get("/", (_req, res) => {
  res.json("Servidor SENTA funcionando correctamente ✔");
});

export default app;
