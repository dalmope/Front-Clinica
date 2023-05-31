export class AsignarCita {
    idCita: number;
    idMedico: number;
    idConsultorio: number;
    fechaHora: Date

    constructor(data: any) {
        this.idCita = data.idCita;
        this.idMedico = data.idMedico;
        this.idConsultorio = data.idConsultorio;
        this.fechaHora = data.fechaHora;
    }
}