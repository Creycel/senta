// En este servwdor es que se montan las URL que conectan al backend.
import express from "express";
import dotenv from "dotenv";
import rutasPersonas from "../routes/personas.routes.ts";
import rutasEmpresas from "../routes/empresas.routes.ts";
import rutasProfesionales from "../routes/profesionales.routes.ts";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  }),
);

app.use(express.json());

// Crear servidor HTTP
const server = http.createServer(app);

// Crear servidor Socket.IO
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

// Conexión de Socket.IO
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// EXPORTAR io para usarlo en controladores
export { io };

app.use("/api/personas", rutasPersonas);
app.use("/api/empresas", rutasEmpresas);
app.use("/api/profesionales", rutasProfesionales);

const PORT = process.env.PORT || 3000;

console.log("Iniciando servidor...");

app.get("/user", (req, res) => {
  res.send("Servidor corriendo...");
});

server.listen(PORT, () => {
  console.log("Servidor iniciado correctamente");
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`Socket.IO listo para conexiones en tiempo real`);
});

export default app;
