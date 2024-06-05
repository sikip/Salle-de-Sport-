import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GaeageserviceService } from '../gaeageservice.service';

@Component({
  selector: 'app-baracautch',
  templateUrl: './baracautch.component.html',
  styleUrls: ['./baracautch.component.css']
})
export class BaracautchComponent implements OnInit, AfterViewInit {
 
  id: string | undefined;
  activeTab: string = '';
  eventfalse: number = 1;
  currentNumber4: number = 0;
  isMenuOpen: boolean = false;
  menuOrder: string[] = ['salle', 'prof', 'command'];

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private gaeageserviceService: GaeageserviceService // Injection du service
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['userId'] || 'default';
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (!this.router.url.startsWith('/user-information')) {
        this.router.navigate([this.router.url.split('/')[2], this.id]);
      }
    });
  }

  ngAfterViewInit(): void {
    // Assurez-vous que contentToConvert est initialisé avant d'utiliser downloadPdf()
    // Vous pouvez également appeler downloadPdf() ici si vous le souhaitez
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  switchMenu(option: string): void {
    if (this.menuOrder.includes(option)) {
      const index = this.menuOrder.indexOf(option);
      this.menuOrder.splice(index, 1);
      this.menuOrder.unshift(option);
    }
  }


  
}




