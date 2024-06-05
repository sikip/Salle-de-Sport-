import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { eventtes } from '../eventtes';
@Component({
  selector: 'app-inesev',
  templateUrl: './inesev.component.html',
  styleUrls: ['./inesev.component.css']
})
export class InesevComponent implements OnInit {
  userId: number | undefined;
  eventId: number | undefined;
  videoUrl: string | undefined;
  buttonClicked: boolean = false;
  eventtes: eventtes | undefined;
  salle: any[] = [];
  users: User[] = [];
  displayedSalle: any[] = [];
  lastAcceptedEvent: any[] = [];
  numberOfEvents: number = 0;
  userInfo: any;
  showDropdown: boolean = false;
  showDropdown2: boolean = false;
  userCount: number | undefined;
  countAcceptedEvents: number = 1 ;
  eventLiked: boolean = true;
  response: any; 
  errorMessage:any;
  likesCount: number=0;
  showDropdown3: boolean=false;
  constructor(private route: ActivatedRoute, private gaeageService: GaeageserviceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = parseInt(params['userId']);
      this.eventId = parseInt(params['id']);

      // Vérifier si userId et eventId sont définis avant d'appeler les méthodes appropriées

      if(this.userId){
        this.getUserById(this.userId);
      }
            if (this.eventId && !isNaN(this.eventId) ) {
        this.getEventDetails(this.eventId);
        this.getNumberOfUsers(this.eventId);
        this.showVideo(this.eventId);
        this.getUsersByEventId(this.eventId);
        this.getLikesCount(this.eventId);
      }
    });

    this.getsall(); 
    this.loadLastAcceptedEvent();
    this.getCountAcceptedEvents();
    this.checkIfLiked();
   this.likeEvent2();
  }
  getLikesCount(eventId: number) {
    this.gaeageService.countLikesByEventId(eventId)
    .subscribe(count => {
      this.likesCount = count;
    });
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
  getUsersByEventId(eventId: number) {
    this.gaeageService.getUsersByEventId(eventId)
    .subscribe(users => {
      this.users = users.slice(0,4);
    });
  }
  showVideo(eventId: number) {
    // Appelez le service pour récupérer la vidéo correspondant à l'événement
    this.gaeageService.playVideoByEventId(eventId).subscribe((blob) => {
      const videoUrl = URL.createObjectURL(blob);
      this.videoUrl = videoUrl;
  
    });
  }
  getNumberOfUsers(eventId: number) {
    this.gaeageService.countUsersByEventId(eventId).subscribe(
      (count: number) => {
        this.userCount = count; // Affecter le nombre d'utilisateurs à la propriété userCount
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de la récupération du nombre d\'utilisateurs associés à l\'événement :', error);
      }
    );
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
       
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement du dernier événement accepté:', error);
      }
    );
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
getEventDetails(eventId: number): void {
  this.gaeageService.getVoitureDetails(eventId).subscribe(
    (event: eventtes) => {
      this.eventtes = event;
      // Formatage des images de l'événement
      this.eventtes.image = 'data:image/jpeg;base64,' + this.eventtes.image;
      this.eventtes.image2 = 'data:image/jpeg;base64,' + this.eventtes.image2;
      this.eventtes.image3 = 'data:image/jpeg;base64,' + this.eventtes.image3;
      this.eventtes.image4 = 'data:image/jpeg;base64,' + this.eventtes.image4;

      // Vérifier si l'utilisateur est défini
      if (this.eventtes.user) {
        // Formatage de l'image de l'utilisateur
        this.eventtes.user.image = 'data:image/jpeg;base64,' + this.eventtes.user.image;
      }
    },
    (error) => {
      console.error('Une erreur s\'est produite lors de la récupération des détails de l\'événement :', error);
    }
  );
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

  likeEvent2(): void {
    if (this.userId !== undefined && this.eventId !== undefined) {
      // Vérifier si l'utilisateur a déjà aimé l'événement
      if (!this.eventLiked) {
        this.gaeageService.likeEvent2(this.userId, this.eventId).subscribe(
          response => {
            console.log(response); // Affichez également la réponse dans la console pour le débogage
            this.eventLiked = true;
          },
          error => {
            console.error('Une erreur s\'est produite : ', error); // Gérez l'erreur comme vous le souhaitez
          }
        );
      } else {
        console.log('L\'utilisateur a déjà aimé cet événement.');
      }
    } else {
      console.error('Les IDs d\'utilisateur et d\'événement ne sont pas définis.');
    }
  }
  checkIfLiked(): void {
    if (this.userId  && this.eventId ) { // Vérifiez que userId et eventId sont définis
      this.gaeageService.checkIfLiked(this.userId, this.eventId).subscribe(
        response => {
          this.eventLiked = response
          console.log(response);
        },
        error => {
          console.error('Une erreur s\'est produite lors de la vérification si l\'événement a été aimé : ', error);
        }
      );
    } else {
      console.error('Les IDs d\'utilisateur et d\'événement ne sont pas définis.');
    }
  }

  inscrireUtilisateurAEvente(): void {
    if (this.userId !== undefined && this.eventId !== undefined) {
      this.gaeageService.inscrireUtilisateurAEvente(this.userId, this.eventId).subscribe(
        response => {
          this.response = response;
          console.log(response); // Affichez également la réponse dans la console pour le débogage
          // Rediriger vers la page de succès d'inscription si nécessaire
        },

        error => {
          console.error('Une erreur s\'est produite : ', error); // Gérez l'erreur comme vous le souhaitez
          this.errorMessage = error.message; // Enregistrer le message d'erreur
        }
      );
    } else {
      console.error('Les IDs d\'utilisateur et de classe ne sont pas définis.');
    }
  }
  toggleDropdown3(): void {
    this.showDropdown3 = true;
  }
  toggleDropdown3ferm(): void {
    !this.showDropdown3 ;
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
            result.image = 'data:image/jpeg;base64,' + result.image;
            return result;
          });
          this.showResults = true; // Afficher les résultats une fois qu'ils sont disponibles
        },
        error => {
          console.error('Error fetching search results:', error);
        }
      );
    } else {
      this.showResults = true; // Cacher les résultats si la requête est vide
    }
  }
}  

