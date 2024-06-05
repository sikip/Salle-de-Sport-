import { User } from "./user";
export class choprevieux {
    idrev: number;
    addedDate: Date;
    commentaire:string;
    user: {
        username:string;
        email: string;
        telephone:number;
        image:String;
     
        
    };
    constructor(data: any = {}) {
        this.idrev= data.idrev|| 0;
        this.commentaire= data.commentaire|| '';
         this.addedDate =data.addedDate ;
         this.user = data.user || {};

}
} 