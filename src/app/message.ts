import { User } from "./user";

export class message {
    id: number;
    content:string;
    addedDate:Date;
    sender!: User;
    recipient!: User;

    constructor(data: any = {}) {
      this.id = data.id|| 0;
      this.content = data.content || '';
      this.addedDate =data.addedDate ;
 
    }
  }