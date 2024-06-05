import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { User } from '../user';

@Component({
  selector: 'app-ss',
  templateUrl: './ss.component.html',
  styleUrls: ['./ss.component.css']
})
export class SsComponent implements OnInit {
  users: User[] = [];
  displayedVoitures: User[] = [];
  currentIndex = 0;
  itemsPerSlide = 1;
  totalPagesToShow = 5; 
  activeSlide: number = 0;

  constructor(private GaeageserviceService: GaeageserviceService) {}

  ngOnInit(): void {
    this.GaeageserviceService.getuser().subscribe(
      (data: User[]) => {
        this.users = data.slice(0, 3); // Limit to the first three users
        this.users.forEach(user => {
          user.image = 'data:image/jpeg;base64,' + user.image;
        });
        this.updateDisplayedVoitures();
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des voitures :', error);
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
    if (this.currentIndex + this.itemsPerSlide < this.users.length) {
      this.currentIndex += this.itemsPerSlide;
      this.updateDisplayedVoitures();
      this.updateActiveSlide();
    }
  }

  updateDisplayedVoitures(): void {
    this.displayedVoitures = this.users.slice(
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
    const total = Math.ceil(this.users.length / this.itemsPerSlide);
    return Array.from({ length: total }, (_, index) => index);
  }

  updateActiveSlide(): void {
    this.activeSlide = Math.floor(this.currentIndex / this.itemsPerSlide);
  }
}
