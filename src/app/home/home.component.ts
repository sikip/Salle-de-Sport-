import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    items = [
        { imageSrc: '../../assets/images/theme_image_23-po9yq4xpj70oo6oz8lrqbhmupl4dc2h901t66vrmrw.jpg' },
        { imageSrc:  '../../assets/images/project_detail_02-po9yq4xpj70oo6oz8lrqbhmupl4dc2h901t66vrmrw.jpg' },
        { imageSrc: '../../assets/images/theme_image_24-po9yq4xpj70oo6oz8lrqbhmupl4dc2h901t66vrmrw.jpg' }
    ];
    currentIndex = 0;
    itemsPerSlide = 2;
    totalPagesToShow = 2;
    activeSlide = 0;
    prevActiveSlide: number | null = null;

    @ViewChild('cardContainer') cardContainerRef!: ElementRef;

    ngAfterViewInit(): void {
        // Centrer la deuxième image sur la première page
        const initialIndex = Math.max(0, (this.itemsPerSlide - 1) / 2);
        this.currentIndex = initialIndex;
        this.activeSlide = Math.floor(this.currentIndex / this.itemsPerSlide);
        this.updateCardContainerPosition();
    }

    nextSlide(): void {
        if (this.currentIndex + 1 < this.items.length) {
            this.currentIndex++;
            this.updateCardContainerPosition();
            this.activeSlide = Math.floor(this.currentIndex / this.itemsPerSlide);
        } else {
            this.currentIndex = 0;
            this.updateCardContainerPosition();
            this.activeSlide = 0;
        }
    }

    prevSlide(): void {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCardContainerPosition();
            this.activeSlide = Math.floor(this.currentIndex / this.itemsPerSlide);
        } else {
            this.currentIndex = this.items.length - 1;
            this.updateCardContainerPosition();
            this.activeSlide = Math.floor(this.currentIndex / this.itemsPerSlide);
        }
    }

    updateCardContainerPosition(): void {
        const cardContainer = this.cardContainerRef.nativeElement as HTMLElement;
        cardContainer.style.transform = `translateX(-${this.currentIndex * (100 / this.itemsPerSlide)}%)`;
    }

    totalPages(): number[] {
        const total = Math.ceil(this.items.length / this.itemsPerSlide);
        const activePageIndex = this.activeSlide;
        const firstPageIndex = Math.max(0, activePageIndex - Math.floor(this.totalPagesToShow / 2));
        const lastPageIndex = Math.min(total - 1, firstPageIndex + this.totalPagesToShow - 1);

        return Array.from({ length: lastPageIndex - firstPageIndex + 1 }, (_, index) => firstPageIndex + index);
    }
}
