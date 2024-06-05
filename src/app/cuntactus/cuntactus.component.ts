import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';

@Component({
  selector: 'app-cuntactus',
  templateUrl: './cuntactus.component.html',
  styleUrls: ['./cuntactus.component.css']
})
export class CuntactusComponent implements OnInit {
  salle: any[] = [];
  displayedSalle: any[] = [];
  emailData = {
    name: '',
    email: '',
    message: ''
  };
  constructor(private GaeageserviceService: GaeageserviceService) { }
  ngOnInit() {
    this.getsall();

  }
  sendEmail(): void {
    this.GaeageserviceService.sendEmail(this.emailData).subscribe(
      response => {
        console.log('Email sent successfully:', response);
        // Réinitialiser les champs du formulaire après l'envoi
        this.emailData = {
          name: '',
          email: '',
          message: ''
        };
      },
      error => {
        console.error('Failed to send email:', error);
      }
    );
  }
  getsall(): void {
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

}
