import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GaeageserviceService } from '../gaeageservice.service';

@Component({
  selector: 'app-confermationbutton',
  templateUrl: './confermationbutton.component.html',
  styleUrls: ['./confermationbutton.component.css']
})
export class ConfermationbuttonComponent implements OnInit {
  email!: string;
  salle: any[] = [];
  displayedSalle: any[] = [];
  router: any;
  constructor(
    private route: ActivatedRoute,
    private gaeageserviceService: GaeageserviceService
  ) { }

  ngOnInit(): void {
    // Récupérer l'e-mail à partir des paramètres de l'URL
    this.route.params.subscribe(params => {
      this.email = params['email']; // Pas besoin de convertir en nombre
      if (this.email) {
        this.confirmRegistration(); // Appeler la méthode de confirmation
      }
    });
    this.getsall();
  }

  confirmRegistration() {
    // Vérifier si l'e-mail est défini
    if (this.email) {
      // Appeler le service pour confirmer l'inscription
      this.gaeageserviceService.confirmRegistration(this.email).subscribe(
        response => {
          console.log('Confirmation réussie pour l\'utilisateur avec l\'e-mail : ', this.email);
          // Traitez la réponse ici si nécessaire
         
        },
        error => {
          console.error('Erreur lors de la confirmation de l\'inscription : ', error);
          // Traitez l'erreur ici si nécessaire
        }
      );
    } else {
      console.error('Veuillez fournir une adresse e-mail.');
      // Gérer le cas où aucune adresse e-mail n'est fournie
    }
 
  }
  getsall(): void {
    this.gaeageserviceService.getsall().subscribe(
      (data: any[]) => {
        this.salle = data;
        this.displayedSalle = this.salle.slice(0, 1);
        
        // Convertir les images en format base64
        this.salle.forEach(salle => {
          salle.image = 'data:image/jpeg;base64,' + salle.image;
        });
      }
    );
  }
}

