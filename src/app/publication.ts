import { User } from "./user";

export class publication {
  [x: string]: any;
    id: number;
    commentaire:String;
    image:   string;
    timeAgo?: string;
    addedDate: Date;


   constructor(data: any = {}) {
     this.id= data.id|| 0;
     this.commentaire = data.commentaire || '';
     this.image = data.image;
     this.addedDate =data.addedDate ;
     

   }
 }