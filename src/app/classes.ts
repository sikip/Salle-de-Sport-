export class classes {
    id: number;
    name:String;
    date:Date;
     addedDate: Date ;
     addedDayOfWeek:string;
    registrationTimedebut: string;
    registrationTifin: string;
    image:String;
    nomprof:string;
    nbrseance : number;
    prix : number;
    proftel : number;
    profmail : number;
   constructor(data: any = {}) {
     this.id= data.id|| 0;
     this.name = data.name || '';
     this.date = data.date;
     this.addedDate = data.addedDate;
     this.registrationTimedebut = data.registrationTimedebut || '';
     this.registrationTifin = data.registrationTifin || '';
     this.addedDayOfWeek = data.addedDayOfWeek || '';
     this.image = data.image || '';
     this.nomprof = data.nomprof || '';
     this.nbrseance = data.nbrseance || 0;
     this.prix = data.prix || 0;
     this.proftel = data.proftel || 0;
     this.profmail = data.profmail || '';
   }
 }