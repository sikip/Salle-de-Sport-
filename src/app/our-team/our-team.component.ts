import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { User } from '../user';
@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.css']
})
export class OurTeamComponent implements OnInit {
  salle: any[] = [];
  displayedSalle: any[] = [];
  users: User[] = [];
  
  constructor(private GaeageserviceService: GaeageserviceService) { }

  ngOnInit() {
    this.getsall();
    this.getUsersWithRoleCoach();
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
  getUsersWithRoleCoach(): void {
    this.GaeageserviceService.getUsersWithRoleCoach().subscribe(
      (users: User[]) => {
        this.users = users.map(user => {
          // Vérifie si user.image est vide
          if (!user.image) {
            // Si user.image est vide, attribuez-lui le chemin de l'image par défaut
            user.image = '../../assets/images/dfb8770ebc590a2eaeb851c87597dfc7.png';
          } else {
            // Sinon, concaténez le préfixe pour une image encodée en base64
            user.image = 'data:image/jpeg;base64,' + user.image;
          }
          return user;
        });
      },
      (error) => {
        console.error('Une erreur s\'est produite : ', error);
      }
    );
}

}