export class ClientExperienc {
    id: number;
    image:String;
    image2:String;
    beforekilo:number;
    afterkilo:number;
    name:String;
    week:number;
    fatbefor:number;
    fatafter:number;
    comextern:String;
        constructor(data: any = {}) {
        this.id= data.id|| 0;
        this.image = data.image;
        this.image2 = data.image2;
        this.beforekilo = data.beforekilo || 0;
        this.afterkilo = data.afterkilo || 0;
        this.name = data.name || "";
        this.week = data.week || 0;
        this.fatbefor = data.fatbefor || 0;
        this.fatafter = data.fatafter || 0;
        this.comextern = data.comextern || "";
}
}