import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.css']
})
export class FailedComponent implements OnInit {
  paymentId!: string;
  salle: any[] = [];
  displayedSalle: any[] = [];
  form: any;
  router: any;
  userInfo: any;
  constructor(
    private route: ActivatedRoute,
    private  gaeageService: GaeageserviceService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const userId = Number(params.get('userId')); // Obtenez l'ID de l'utilisateur à partir de la route
      if (userId) {
   
        this.gaeageService.getUserById(userId).subscribe(
          (data) => {
            this.userInfo = data;
            // Vérifie si userInfo.image est vide
            if (!this.userInfo.image) {
              // Si userInfo.image est vide, attribuez-lui le chemin de l'image par défaut
              this.userInfo.image = '../../assets/images/dfb8770ebc590a2eaeb851c87597dfc7.png';
            } else {
              // Sinon, concaténez le préfixe pour une image encodée en base64
              this.userInfo.image = 'data:image/jpeg;base64,' + this.userInfo.image;
            }
          },
          (error) => {
            console.error("Erreur lors de la récupération des informations de l'utilisateur:", error);
          }
        );
      }
    });
    this.route.queryParams.subscribe(params => {
      this.paymentId = params['payment_id'];
      if (this.paymentId) {
        this.verifyPayment(this.paymentId);
      } else {
        console.error('Payment ID not found in URL.');
        // Gérer l'erreur ici, rediriger ou afficher un message d'erreur à l'utilisateur.
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
        
        });
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des données : ', error);
      }
    );
}
  verifyPayment(paymentId: string) {
    this.gaeageService.verifyPayment(paymentId)
      .subscribe(
        (response) => {
          console.log('Response:', response);
          // Gérer la réponse ici
        },
        (error) => {
          console.error('Error:', error);
          // Gérer l'erreur ici
        }
      );
  }
}