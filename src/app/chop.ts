export class chop {
    id: number;
    name:String;
    prix:number;
    type:String;
    starRating:number;
    persentage:number;
    addedDate:Date;
    color:String;
    size:String;
    kontiter:number;
    imageslid1:string;
    imageslid2:string;
    imageslid3:string;
    imageslid4:string;
    constructor(data: any = {}) {
        this.id= data.id|| 0;
        this.name = data.name || '';
        this.prix = data.prix || 0;
        this.kontiter = data.kontiter || 0;
        this.type = data.type || '';
        this.color = data.color || '';
        this.size = data.size || '';
        this.persentage = data.persentage || 0;
        this.starRating = data.starRating || 0;
        this.addedDate = data.date;
        this.imageslid1 = data.imageslid1 || '';
        this.imageslid2 = data.imageslid2 || '';
        this.imageslid3 = data.imageslid3 || '';
        this.imageslid4 = data.imageslid4 || '';

      }
}