export class ResetUser {
    public email_phone: string;
    public password: string;
    public reset_code: string;
    constructor() {
        this.email_phone = '';
        this.password = '';
        this.reset_code = '';
    }
}
export class LoginUser {
    public email: string;
    public password: string;
    constructor() {
        this.email = '';
        this.password = '';
    }
}
export class RegisterUser {
    public full_name: string;
    public email: string;
    public phone: string;
    public password: string;
    constructor() {
        this.full_name = '';
        this.email = '';
        this.phone = '';
        this.password = '';
    }
}
export class AuthCallback {
    public isValid: boolean;
    public error: string;
    public message: string;
    constructor() {
        this.isValid = false;
        this.error = '';
        this.message = '';
    }
}
