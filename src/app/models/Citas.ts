import { Consultorio } from "./Consultorio";
import { Role } from "./Role";
import { Usuario } from "./usuario";

export class Citas {
    id: number;
    fechaHora: Date;
    motivo: string;
    estado: Estado
    especialidad: Role;
    consultorio: Consultorio;
    paciente: Usuario;
    medico: Usuario;
    constructor(data: any) {
        this.fechaHora = data.nombre || '';
        this.motivo = data.motivo || '';
        if (data.estado) { this.estado = data.estado; }
        if (data.especialidad) { this.especialidad = data.especialidad; }
        if (data.consultorio) { this.consultorio = data.consultorio; }
        if (data.paciente) { this.paciente = data.paciente; }
        if (data.medico) { this.medico = data.medico; }
    }
}