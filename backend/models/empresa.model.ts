// Estructura de datos, manera en las que las tablas se presentan como objetos.
export type Tamano = "Microempresa" | "PYMES" | "Grande";

export type FormaJuridica =
  | "Empresario individual"
  | "Sociedades"
  | "Sociedad Anónima (S.A.)"
  | "Sociedad de Responsabilidad Limitada (S.R.L.)"
  | "Sociedad en comandita"
  | "Sociedad colectiva"
  | "Sociedad cooperativa";

export type ActividadEconomica =
  | "Sector primario"
  | "Sector secundario"
  | "Sector terciario"
  | "Sector cuaternario";

export type AlcanceGeografico =
  | "Local"
  | "Regional"
  | "Nacional"
  | "Internacional o multinacional";

export default interface Empresas {
  clave: any;
  password: any;
  IDEmpresa?: number;
  nombre: string;
  tamano: Tamano;
  formajuridica: FormaJuridica;
  actividadeconomica: ActividadEconomica;
  alcancegeografico: AlcanceGeografico;
  direccion: string;
  telefono: string;
  correo: string;
  usuario: string;
  contrasena: string;
}
