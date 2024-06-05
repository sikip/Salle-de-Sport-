import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GaeageserviceService } from '../gaeageservice.service';
import { offre } from '../offre';

@Component({
  selector: 'app-offreid',
  templateUrl: './offreid.component.html',
  styleUrls: ['./offreid.component.css']
})
export class OffreidComponent implements OnInit {
  offreId!: number;
  offre: offre | undefined;

  nom: string = "";
  prix: number = 0;
  classe: string = "";
  month: string = "";
  message: number = 0;
  entrepr: number = 0;

  updateMessage: string = ''; // Propriété pour stocker le message de mise à jour

  constructor(
    private route: ActivatedRoute,
    private GaeageserviceService: GaeageserviceService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.offreId = Number(params.get('id'));
    });
  }

  updateOffre(): void {
    this.GaeageserviceService.updateOffre(this.offreId, this.nom, this.prix, this.classe, this.month, this.message, this.entrepr)
      .subscribe(response => {
        console.log('Offre mise à jour avec succès:', response);
        this.updateMessage = 'Offre mise à jour avec succès.';
        this.resetForm();
      }, error => {
        console.error('Erreur lors de la mise à jour de l\'offre:', error);
        if (error.status === 404) {
          this.updateMessage = 'L\'offre avec cet ID n\'existe pas.';
        } else {
          this.updateMessage = 'Une erreur s\'est produite lors de la mise à jour de l\'offre.';
        }
      });
  }

  resetForm(): void {
    this.nom = '';
    this.classe = '';
    this.month = '';
    this.prix = 0;
    this.message = 0;
    this.entrepr = 0;
  }
}
