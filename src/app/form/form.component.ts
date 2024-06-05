import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  salle: any[] = [];
  displayedSalle: any[] = [];
  constructor(
    private GaeageserviceService: GaeageserviceService
  ) {}
  ngOnInit(): void {
    this.getsall();

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
}
