import { Component, OnInit } from '@angular/core';
import { offre } from '../offre';
import { GaeageserviceService } from '../gaeageservice.service';
@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  offre: offre = new offre(); // Initialisez avec une nouvelle instance d'Offre
  offres: offre[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  constructor(
    private GaeageserviceService: GaeageserviceService
  ) { }
  ngOnInit(): void {
    this.getAllOffre(); 
  }

  onSubmit(): void {
    this.GaeageserviceService.addOffre(this.offre).subscribe(
      response => {
        this.successMessage = 'L\'offre a été ajoutée avec succès.';
        this.offre = new offre(); // Réinitialiser l'offre après l'ajout
      },
      error => {
        this.errorMessage = 'Une erreur s\'est produite lors de l\'ajout de l\'offre.';
        console.error('Erreur lors de l\'ajout de l\'offre :', error);
      }
    );
  }
  getAllOffre(): void {
    this.GaeageserviceService.getAllOffre().subscribe(
      (data: offre[]) => {
        this.offres = data;
        if (this.offres.length === 0) {
          this.errorMessage = 'Aucune offre n\'existe.';
        }
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des offres :', error);
      }
    );
  }
}