import { CoordenadasModel } from "./coordenadas";

export class UsuarioModel {
    foto: string;
    email: string;
    nombre: string;
    coordenadas: CoordenadasModel = new CoordenadasModel();
}