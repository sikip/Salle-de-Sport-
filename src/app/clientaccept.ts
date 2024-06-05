export class clientaccept {
    id: number;
    clientaccept:String;
    name:string;
    addedDate:Date;
    mail:string;
    acceptation:string;
    message:string;
   constructor(data: any = {}) {
     this.id= data.id|| 0;
     this.clientaccept = data.clientaccept || '';
     this.addedDate = data.addedDate;
     this.name=data.name || '';
     this.mail=data.mail || '';
     this.acceptation=data.acceptation || '';
     this.message=data.message || '';
   }
 }