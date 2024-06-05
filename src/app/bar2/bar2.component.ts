import { Component, HostListener, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
@Component({
  selector: 'app-bar2',
  templateUrl: './bar2.component.html',
  styleUrls: ['./bar2.component.css']
})
export class Bar2Component implements OnInit {
  salle: any[] = [];
  displayedSalle: any[] = [];

  constructor(private GaeageserviceService: GaeageserviceService) { }
  showMenu: boolean = false;

 

  ngOnInit() {
    this.onWindowScroll(); 
    this.getsall();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Vérifie si l'utilisateur a fait défiler la page vers le bas
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showMenu = scrollPosition > 300; // Vous pouvez ajuster 100 selon vos besoins
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
