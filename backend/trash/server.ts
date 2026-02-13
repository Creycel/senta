import dotenv from "dotenv";
import app from "../server/index.ts";
import {
  verificarConexionSENTA,
  poolPromise,
  getPool,
} from "../connection/db.ts"; // Node espera .js en las importaciones locales, incluso si el archivo sigue siendo .ts

dotenv.config();

const PORT = process.env.PORT || 3000;

async function IniciarServidor() {
  try {
    console.log("Verificanco conexion con la base de datos...");

    // Probar la conexión antes de iniciar el servidor
    const pool = await verificarConexionSENTA();

    if (!pool) {
      console.error("No se pudo conectar a la base de datos.");
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
    console.log("Conexión exitosa con SQL Server");
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

// Inciar servidor
IniciarServidor();
