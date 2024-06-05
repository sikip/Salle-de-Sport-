export class salle {
     id: number;
     name:String;
     numero: string;
	   time: string;
     email:String;
     localisation: string;
     locationexact:string;
     latitude: number;
     longitude: number;
     slogon1: string;
     slogon2: string;
     image: string;
     imageslid1: string;
     prix:number;
    constructor(data: any = {}) {
      this.id= data.id|| 0;
      this.time = data.time || '';
      this.email = data.email || '';
      this.image =data.image;
      this.name = data.name || '';
      this.localisation = data.localisation || '';
      this.locationexact = data.locationexact || '';
      this.numero = data.numero || '';
      this.latitude = data.latitude || 0;
      this.longitude = data.longitude || 0;
      this.slogon1 = data.slogon1 || '';
      this.slogon2 = data.slogon2 || '';
      this.imageslid1 = data.imageslid1;
      this.prix = data.prix || 0;
    }
  }