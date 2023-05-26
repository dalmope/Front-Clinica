export class Consultorio {
    id: number;
    nombre: string;
    descripcion: string;
    estado: Estado
    constructor(nombre: string, descripcion: string, estado?: Estado, id?: number) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        if (estado) { this.estado = estado; }
        if (id) { this.id = id; }
    }
}