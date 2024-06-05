import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GaeageserviceService } from '../gaeageservice.service';
import { salle } from '../salle';

@Component({
  selector: 'app-sallid',
  templateUrl: './sallid.component.html',
  styleUrls: ['./sallid.component.css']
})
export class SallidComponent implements OnInit {
  salleId!: number;
  salle: salle | undefined;
  image1: File | undefined;
  image2: File | undefined;
  id_cordonner!: number;


  numero: string = "";
  time: string = "";
  email: string = "";
  localaisation: string = "";
  locationexact: string = "";
  latitude: number = 0;
  longitude: number = 0;
  slogon1: string = "";
  slogon2: string = "";
  name: string = "";
  prix: number = 0;
  constructor(
    private route: ActivatedRoute,
    private GaeageserviceService: GaeageserviceService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.salleId = Number(params.get('id'));
      this.getSalleById(this.salleId);
      this.GaeageserviceService.setActiveTab('salle');

    });
  }
  updateSalle(): void {
    this.GaeageserviceService.updateSalle2(this.salleId, this.numero, this.time, this.email,
      this.localaisation, this.locationexact, this.latitude,
      this.longitude, this.slogon1, this.slogon2,this.prix ,this.name)
      .subscribe(response => {
        console.log('Salle mise à jour avec succès:', response);
        // Réinitialisez les champs de formulaire après la mise à jour réussie si nécessaire
        this.resetForm();
      }, error => {
        console.error('Erreur lors de la mise à jour de la salle:', error);
      });
  }





  





  resetForm(): void {
    // Réinitialisez les valeurs des champs de formulaire après la mise à jour réussie
    this.numero = '';
    this.time = '';
    this.email = '';
    this.localaisation = '';
    this.locationexact = '';
    this.prix=0;
    this.slogon1 = '';
    this.slogon2 = '';
    this.name = '';
  }




  getSalleById(salleId: number): void {
    this.GaeageserviceService.getSalleById(salleId).subscribe(
      (salle: salle) => {
        this.salle = salle;
        // Convertir les images en format base64
        this.salle.image = 'data:image/jpeg;base64,' + this.salle.image;
        this.salle.imageslid1 = 'data:image/jpeg;base64,' + this.salle.imageslid1;
        console.log('Salle récupérée:', this.salle);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des détails de la salle :', error);
      }
    );
  }

  onFileSelected(event: any, index: number) {
    const file: File = event.target.files[0];
    if (index === 1) {
      this.image1 = file;
    } else if (index === 2) {
      this.image2 = file;
    }
  }

  ajouterImagesALaSalle(): void {
    if (this.salle && this.image1 && this.image2) {
      this.GaeageserviceService.ajouterImagesALaSalle(this.salleId, this.image1, this.image2).subscribe(
        () => {
          console.log('Images ajoutées avec succès à la salle avec l\'ID :', this.salleId);
          // Ajoutez ici la logique supplémentaire en cas de succès
        },
        (error) => {
          console.error('Erreur lors de l\'ajout des images à la salle :', error);
          // Ajoutez ici la logique en cas d'erreur
        }
      );
    } else {
      console.error('Veuillez sélectionner deux images.');
    }
  }

}
