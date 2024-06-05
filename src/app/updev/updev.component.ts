import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { GaeageserviceService } from '../gaeageservice.service';

@Component({
  selector: 'app-updev',
  templateUrl: './updev.component.html',
  styleUrls: ['./updev.component.css']
})
export class UpdevComponent implements OnInit {
  eventId!: number;

  constructor(
    private route: ActivatedRoute,
    private gaeageService: GaeageserviceService
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID de l'événement à partir du chemin
    const eventIdFromRoute = this.route.snapshot.paramMap.get('eventId');
    if (eventIdFromRoute) {
      this.eventId = +eventIdFromRoute; // Convertir l'ID en nombre et l'assigner à eventId
      this.updateAcceptation(this.eventId, 'True');
    } else {
      console.error('ID de l\'événement non trouvé dans le chemin.');
    }
  }

  updateAcceptation(eventId: number, acceptation: string): void {
    this.gaeageService.updateAcceptationById(eventId, acceptation).subscribe(
      () => {
        console.log('Acceptation mise à jour avec succès.');
        // Gérer la suite des actions ici, par exemple actualiser la liste des événements
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'acceptation :', error);
        // Gérer les erreurs ici
      }
    );
  }
}


