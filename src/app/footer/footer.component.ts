import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { salle } from '../salle';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  salle: any[] = [];
  displayedSalle: any[] = [];
  userEmail: string = '';
  emailSentMessage: string | undefined;
  constructor(private GaeageserviceService: GaeageserviceService) { }

  ngOnInit() {
    this.fetchSalles();
  
  }



  fetchSalles() {
    this.GaeageserviceService.getsall().subscribe(
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
  sendEmail() {
    // Vérifier si l'adresse e-mail est vide
    if (!this.userEmail) {
      console.error("L'adresse e-mail est vide.");
      // Gérer l'erreur ou afficher un message d'erreur à l'utilisateur si nécessaire
      return;
    }
  
    // Appel du service pour envoyer l'e-mail
    this.GaeageserviceService.sendRoomInformationEmail(this.userEmail).subscribe(
      response => {
        console.log('E-mail envoyé avec succès', response);
        this.emailSentMessage = 'E-mail envoyé avec succès';
      },
      error => {
        console.error('Erreur lors de l\'envoi de l\'e-mail', error);
        this.emailSentMessage = 'Erreur lors de l\'envoi de l\'e-mail';
      }
    );
  }
  

}
