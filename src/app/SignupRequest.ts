export class SignupRequest {
    username: string;
    email: string;
    password: string;

    roles: string[];
    constructor(username: string, email: string, password: string, roles: string[]) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.roles = roles;
    
    }
}
