import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
@Component({
  selector: 'app-helpfaq',
  templateUrl: './helpfaq.component.html',
  styleUrls: ['./helpfaq.component.css']
})
export class HelpfaqComponent implements OnInit {
  showAnswer: boolean = false;
  showAnswer2: boolean = false;
  showAnswer3: boolean = false;
  showAnswer4: boolean = false;
  showAnswer5: boolean = false;
  showAnswer6: boolean = false;
  showAnswer7: boolean = false;
  showAnswer8: boolean = false;
  showAnswer9: boolean = false;
  showAnswer10: boolean = false;
  showAnswer11: boolean = false;
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
  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
    if (this.showAnswer) {
      this.showAnswer2 = false; // Fermer toggleAnswer2 si ouvert
      this.showAnswer3 = false; // Fermer toggleAnswer3 si ouvert
      this.showAnswer4 = false; // Fermer toggleAnswer3 si ouvert
      this.showAnswer5 = false; // Fermer toggleAnswer3 si ouvert
      this.showAnswer7 = false;
      this.showAnswer6 = false;
      this.showAnswer8 = false;
      this.showAnswer9 = false;
      this.showAnswer10 = false;
      this.showAnswer11 = false;
    }
  }

  toggleAnswer2() {
    this.showAnswer2 = !this.showAnswer2;
    if (this.showAnswer2) {
      this.showAnswer = false; // Fermer toggleAnswer si ouvert
      this.showAnswer3 = false; // Fermer toggleAnswer3 si ouvert
      this.showAnswer4 = false; // Fermer toggleAnswer3 si ouvert
      this.showAnswer5 = false; // Fermer toggleAnswer3 si ouvert
      this.showAnswer6 = false;
      this.showAnswer7 = false;
      this.showAnswer8 = false;
      this.showAnswer9 = false;
      this.showAnswer10 = false;
      this.showAnswer11 = false;
    }
  }

  toggleAnswer3() {
    this.showAnswer3 = !this.showAnswer3;
    if (this.showAnswer3) {
      this.showAnswer = false; // Fermer toggleAnswer si ouvert
      this.showAnswer2 = false; // Fermer toggleAnswer2 si ouvert
      this.showAnswer4 = false; // Fermer toggleAnswer3 si ouvert
      this.showAnswer5 = false; // Fermer toggleAnswer3 si ouvert
      this.showAnswer6 = false;
      this.showAnswer7 = false;
      this.showAnswer8 = false;
      this.showAnswer9 = false;
      this.showAnswer10 = false;
      this.showAnswer11 = false;
    }
  }
  toggleAnswer4() {
    this.showAnswer4 = !this.showAnswer4;
    if (this.showAnswer4) {
      this.showAnswer = false; // Fermer toggleAnswer si ouvert
      this.showAnswer2 = false; // Fermer toggleAnswer2 si ouvert
      this.showAnswer3 = false;
      this.showAnswer5 = false; // Fermer toggleAnswer3 si ouvert
      this.showAnswer6 = false;
      this.showAnswer7 = false;
      this.showAnswer8 = false;
      this.showAnswer9 = false;
      this.showAnswer10 = false;
      this.showAnswer11 = false;
    }
  }
  toggleAnswer5() {
    this.showAnswer5 = !this.showAnswer5;
    if (this.showAnswer5) {
      this.showAnswer = false; // Fermer toggleAnswer si ouvert
      this.showAnswer2 = false; // Fermer toggleAnswer2 si ouvert
      this.showAnswer3 = false;
      this.showAnswer4 = false; // Fermer toggleAnswer3 si ouvert
      this.showAnswer6 = false;
      this.showAnswer7 = false;
      this.showAnswer8 = false;
      this.showAnswer9 = false;
      this.showAnswer10 = false;
      this.showAnswer11 = false;
    }
  }
  toggleAnswer6() {
    this.showAnswer6 = !this.showAnswer6;
    if (this.showAnswer6) {
      this.showAnswer = false; // Fermer toggleAnswer si ouvert
      this.showAnswer2 = false; // Fermer toggleAnswer2 si ouvert
      this.showAnswer3 = false;
      this.showAnswer4 = false; // Fermer toggleAnswer3 si ouvert
      this.showAnswer5 = false;
      this.showAnswer7 = false;
      this.showAnswer8 = false;
      this.showAnswer9 = false;
      this.showAnswer10 = false;
      this.showAnswer11 = false;
    }
  }
  toggleAnswer7() {
    this.showAnswer7 = !this.showAnswer7;
    if (this.showAnswer7) {
      this.showAnswer = false; // Fermer toggleAnswer si ouvert
      this.showAnswer2 = false; // Fermer toggleAnswer2 si ouvert
      this.showAnswer3 = false;
      this.showAnswer4 = false; // Fermer toggleAnswer3 si ouvert
      this.showAnswer5 = false;
      this.showAnswer6 = false;
      this.showAnswer8 = false;
      this.showAnswer9 = false;
      this.showAnswer10 = false;
      this.showAnswer11 = false;
    }
  }
  toggleAnswer8() {
    this.showAnswer8 = !this.showAnswer8;
    if (this.showAnswer8) {
      this.showAnswer = false; // Fermer toggleAnswer si ouvert
      this.showAnswer2 = false; // Fermer toggleAnswer2 si ouvert
      this.showAnswer3 = false;
      this.showAnswer4 = false; // Fermer toggleAnswer3 si ouvert
      this.showAnswer5 = false;
      this.showAnswer6 = false;
      this.showAnswer7 = false;
      this.showAnswer9 = false;
      this.showAnswer10 = false;
      this.showAnswer11 = false;
    }
  }
  toggleAnswer9() {
    this.showAnswer9 = !this.showAnswer9;
    if (this.showAnswer9) {
      this.showAnswer = false; // Fermer toggleAnswer si ouvert
      this.showAnswer2 = false; // Fermer toggleAnswer2 si ouvert
      this.showAnswer3 = false;
      this.showAnswer4 = false; // Fermer toggleAnswer3 si ouvert
      this.showAnswer5 = false;
      this.showAnswer6 = false;
      this.showAnswer7 = false;
      this.showAnswer8 = false;
      this.showAnswer10 = false;
      this.showAnswer11 = false;
    }
  }
  toggleAnswer10() {
    this.showAnswer10 = !this.showAnswer10;
    if (this.showAnswer10) {
      this.showAnswer = false; // Fermer toggleAnswer si ouvert
      this.showAnswer2 = false; // Fermer toggleAnswer2 si ouvert
      this.showAnswer3 = false;
      this.showAnswer4 = false; // Fermer toggleAnswer3 si ouvert
      this.showAnswer5 = false;
      this.showAnswer6 = false;
      this.showAnswer7 = false;
      this.showAnswer8 = false;
      this.showAnswer9 = false;
      this.showAnswer11 = false;
    }
  }
  toggleAnswer11() {
    this.showAnswer11 = !this.showAnswer11;
    if (this.showAnswer11) {
      this.showAnswer = false; // Fermer toggleAnswer si ouvert
      this.showAnswer2 = false; // Fermer toggleAnswer2 si ouvert
      this.showAnswer3 = false;
      this.showAnswer4 = false; // Fermer toggleAnswer3 si ouvert
      this.showAnswer5 = false;
      this.showAnswer6 = false;
      this.showAnswer7 = false;
      this.showAnswer8 = false;
      this.showAnswer9 = false;
      this.showAnswer10 = false;
    }
  }
}