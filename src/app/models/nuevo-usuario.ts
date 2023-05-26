export class NuevoUsuario {
    name: string;
    surname: string;
    mail: string;
    phone: string;
    adress: string;
    idDniType: string;
    dniNumber: string;
    password: string;

    constructor(data: any) {
        this.name = data.name || '';
        this.surname = data.surname || '';
        this.mail = data.mail || '';
        this.phone = data.phone || '';
        this.adress = data.adress || '';
        this.idDniType = data.idDniType || '';
        this.dniNumber = data.dniNumber || '';
        this.password = data.password || '';
      }
}