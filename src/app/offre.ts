export class offre {
    id: number;
    nom:string;
    prix: number;
	classe: string;
     month: string;
     message: number;
     entrepr: number;
    constructor(data: any = {}) {
      this.id = data.id|| 0;
      this.nom = data.nom || '';
      this.classe = data.classe || '';
      this.month = data.month || '';
      this.prix = data.prix || 0; 
      this.message = data.message || 0;
      this.entrepr = data.entrepr || 0;
  
    }
  }
  