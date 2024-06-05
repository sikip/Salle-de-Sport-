export class Vedeo {
    id: number;
    title:String;
    descrption: string;
    tags: string;
    videoName:String;

   constructor(data: any = {}) {
     this.id= data.id|| 0;
     this.tags = data.tags || '';
     this.videoName = data.videoName || '';
     this.title = data.title || '';
     this.descrption = data.descrption || '';

   }
 }