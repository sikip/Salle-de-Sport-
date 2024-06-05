import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GaeageserviceService } from '../gaeageservice.service';
import { PaymentRequest } from '../PaymentRequest '; 

@Component({
  selector: 'app-payment-component',
  templateUrl: './payment-component.component.html',
  styleUrls: ['./payment-component.component.css']
})
export class PaymentComponentComponent implements OnInit {
  userId!: number;
  amount: number = 0;
  salle: any[] = [];
  displayedSalle: any[] = [];
  form: any;
  constructor(private router: Router, private route: ActivatedRoute, private gaeageService: GaeageserviceService) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur à partir de la route
    this.route.paramMap.subscribe(params => {
      const userIdParam = params.get('userId');
      if (userIdParam !== null) {
        this.userId = +userIdParam;
      }
    });
    this.getsall();
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

generatePayment() {
  if (this.displayedSalle && this.displayedSalle.length > 0) {
    const sallePrice = this.displayedSalle[0].prix; // Obtenez le prix de la salle

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