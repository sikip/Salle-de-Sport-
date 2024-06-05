import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { salle } from '../salle';

@Component({
  selector: 'app-admin2',
  templateUrl: './admin2.component.html',
  styleUrls: ['./admin2.component.css']
})
export class Admin2Component implements OnInit {
  public showModal: boolean = false;
  salle: salle[] = [];
  salleToUpdate = {
    id: "",
    name:"",
    email: "",
    numero:"",
    localisation:"",
    locationexact:"",
    latitude:"",
    longitude:"",
    slogon1:"",
    slogon2:"",
  };

  constructor(private gaeageserviceService: GaeageserviceService) {}

  ngOnInit(): void {
    this.getsall();
  }

  getsall(): void {
    this.gaeageserviceService.getsall().subscribe(
      (data: salle[]) => {
        this.salle = data;
        // Convertir les images en format base64
        this.salle.forEach(salle => {
          salle.image = 'data:image/jpeg;base64,' + salle.image;
          salle.imageslid1 = 'data:image/jpeg;base64,' + salle.imageslid1;
        });
      },
      (error) => {
        console.error("Erreur lors de la récupération des salles:", error);
      }
    );
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  openModal(salle: salle): void {
    this.edit(salle);
    this.toggleModal();
  }

  edit(salle: salle): void {
    this.salleToUpdate = {
      id: salle.id.toString(),
      email: salle.email.toString(), 
      numero: salle.numero.toString(), 
      name: salle.name.toString(), 
      localisation: salle.localisation.toString(), 
      locationexact: salle.locationexact.toString(), 
      latitude: salle.latitude.toString(),
      longitude: salle.longitude.toString(),
      slogon1: salle.slogon1.toString(),
      slogon2: salle.slogon2.toString(),
    };
  }
  
}
