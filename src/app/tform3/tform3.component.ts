import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { ActivatedRoute } from '@angular/router';
import { offre } from '../offre'; 
@Component({
  selector: 'app-tform3',
  templateUrl: './tform3.component.html',
  styleUrls: ['./tform3.component.css']
})
export class Tform3Component implements OnInit{
  salle: any[] = [];
  offre: offre | undefined;
  displayedSalle: any[] = [];
  id!: number;
  constructor(
    private GaeageserviceService: GaeageserviceService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // Convertir l'ID en nombre
      if (this.id) {
        this.getOffreById(this.id);
      }
    });
    this.getsall(); // Si nécessaire, corrigez cette ligne si vous avez une fonction nommée getAll() dans votre composant
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
  getOffreById(id: number): void {
    this.GaeageserviceService.getOffreById(id)
      .subscribe(offre => this.offre = offre);
  }
}
