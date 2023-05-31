export class Usuario {
    id: number;
    name: string;
    surname: string;
    mail: string;
    phone: string;
    address: string;
    idDniType: string;
    dniNumber: string;
    constructor(data: any) {
        this.name = data.name;
        this.surname = data.surname;
        if (data.id) { this.id = data.id; }
        if (data.mail) { this.mail = data.mail; }
        if (data.phone) { this.phone = data.phone; }
        if (data.address) { this.address = data.address; }
        if (data.idDniType) { this.idDniType = data.idDniType; }
        if (data.dniNumber) { this.dniNumber = data.dniNumber; }
    }
}