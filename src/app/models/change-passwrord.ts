export class ChangePassword {
    tokenPassword: string;
    password: string;
    confirmPassword: string;
    constructor(tokenPassword: string, password: string, confirmPassword: string) {
        this.tokenPassword = tokenPassword;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}