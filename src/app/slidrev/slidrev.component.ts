import { Component } from '@angular/core';
import { salle } from '../salle';
import { GaeageserviceService } from '../gaeageservice.service';

@Component({
  selector: 'app-slidrev',
  templateUrl: './slidrev.component.html',
  styleUrls: ['./slidrev.component.css']
})
export class SlidrevComponent {
  
  salle: salle = {
    id: 0,
    name: '',
    numero: '',
    time: '',
    email: '',
    localisation: '',
    locationexact: '',
    latitude: 0,
    longitude: 0,
    slogon1: '',
    slogon2: '',
    image: '',
    imageslid1: '',
    prix:0
  };
  constructor(private gaeageService: GaeageserviceService) { }
  
  onFileChange(event: any, field: keyof salle) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      (this.salle[field] as any) = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    
    // Ajouter les champs individuels
    formData.append('id', this.salle.id.toString());
    formData.append('name', this.salle.name.toString());
    formData.append('numero', this.salle.numero.toString());
    formData.append('time', this.salle.time.toString());
    formData.append('email', this.salle.email.toString());
    formData.append('localisation', this.salle.localisation.toString());
    formData.append('locationexact', this.salle.locationexact.toString());
    formData.append('latitude', this.salle.latitude.toString());
    formData.append('longitude', this.salle.longitude.toString());
    formData.append('slogon1', this.salle.slogon1.toString());
    formData.append('slogon2', this.salle.slogon2.toString());
    formData.append('prix', this.salle.prix.toString());
    formData.append('imageFile1', this.salle.image);
    formData.append('imageFile2', this.salle.imageslid1);
    // Ajouter les autres fichiers d'image ici...
  
    this.gaeageService.addSalle(formData).subscribe(
      (response) => {
        console.log('Salle ajoutée avec succès', response);
        // Réinitialiser le formulaire ou effectuer d'autres actions si nécessaire
      },
      (error) => {
        if (error.status === 400) {
          console.error('Erreur de validation lors de l\'ajout de la salle', error.error);
          // Manipuler les erreurs de validation ici, par exemple, afficher les messages d'erreur sur le formulaire
        } else {
          console.error('Erreur lors de l\'ajout de la salle', error);
        }
      }
    );
}
}
