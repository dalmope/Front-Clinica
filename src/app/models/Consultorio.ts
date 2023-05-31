export class Consultorio {
    id: number;
    nombre: string;
    descripcion: string;
    estado: Estado
    constructor(data: any) {
        this.nombre = data.nombre || '';
        this.descripcion = data.descripcion || '';
        if (data.estado) { this.estado = data.estado; }
        if (data.is) { this.id = data.id; }
    }
}