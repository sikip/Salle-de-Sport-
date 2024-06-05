import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { reieuxclasses } from '../revieuxclasse'; 

@Component({
  selector: 'app-rev',
  templateUrl: './rev.component.html',
  styleUrls: ['./rev.component.css']
})
export class RevComponent  implements OnInit {
  salle: any[] = [];
  displayedSalle: any[] = [];
  reieuxclasses: reieuxclasses[] = [];
  constructor(private GaeageserviceService: GaeageserviceService) { }
  ngOnInit() {
    this.getsall();
    this.getAllRevieuxClasses();
  }
  getAllRevieuxClasses(): void {
    this.GaeageserviceService.getAllRevieuxClasses()
      .subscribe(data => {
        // Filtrer les avis de classe avec un commentaire non vide
        this.reieuxclasses = data.filter(reieuxclasses => reieuxclasses.comment.trim() !== '');
      });
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
  generateStarRating(starRating: number): string {
    let stars = '';
    for (let i = 0; i < starRating; i++) {
      stars += '⭐'; // Ajoute une étoile à la chaîne
    }
    return stars;
  }
}
