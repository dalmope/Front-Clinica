export class CrearCita {
    idEspecialidad: number;
    codigo: string;
    motivo: string;

    constructor(data: any) {
        this.idEspecialidad = data.idEspecialidad || '';
        this.codigo = data.codigo || '';
        this.motivo = data.motivo || '';
    }
}