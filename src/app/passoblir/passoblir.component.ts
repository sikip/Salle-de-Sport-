import { Component } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-passoblir',
  templateUrl: './passoblir.component.html',
  styleUrls: ['./passoblir.component.css']
})
export class PassoblirComponent {

  email: string = '';
  resetSuccess: boolean = false;
  message: string = ''; // Nouvelle propriété pour afficher un message à l'utilisateur
  

  constructor(private gaeageserviceService: GaeageserviceService ,  private router: Router) { }

  resetPassword(): void {
    if (!this.email) {
      this.message = 'Please enter an email address.';
      return;
    }

    this.gaeageserviceService.resetPassword(this.email).subscribe(
      response => {
        console.log('Réinitialisation de mot de passe réussie:', response);
        this.resetSuccess = true;
        this.message = 'Réinitialisation de mot de passe réussie.';
        this.router.navigate(['/form']);
      },
      error => {
        console.error('Erreur lors de la réinitialisation de mot de passe:', error);
        this.message = 'Erreur lors de la réinitialisation de mot de passe. Veuillez réessayer.';
        
      }
    );
  }
}
