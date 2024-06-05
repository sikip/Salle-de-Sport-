import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { ActivatedRoute } from '@angular/router';
import { classes } from '../classes'; // Renommé la classe classes en Classes
import { User } from '../user';
import { eventtes } from '../eventtes';
import { chop } from '../chop';
@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {
  userId: number | undefined;
  classeId: number | undefined;
  videoUrl: string | undefined;
  buttonClicked: boolean = false;
  salle: any[] = [];
  users: User[]= [];
  displayedSalle: any[] = [];
  lastAcceptedEvent: any[] = [];
  classes: classes | undefined;// Renommé la variable classes en Classes
  numberOfEvents: number = 0;
  userInfo: any;
  showDropdown: boolean = false;
  showDropdown2: boolean = false;
  showDropdown4: boolean = false;
  userCount: number | undefined;
  countAcceptedEvents: number = 1 ;
  chops: chop[] = [];
  countchop:number=0;
  constructor(private route: ActivatedRoute, private gaeageService: GaeageserviceService) { }

  ngOnInit(): void {
    // Récupérer les IDs d'utilisateur et de classe à partir de l'URL
    this.route.params.subscribe(params => {
      this.userId = parseInt(params['userId']);
      this.classeId = parseInt(params['classeId']);
      
      // Vérifier si userId et classeId sont définis avant d'appeler getClasseById
      if (this.classeId) {
        this.getClasseById(this.classeId);
        this.getCountUsersByClasseId(this.classeId);
        this.showVideo(this.classeId);
        this.getUsersByClasseId(this.classeId)
      }
      if(this.userId){
        this.getUserById(this.userId);
        this.getChopsByUserId(this.userId);
        this.getCountChopsByUserId(this.userId);
      }
    });

        
 
    this.getCountAcceptedEvents();
    this.getsall();
    this.loadLastAcceptedEvent();
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
  getUsersByClasseId(classeId: number): void {
    this.gaeageService.getUsersByClasseId(classeId).subscribe(
      users => {
        this.users = users.slice(0,5);
      },
      error => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    );
  }
  showVideo(classeId: number) {
    // Appelez le service pour récupérer la vidéo correspondant à l'événement
    this.gaeageService.playVideo3(classeId).subscribe((blob) => {
      const videoUrl = URL.createObjectURL(blob);
      this.videoUrl = videoUrl;
      this.buttonClicked = true;  // Mettez à jour l'état du bouton
    });
  }
  closeVideo() {
    this.buttonClicked = false;  // Mettez à jour l'état du bouton pour fermer la vidéo
  }
  getCountUsersByClasseId(classeId: number): void {
    this.gaeageService.getCountUsersByClasseId(classeId).subscribe(
      count => {
        this.userCount = count; // Affecter la valeur récupérée à la propriété userCount
        console.log('Nombre d\'utilisateurs associés à la classe:', this.userCount);
      },
      error => {
        console.error('Erreur lors de la récupération du nombre d\'utilisateurs:', error);
      }
    );
  }
  getUserById(userId: number): void {
    this.gaeageService.getUserById(userId).subscribe(
      (data: any) => {
        this.userInfo = data;
        this.userInfo.image = 'data:image/jpeg;base64,' + this.userInfo.image;
      },
      (error: any) => {
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
  updateNumberOfEvents(): void {
    this.numberOfEvents = this.lastAcceptedEvent.length;
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
getClasseById(classeId: number): void {
  this.gaeageService.getClasseById(classeId).subscribe(
    (classe: classes) => {
      this.classes = classe;
      if (classe.image) {
        classe.image = 'data:image/jpeg;base64,' + classe.image;
      }
    },
    (error: any) => {
      console.error('Erreur lors de la récupération de la classe :', error);
    }
  );
}

  



  inscrireUtilisateur(): void {
    if (this.userId !== undefined && this.classeId !== undefined) {
      this.gaeageService.inscrireUtilisateurAClasse(this.userId, this.classeId).subscribe(
        response => {
          console.log(response); // Gérez la réponse comme vous le souhaitez
          // Rediriger vers la page de succès d'inscription si nécessaire
        },
        error => {
          console.error('Une erreur s\'est produite : ', error); // Gérez l'erreur comme vous le souhaitez
        }
      );
    } else {
      console.error('Les IDs d\'utilisateur et de classe ne sont pas définis.');
    }
  }
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
  toggleDropdown2(): void {
    this.showDropdown2 = !this.showDropdown2;
  }
  toggleDropdown4(): void {
    this.showDropdown4 = !this.showDropdown4;
  }
}
