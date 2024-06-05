import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GaeageserviceService } from '../gaeageservice.service';
import { PaymentRequest } from '../PaymentRequest '; 

@Component({
  selector: 'app-succes2',
  templateUrl: './succes2.component.html',
  styleUrls: ['./succes2.component.css']
})
export class Succes2Component implements OnInit {
  userId!: number;
  amount: number = 0;
  salle: any[] = [];
  displayedSalle: any[] = [];
  form: any;
  id!: number;
  offre: any;
  sallePrice: number | undefined;
  showContainer = false;
  constructor(private router: Router, private route: ActivatedRoute, private gaeageService: GaeageserviceService) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur et de l'offre à partir de la route
    this.route.paramMap.subscribe(params => {
      const userIdParam = params.get('userId');
      const idParam = params.get('id'); 
      if (userIdParam !== null) {
        this.userId = +userIdParam;
      }
      if (idParam !== null) { // Utilisez idParam ici au lieu de this.idParam
        this.id = +idParam;
        this.getOffreById(this.id); // Appelez getOffreById() avec l'ID récupéré
      }
    });
  
    // Appelez getsall() après avoir récupéré les paramètres de l'URL
    this.getsall();
  }
  addToCart(): void {
    if (this.userId && this.id) {
      this.gaeageService.addtocartoffee(this.userId, this.id)
        .subscribe(
          response => {
            console.log('Chop added to cart successfully');
            // Handle success (if needed)
            this.showContainer = true; // Afficher le conteneur après avoir ajouté au panier
          },
          error => {
            console.error('Error adding chop to cart:', error);
            // Handle error (if needed)
          }
        );
    }
  }

  anotherAction(): void {
    // Logique pour l'action supplémentaire ici
  }
  getsall(): void {
    this.gaeageService.getsall().subscribe(
      (data: any[]) => {
        this.salle = data;
        this.displayedSalle = this.salle.slice(0, 1);
        
        // Convertir les images en format base64
        this.salle.forEach(salle => {
          salle.image = 'data:image/jpeg;base64,' + salle.image;
          console.log(salle); // Utiliser salle au lieu de data ici
          this.amount = salle.prix; // Utiliser salle.prix au lieu de this.salle.prix
        });
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des données : ', error);
      }
    );
}
getOffreById(id: number): void {
  this.gaeageService.getOffreById(id).subscribe(
    offre => {
      this.offre = offre;
      this.sallePrice = offre.prix; // Mettre à jour sallePrice avec le prix de l'offre
    }
  );
}
generatePayment() {
  if (this.displayedSalle && this.displayedSalle.length > 0) {
    const sallePrice = this.offre.prix; // Obtenez le prix de la salle

    const paymentRequest = new PaymentRequest(
      '485acc37-649e-43b4-9663-3e2ea7dce6e9',
      '29e96e53-c807-462e-b48e-3f58ca6ace46',
      true,
      sallePrice, // Utilisez le prix de la salle comme montant
      1200, // Par exemple : 20 minutes
      'ead34e90-4f23-4b85-963f-720cf80b8904',
      this.userId // Utilisez l'ID utilisateur récupéré
    );

    // Générer le paiement
    this.gaeageService.generatePayment(this.userId, paymentRequest).subscribe(
      response => {
        console.log('Réponse du serveur :', response);

        if (response && response.result && response.result.link) {
          // Rediriger vers le lien de paiement
          window.location.href = response.result.link;
        } else {
          console.error('Lien de paiement non disponible dans la réponse :', response);
        }
      },
      error => {
        console.error('Erreur lors de la génération du paiement :', error);
        // Gérer l'erreur comme nécessaire
      }
    );
  } else {
    console.error('Aucune salle à afficher.');
  }
}
}