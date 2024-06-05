import { Role } from "./Role";

export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    roles: Role[];
    image: string;
    revieux :string;
    commentaire:string;
    confibm:number;
    poid:number;
    telephone:number;
    janfi : number;
   fivri : number;
    mars: number; 
    avrile: number;
    mais: number;
    juin: number;
     juilliat: number;
     aute: number;
     septembre: number;
     octobre: number;
     decembre: number;
     nauvembre: number;
     isConnected?: boolean; 
     type:String;
    constructor(id: number, username: string, email: string, password: string,
       roles: Role[], image:string,revieux:string, commentaire:string,confibm:number,
       poid:number,telephone:number,janfi : number,fivri : number,mars: number,avrile: number,
        mais: number,juin: number,juilliat: number,aute: number,septembre: number,octobre: number,decembre: number,
         nauvembre: number,type:String
        ) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.password = password;
      this.roles = roles;
      this.image = image;
      this.revieux = revieux;
      this.commentaire = commentaire;
      this.confibm = confibm;
      this.poid = poid;
      this.telephone = telephone;
      this.janfi = janfi;
      this.fivri = fivri;
      this.mars = mars;
      this.avrile = avrile;
      this.mais = mais;
      this.juin = juin;
      this.juilliat = juilliat;
      this.aute = aute;
      this.septembre = septembre;
      this.octobre = octobre;
      this.decembre = decembre;
      this.nauvembre = nauvembre;
      this.type=type;
    }
  }
  