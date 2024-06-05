import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-barmenu',
  templateUrl: './barmenu.component.html',
  styleUrls: ['./barmenu.component.css']
})
export class BarmenuComponent implements OnInit {
  salle: any[] = [];
  displayedSalle: any[] = [];

  constructor(private GaeageserviceService: GaeageserviceService) { }

  ngOnInit() {
    this.getsall();
    this.initializeAOS();
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

  generateGoogleMapsLink(latitude: number, longitude: number): string {
    return `https://www.google.com/maps/place/${latitude},${longitude}`;
  }

  private initializeAOS(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }
}
