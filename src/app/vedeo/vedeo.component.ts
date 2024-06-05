import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { AuthService } from '../authresponse';

import { eventtes } from '../eventtes';
import { HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Chart } from 'chart.js';
import { User } from '../user';
import { chop } from '../chop';
import { clientaccept } from '../clientaccept';
@Component({
  selector: 'app-vedeo',
  templateUrl: './vedeo.component.html',
  styleUrls: ['./vedeo.component.css']
})
export class VedeoComponent implements OnInit {
  selectedFile: File | undefined;
  id: number | undefined;
  salle: any[] = [];
  users: User[] = [];
  remoi3: number=1 ; 
  displayedSalle: any[] = [];
  userInfo: any;
  lastAcceptedEvent: any[] = [];
  showDropdown: boolean = false;
  showDropdown2: boolean = false;
  showDropdown3: boolean = false;
  showDropdown4: boolean = false;
  numberOfEvents: number = 0; // Variable pour stocker le nombre d'événements
  imageFile: any;
  cautchId!: number;
  http: any;
  userAttributes: any;
  userId: string | undefined;
  numberOfClasses: number = 1;
  countAcceptedEvents: number = 1;
  eventsCount: number =1;
  remoi2: number=1 ; 
  countchop:number=0;
  chops: chop[] = [];
  events: any[] = [];
  client:number=1;
  clientAccepts: clientaccept[] = [];
  constructor(private route: ActivatedRoute, private gaeageService: GaeageserviceService, private router: Router ) { }

  ngOnInit(): void {


    this.route.params.subscribe(params => {
      this.id = +params['id']; // Récupération de l'ID depuis les paramètres de l'URL
    });
    this.route.paramMap.subscribe(params => {
      const userId = Number(params.get('userId')); // Obtenez l'ID de l'utilisateur à partir de la route
      if (userId) {
        this.getUserById(userId);
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
  this.getsall();
  this.loadLastAcceptedEvent();
 
  this.getCountAcceptedEvents();
  this.route.paramMap.subscribe(params => {
    if (params.has('userId')) {
      this.cautchId = +params.get('userId')!;
    }
  });
  this.route.paramMap.subscribe(params => {
    const userId = Number(params.get('userId'));
    if (userId) {

      this.countClassesByUserId(userId);
      this.calculcaount(userId);
      this.getNumberOfEventsByUserId(userId);
      this.getCountChopsByUserId(userId);
      this.getChopsByUserId(userId);
      this.countEventByMonth(userId);
      this.calculateAcceptedRevenueForUserInCurrentMonth(userId);
      this.loadEvents(userId);
      this.countAcceptedClientsByUserId(userId);
      this.loadClientAccepts(userId); 
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

  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (!this.selectedFile) {
      console.log('Please select a file to upload.');
      return;
    }

    if (this.id === undefined) {
      console.log('Invalid ID.');
      return;
    }

    this.gaeageService.uploadVideo(this.id, this.selectedFile).subscribe(
      response => {
        console.log('Video uploaded successfully:', response);
        // Handle success response
      },
      error => {
        console.error('Error uploading video:', error);
        // Handle error
      }
    );
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
  getNumberOfEventsByUserId(userId: number) {
    this.gaeageService.getNumberOfEventsByUserId(userId).subscribe(
      count => {
        this.eventsCount = count;
      },
      error => {
        console.log('Une erreur s\'est produite lors de la récupération du nombre d\'événements :', error);
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
  getUsersWithRoleCoach(): void {
    this.gaeageService.getUsersWithRoleCoach().subscribe(
      (users: User[]) => {
        this.users = users.slice(0,7);
      },
      (error) => {
        console.error('Une erreur s\'est produite : ', error);
      }
    );
  }
  loadClientAccepts(userId: number): void {
    this.gaeageService.getClientAcceptsByUserId(userId)
      .subscribe(clientAccepts => {
        this.clientAccepts = clientAccepts;
      });
  }
  countClassesByUserId(userId:number ) {
    this.gaeageService.countClassesByUserId(userId)
    .subscribe(count => {
      this.numberOfClasses = count;
    });
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
    this.showDropdown4 = !this.showDropdown4;
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
  countEventByMonth(userId: number): void {
    this.gaeageService.countEventByMonth(userId).subscribe(data => {
      const labels = Object.keys(data);
      const values = Object.values(data);

      const ctx = document.getElementById('barChart') as HTMLCanvasElement;
      const barChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Nombre d\'utilisateurs par mois',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
     
      });
    });
  }
  calculcaount(userId: number) {
    this.gaeageService.calculcaount(userId).subscribe(
      (count: number) => {
        this.remoi3 = count;  
      },
      (error) => {
        console.error('Error fetching car count:', error);
      }
    );
  }
  calculateAcceptedRevenueForUserInCurrentMonth(userId: number) {
    this.gaeageService.calculateAcceptedRevenueForUserInCurrentMonth(userId).subscribe(
      (count: number) => {
        this.remoi2 = count;  
      },
      (error) => {
        console.error('Error fetching car count:', error);
      }
    );
  }
  loadEvents(userId: number): void {
    this.gaeageService.getAcceptedEventsByUserId(userId)
      .subscribe(events => {
        this.events = events.slice(0, 4);
      });
  }
  countAcceptedClientsByUserId(userId: number) {
    this.gaeageService.countAcceptedClientsByUserId(userId).subscribe(
      (count: number) => {
        this.client = count;  
      },
      (error) => {
        console.error('Error fetching car count:', error);
      }
    );
  }
  }




