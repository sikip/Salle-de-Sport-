import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GaeageserviceService } from '../gaeageservice.service';

@Component({
  selector: 'app-barad',
  templateUrl: './barad.component.html',
  styleUrls: ['./barad.component.css']
})
export class BaradComponent implements OnInit {
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
      this.id = params['id'] || 'default';
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (!this.router.url.startsWith('/admin')) {
        this.router.navigate([this.router.url.split('/')[4], this.id]);
      }
    });

    this.fetcheventCount3();
  }
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getActiveTab(): string {
    return this.activeTab;
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
  private fetcheventCount3(): void {
    this.gaeageserviceService.getNumberEventfalse().subscribe(
      (count: number) => {
        this.eventfalse = count;
        this.animateNumbers4();
      },
      (error) => {
        console.error('Error fetching event count:', error);
      }
    );
  }
  private animateNumbers4(): void {
    const interval3 = setInterval(() => {
      if (this.currentNumber4 < this.eventfalse) {
        this.currentNumber4 += 1;
      } else {
        clearInterval(interval3);
      }
    }, 20);
  }
}
