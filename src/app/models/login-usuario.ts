export class LoginUsuario {
    userDni: string;
    password: string;

    constructor(userDni: string, password: string) {
        this.userDni = userDni;
        this.password = password;
    }
}