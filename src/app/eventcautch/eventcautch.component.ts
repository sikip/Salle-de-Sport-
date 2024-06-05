import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Chart } from 'chart.js';
import { User } from '../user';
import { eventtes } from '../eventtes';
import { classes } from '../classes';
import { chop } from '../chop';
@Component({
  selector: 'app-eventcautch',
  templateUrl: './eventcautch.component.html',
  styleUrls: ['./eventcautch.component.css']
})
export class EventcautchComponent  implements OnInit  {
  salle: any[] = [];
  users: User[] = [];
  user:User| undefined;
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
  classes: classes[] = [];
  userAttributes: any;
  userId: number | undefined;
  numberOfClasses: number = 1;
  countAcceptedEvents: number = 1;
  eventsCount: number =1;
  intervalId: any; 
 countchop:number=0;
 chops: chop[] = [];
 events: eventtes[] = [];
 lastEvent: eventtes | undefined;
 event: eventtes = {  // Déclarez la propriété event et initialisez-la avec des valeurs par défaut ou vides
  id: 0,
  image: "",
  image2: "",
  nom: '',
  tag: '',
  petdescription: '',
  nomecrivan: '',
  article: "",
  revieuxadmin: "",
  image3: "",
  image4: "",
  nomconsei: "",
  paragraphs: "",
  paragraphe2: "",
  paragraphe3: "",
  addedDate: new Date(),
  likeus: 0,
  datee: new Date(),
  nbplace: 0,
  prix: 0,
  user: {
    username: '',
    email: '',
    telephone: 0,
    image: ""
  }
};
  constructor(
    private route: ActivatedRoute,
    private gaeageService: GaeageserviceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = parseInt(params['userId']);
      if (this.userId) {
        this.getUserById(this.userId);
        this.getCountChopsByUserId(this.userId);
        this.getChopsByUserId(this.userId);
        this.intervalId = setInterval(() => {
          this.getUserById(this.userId!);

          this.loadLastAcceptedEvent();
          this.getCountAcceptedEvents();
        }, 1000);
      }
    });
  
    this.loadLastAcceptedEvent();
    this.getsall();
    this.getCountAcceptedEvents();
    this.getAllEvents();
    this.route.paramMap.subscribe(params => {
      if (params.has('userId')) {
        this.cautchId = +params.get('userId')!;
      }
    });
 
    this.route.paramMap.subscribe(params => {
      const userId = Number(params.get('userId'));
      if (userId) {

      }
    });
    this.route.params.subscribe(params => {
      this.userId = params['userId'] || 'default';
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (!this.router.url.startsWith('/updateuser')) {
        this.router.navigate([this.router.url.split('/')[4], this.userId]);
      }
    });
  }
  getAllEvents(): void {
    this.gaeageService.getAllEvents()
      .subscribe(events => {
        if (events && events.length > 0) {
          this.lastEvent = events[events.length - 1];
          console.log('Dernier événement récupéré avec succès:', this.lastEvent);
        } else {
          console.log('Aucun événement récupéré.');
        }
        this.events = events; // Si nécessaire, affectez également les événements récupérés à la propriété events
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
  addEvent(userId: number): void {
    this.gaeageService.addEvent(this.event, userId)
      .subscribe(savedEvent => {
        console.log('Événement ajouté avec succès:', savedEvent);
      });
  }
  getUserById(userId: number): void {
    this.gaeageService.getUserById(userId).subscribe(
      (data: any) => {
        this.userInfo = data;
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
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
  toggleDropdown2(): void {
    this.showDropdown2 = !this.showDropdown2;
  }
  toggleDropdown3(): void {
    this.showDropdown3 = !this.showDropdown3;
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
  
 
}

