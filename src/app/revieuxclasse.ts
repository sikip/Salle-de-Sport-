export class reieuxclasses {
    id: number;
    comment:string;
    starRating:number;
    user: {
        username:string;
        email: string;
        telephone:number;
        image:String;
     
        
    };
    classes :{
        name:String;
        
    }
    constructor(data: any = {}) {
        this.id= data.id| 0;
        this.comment= data.comment || '';
        this.starRating= data.starRating| 0;
        this.classes = data.classes || {};
         this.user = data.user || {};

}
} 