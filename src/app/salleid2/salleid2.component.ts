import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GaeageserviceService } from '../gaeageservice.service';
import { salle } from '../salle';

@Component({
  selector: 'app-salleid2',
  templateUrl: './salleid2.component.html',
  styleUrls: ['./salleid2.component.css']
})
export class Salleid2Component implements OnInit {

  id: number | undefined;
  numero: string = '';
  time: string = '';
  email: string = '';
  localisation: string = '';
  locationexact: string = '';
  latitude: number = 0;
  longitude: number = 0;
  slogon1: string = '';
  slogon2: string = '';
  name: string = '';
  prix: number = 0;
  constructor(
    private route: ActivatedRoute,
    private GaeageserviceService: GaeageserviceService
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID du paramètre de route
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.id = +idParam;
      }
    });
  }

  updateSalle(): void {
    if (this.id !== undefined) {
      const data: salle = {
        id: this.id,
        image: '', // Ajoutez la propriété 'image' avec une valeur par défaut ou fournissez une valeur réelle
        imageslid1: '', // Ajoutez la propriété 'imageslid1' avec une valeur par défaut ou fournissez une valeur réelle
        numero: this.numero,
        time: this.time,
        email: this.email,
        localisation: this.localisation,
        locationexact: this.locationexact,
        latitude: this.latitude,
        longitude: this.longitude,
        slogon1: this.slogon1,
        slogon2: this.slogon2,
        name: this.name,
        prix:this.prix
      };
      
      this.GaeageserviceService.updateSalle(this.id, data).subscribe(response => {
        console.log('Salle mise à jour avec succès :', response);
        // Gérer la réponse ou actualiser la vue en conséquence
      }, error => {
        console.error('Erreur lors de la mise à jour de la salle :', error);
        // Gérer l'erreur en conséquence
      });
    } else {
      console.error('Impossible de mettre à jour la salle : ID non défini.');
    }
  }
}
