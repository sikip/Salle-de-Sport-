import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { salle } from '../salle';
import * as AOS from 'aos';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  salles: salle[] = [];

  currentIndex = 0;
  itemsPerSlide = 1;
  activeSlide = 0;
  displayedSalle: any[] = [];
  constructor(private GaeageserviceService: GaeageserviceService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.fetchSalles();
  }

  ngAfterViewInit() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      delay: 100
    });
  }

  fetchSalles() {
    this.GaeageserviceService.getsall().subscribe(
      (data: salle[]) => {
        this.salles = data;
        this.displayedSalle = this.salles.slice(0, 1);
      },
      error => {
        console.error('Erreur lors de la récupération des salles', error);
      }
    );
  }

  getMapUrl(salle: any): SafeResourceUrl {
    if (salle && salle.latitude && salle.longitude) {
      const mapUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13249.171235845015!2d${salle.longitude}!3d${salle.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2stn!4v1707155414738!5m2!1sar!2stn&markers=color:red%7C${salle.latitude},${salle.longitude}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
    } else {
      return '';
    }
  }
}