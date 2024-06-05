export class eventtes {
    id: number;
    image:String;
    image2:String;
    nom:string;
    tag:string;
    petdescription:string;
    nomecrivan:string;
    article:String;
    revieuxadmin:String;
    image3:String;
    image4:String;
    nomconsei:String;
    paragraphs: String;
    paragraphe2: String;
    paragraphe3:String;
    addedDate: Date;
    likeus: number;
    timeAgo?: string;
    datee:Date;
    nbplace:number;
    prix:number;
    user: {
        username:string;
        email: string;
        telephone:number;
        image:String;
     
        
    };
    constructor(data: any = {}) {
        this.id= data.id|| 0;
        this.image = data.image;
        this.image2 = data.image2;
        this.nom = data.nom || '';
        this.tag = data.tag || '';
        this.petdescription = data.petdescription || '';
        this.nomecrivan = data.nomecrivan || '';
         this.article = data.article || '';
         this.revieuxadmin = data.revieuxadmin || '';
         this.image3 = data.image3;
         this.image4 = data.image4;
         this.nomconsei = data.nomconsei || '';
         this.paragraphs = data.paragraphs || '';
         this.paragraphe2 = data.paragraphe2 || '';
         this.paragraphe3 = data.paragraphe3 || '';
         this.addedDate =data.addedDate ;
         this.likeus= data.likeus|| 0;
         this.datee = data.datee ;
         this.user = data.user || {}; 
         this.nbplace = data.nbplace || 0;
         this.prix = data.prix || 0;
}
}