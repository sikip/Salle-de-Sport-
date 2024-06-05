export class JwtResponse {
    id: number;
    username: string;
    email: string;
    roles: string[];
    jwt: string;
    userPay: string;
    confuser:String;
  
    constructor(id: number, username: string, email: string, roles: string[], jwt: string , userPay: string,confuser:String) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.roles = roles;
      this.jwt = jwt;
      this.userPay =userPay;
    this.confuser=confuser;
    }
  }
  