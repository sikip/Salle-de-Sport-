import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authresponse';
import { GaeageserviceService } from '../gaeageservice.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'; // Importez le ActivatedRoute
import { eventtes } from '../eventtes';

import { classes } from '../classes';
import { filter } from 'rxjs';
import { chop } from '../chop';
@Component({
  selector: 'app-emploit',
  templateUrl: './emploit.component.html',
  styleUrls: ['./emploit.component.css']
})
export class EmploitComponent  implements OnInit{
  salle: any[] = [];
  userId: string | undefined;
  displayedSalle: any[] = [];
  classes: classes[]  = [];
  userInfo: any;
  lastAcceptedEvent: any[] = [];
  showDropdown: boolean = false;
  showDropdown2: boolean = false;
  numberOfEvents: number = 0; // Variable pour stocker le nombre d'événements
  imageFile: any;
  cautchId!: number;
  http: any;
  countAcceptedEvents: number = 1;
  showDropdown3: boolean = false;
  showDropdown4: boolean = false;
  pageSize: number = 5; // Nombre d'éléments par page
  currentPage: number = 0; // Page actuelle
  totalPages: number = 0;
  countchop:number=0;
  totalPagesArray: number[] = [];
  chops: chop[] = [];
  constructor(    private route: ActivatedRoute , private  gaeageService: GaeageserviceService,private router: Router) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = Number(params.get('userId')); // Obtenez l'ID de l'utilisateur à partir de la route
      if (userId) {
        this.getUserById(userId);
        this.getChopsByUserId(userId);
        this.getCountChopsByUserId(userId);
        this.gaeageService.getUserById(userId).subscribe(
          (data) => {
            this.userInfo = data;
            // Vérifie si userInfo.image est vide
            if (!this.userInfo.image) {
              // Si userInfo.image est vide, attribuez-lui le chemin de l'image par défaut
              this.userInfo.image = '../../assets/images/dfb8770ebc590a2eaeb851c87597dfc7.png';
            } else {
              // Sinon, concaténez le préfixe pour une image encodée en base64
              this.userInfo.image = 'data:image/jpeg;base64,' + this.userInfo.image;
            }
          },
          (error) => {
            console.error("Erreur lors de la récupération des informations de l'utilisateur:", error);
          }
        );
      }
    }); 
    this.route.params.subscribe(params => {
      this.userId = params['userId'] || 'default';
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (!this.router.url.startsWith('/user')) {
        this.router.navigate([this.router.url.split('/')[4], this.userId]);
      }
    });
  
    this.getAllClasses();
    this.getsall();
    this.loadLastAcceptedEvent();
    this.getCountAcceptedEvents();
    this.route.paramMap.subscribe(params => {
      if (params.has('userId')) {
        this.cautchId = +params.get('userId')!;
      }
    });

  }
  getChopsByUserId(userId: number): void {
    this.gaeageService.getChopsByUserId(userId)
      .subscribe(chops => {
        this.chops = chops.map(chop => {
          return {
            ...chop,
            imageslid1: 'data:image/jpeg;base64,' + chop.imageslid1
          };
        });
      });
  }
  getCountChopsByUserId(userId: number) {
    this.gaeageService.countChopsByUserId(userId).subscribe(
      (count: number) => {
        this.countchop = count;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du nombre d\'événements acceptés après la date actuelle : ', error);
      }
    );
  }
  getCountAcceptedEvents(): void {
    this.gaeageService.getCountAcceptedEventsAfterCurrentDate().subscribe(
      (count: number) => {
        this.countAcceptedEvents = count;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du nombre d\'événements acceptés après la date actuelle : ', error);
      }
    );
  }
 
  getAllClasses() {
    this.gaeageService.getAllClasses().subscribe(classes => {
      this.classes = classes;
      this.calculateTotalPages();
      this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    });
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.classes.length / this.pageSize);
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  getClassesForCurrentPage() {
    const startIndex = this.currentPage * this.pageSize;
    return this.classes.slice(startIndex, startIndex + this.pageSize);
  }
  isActivePage(pageIndex: number): boolean {
    return pageIndex === this.currentPage;
  }
  
  updateNumberOfEvents(): void {
    this.numberOfEvents = this.lastAcceptedEvent.length;
  }

  resetNumberOfEvents(): void {
    this.numberOfEvents = 0; // Réinitialisation du nombre d'événements à zéro
  }
  loadLastAcceptedEvent(): void {
    this.gaeageService.getLastAcceptedEvent().subscribe(
      (events: eventtes[]) => {
        this.lastAcceptedEvent = this.formatDates(events.slice(0, 5));
        // Mettre à jour l'image pour chaque événement
        this.lastAcceptedEvent.forEach(event => {
          event.image = 'data:image/jpeg;base64,' + event.image;
          event.user.image=  'data:image/jpeg;base64,' +  event.user.image;
        });
        this.updateNumberOfEvents(); // Mettre à jour le nombre d'événements
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement du dernier événement accepté:', error);
      }
    );
  }
  

  
  


  getUserById(userId: number): void {
    // Logique pour récupérer les informations de l'utilisateur en utilisant l'ID
    // Placez votre logique ici pour obtenir les informations de l'utilisateur en fonction de l'ID
  }

  getsall(): void {
    this.gaeageService.getsall().subscribe(
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
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
  toggleDropdown2(): void {
    this.showDropdown2 = !this.showDropdown2;
  }
  toggleDropdown3(): void {
    this.showDropdown3 = true;
  }
  toggleDropdown3ferm(): void {
    !this.showDropdown3 ;
  }
  toggleDropdown4(): void {
    this.showDropdown4= !this.showDropdown4;
  }
  formatDates(events: eventtes[]): eventtes[] {
    return events.map(event => {
      const eventDate = new Date(event.addedDate);
      const currentDate = new Date();
      let differenceInSeconds = Math.floor((currentDate.getTime() - eventDate.getTime()) / 1000);
    
      let timeAgo = '';
    
      if (eventDate > currentDate) {
        timeAgo = 'in the future';
      } else {
        const intervals = {
          'year': 31536000,
          'month': 2592000,
          'day': 86400,
          'hour': 3600,
          'minute': 60,
          
        };
  
        for (const [intervalName, intervalSeconds] of Object.entries(intervals)) {
          if (differenceInSeconds >= intervalSeconds) {
            const counter = Math.floor(differenceInSeconds / intervalSeconds);
            timeAgo = `${counter} ${intervalName}`;
            if (counter > 1) {
              timeAgo += 's'; // Pluralize if necessary
            }
            timeAgo += ' ago';
            break;
          }
        }
  
        // If the difference is less than a minute
        if (timeAgo === '') {
          timeAgo = `${differenceInSeconds} second${differenceInSeconds !== 1 ? 's' : ''} ago`;
        }
      }
    
      event.timeAgo = timeAgo;
      return event;
    });
  }
  query: string = '';
  searchResults: any[] = [];
  showResults: boolean = false;
  search(): void {
    if (this.query.trim() !== '') {
      this.gaeageService.search(this.query).subscribe(
        results => {
          // Modifier les images pour utiliser le format base64
          this.searchResults = results.map(result => {
            if (!result.image) {
              // Si result.image est vide, attribuez-lui le chemin de l'image par défaut
              result.image = '../../assets/images/dfb8770ebc590a2eaeb851c87597dfc7.png';
            } else {
              // Sinon, concaténez le préfixe pour une image encodée en base64
              result.image = 'data:image/jpeg;base64,' + result.image;
            }
            return result;
          });
  
          this.showResults = true; // Afficher les résultats une fois qu'ils sont disponibles
        },
        error => {
          console.error('Error fetching search results:', error);
        }
      );
    } else {
      this.searchResults = []; // Vide les résultats si la requête est vide
      this.showResults = false; // Cacher les résultats si la requête est vide
    }
  }
}
