import { Component, OnInit,OnDestroy } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { ActivatedRoute } from '@angular/router';
import { classes } from '../classes'; // Renommé la classe classes en Classes
import { User } from '../user';
import { eventtes } from '../eventtes';
import { message } from '../message';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-inscor',
  templateUrl: './inscor.component.html',
  styleUrls: ['./inscor.component.css']
})
export class InscorComponent implements OnInit {
  userId: number | undefined;
  classeId: number | undefined;
  recipientId: number | undefined;
  videoUrl: string | undefined;
  buttonClicked: boolean = false;
  response: any; 
  salle: any[] = [];
  users: User[]= [];
  displayedSalle: any[] = [];
  lastAcceptedEvent: any[] = [];
  classes: classes | undefined;// Renommé la variable classes en Classes
  numberOfEvents: number = 0;
  userInfo: any;
  showDropdown: boolean = false;
  showDropdown2: boolean = false;
  userCount: number | undefined;
  countAcceptedEvents: number = 1 ;
  showDropdown3: boolean = false;
  messageContent: string | undefined;
  messages: message[] = [];
  messagesss: message[] = [];
  refreshInterval: any;
  constructor(private route: ActivatedRoute, private gaeageService: GaeageserviceService) { }

  ngOnInit(): void {
    
    // Récupérer les IDs d'utilisateur et de classe à partir de l'URL
    this.route.params.subscribe(params => {
      this.userId = parseInt(params['userId']);
      this.classeId = parseInt(params['classeId']);
      this.recipientId=parseInt(params['recipientId']);
      this.recipientId = +params['recipientId']; 
      this.getMessages(this.userId, this.classeId);
      this.getmessage2(this.classeId,this.userId);
      
      // Vérifier si userId et classeId sont définis avant d'appeler getClasseById
      if (this.classeId) {
        this.getClasseById(this.classeId);
        this.getCountUsersByClasseId(this.classeId);
        this.showVideo(this.classeId);
        this.getUsersByClasseId(this.classeId)
      }
      if(this.userId){
        this.getUserById(this.userId);
      }
      this.refreshMessages();

      // Rafraîchissement automatique des messages toutes les 30 secondes
      this.refreshInterval = setInterval(() => {
        this.refreshMessages();
      }, 30000); // 30 secondes
    });

        
 
    this.getCountAcceptedEvents();
    this.getsall();
    this.loadLastAcceptedEvent();
  }
  refreshMessages(): void {
    if (this.userId !== undefined && this.classeId !== undefined) {
      this.getMessages(this.userId, this.classeId);
      this.getmessage2(this.classeId, this.userId);
      this.getMessagesMerged(this.classeId, this.userId);
    }
  }
  
  ngOnDestroy(): void {
    // Nettoyer l'intervalle de rafraîchissement lors de la destruction du composant
    clearInterval(this.refreshInterval);
  }
  getmessage2(recipientId: number, senderId: number) {
    this.gaeageService.getMessagesBySenderIdAndRecipientId2(recipientId,senderId)
    .subscribe(messagesss => this.messagesss = messagesss);
  }
  getMessages(senderId: number, recipientId: number): void {
    this.gaeageService.getMessagesBySenderIdAndRecipientId(senderId, recipientId)
      .subscribe(messages => this.messages = messages);
  }
  getMessagesMerged(senderId: number, recipientId: number): void {
    // Appel des deux méthodes pour obtenir les messages
    const getMessagesObs = this.gaeageService.getMessagesBySenderIdAndRecipientId(senderId, recipientId);
    const getMessages2Obs = this.gaeageService.getMessagesBySenderIdAndRecipientId2(recipientId, senderId);

    // Fusionner les résultats des deux appels en utilisant forkJoin
    forkJoin([getMessagesObs, getMessages2Obs]).subscribe(results => {
      // Concaténer les résultats des deux appels en une seule liste
      const allMessages = results[0].concat(results[1]);
      
      // Trier les messages par date d'ajout (addedDate)
      this.messages = allMessages.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
    });
  }
  sendMessage(userId : number , recipientId:number): void {
    if (this.messageContent) {
      this.gaeageService.sendMessage(userId, recipientId, this.messageContent)
        .subscribe(response => {
          console.log(response); // Réponse de l'API
          // Traitez la réponse selon les besoins
          alert('Message sent successfully.');
          this.messageContent = ''; // Effacer le contenu du message après l'envoi
        }, error => {
          console.error('Error sending message:', error);
          // Gérez l'erreur selon les besoins
     
        });
    } else {
      alert('Please enter a message before sending.');
    }
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
        this.response = response;
        console.log(response); // Affichez également la réponse dans la console pour le débogage
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
  toggleDropdown3(): void {
    this.showDropdown3 = true;
  }
  toggleDropdown3ferm(): void {
    !this.showDropdown3 ;
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
