import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { salle } from '../salle';
import * as AOS from 'aos';
@Component({
  selector: 'app-map2',
  templateUrl: './map2.component.html',
  styleUrls: ['./map2.component.css']
})
export class Map2Component implements OnInit {
  salles: salle[] = [];

  currentIndex = 0;
  itemsPerSlide = 1;
  activeSlide = 0;
  displayedSalle: any[] = [];
  totalPagesToShow = 5; 

  constructor(private GaeageserviceService: GaeageserviceService) { }

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
  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.itemsPerSlide;
      this.updateDisplayedVoitures();
      this.updateActiveSlide();
    }
  }

  nextSlide(): void {
    if (this.currentIndex + this.itemsPerSlide < this.salles.length) {
      this.currentIndex += this.itemsPerSlide;
      this.updateDisplayedVoitures();
      this.updateActiveSlide();
    }
  }

  updateDisplayedVoitures(): void {
    this.displayedSalle = this.salles.slice(
      this.currentIndex,
      this.currentIndex + this.itemsPerSlide
    );
  }

  goToSlide(index: number): void {
    this.currentIndex = index * this.itemsPerSlide;
    this.updateDisplayedVoitures();
    this.updateActiveSlide();
  }

  totalPages(): number[] {
    const total = Math.ceil(this.salles.length / this.itemsPerSlide);
    return Array.from({ length: total }, (_, index) => index);
  }

  updateActiveSlide(): void {
    this.activeSlide = Math.floor(this.currentIndex / this.itemsPerSlide);
  }
}

