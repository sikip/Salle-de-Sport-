import { Component, OnInit,OnDestroy } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { ActivatedRoute } from '@angular/router';
import { classes } from '../classes'; // Renommé la classe classes en Classes
import { User } from '../user';
import { eventtes } from '../eventtes';
import { message } from '../message';
import { forkJoin } from 'rxjs';
import { AuthService } from '../authresponse';
@Component({
  selector: 'app-chatus',
  templateUrl: './chatus.component.html',
  styleUrls: ['./chatus.component.css']
})
export class ChatusComponent implements OnInit {
  userId: number | undefined;
  id: number | undefined;
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
  userInfo2: any;
  showDropdown: boolean = false;
  showDropdown2: boolean = false;
  showDropdown4: boolean = false;
  userCount: number | undefined;
  countAcceptedEvents: number = 1 ;
  showDropdown3: boolean = false;
  messageContent: string | undefined;
  messages: message[] = [];
  messagesss: message[] = [];
  refreshInterval: any;
  query: string = '';
  searchResults: any[] = [];
  showResults: boolean = false;
  query2: string = '';
  searchResults2: any[] = [];
  usersAndCoaches: User[] = [];
  allMessages: message[]  = [];
  intervalId: any;
  constructor(private route: ActivatedRoute, private gaeageService: GaeageserviceService,private authService: AuthService) { }

  ngOnInit(): void {
    
    // Récupérer les IDs d'utilisateur et de classe à partir de l'URL
    this.route.params.subscribe(params => {
      this.userId = parseInt(params['userId']);
      this.id = parseInt(params['id']);
      this.recipientId=parseInt(params['recipientId']);
      this.recipientId = +params['recipientId']; 
      this.getMessages(this.userId, this.id);
      this.getmessage2(this.id,this.userId);
      
      // Vérifier si userId et classeId sont définis avant d'appeler getClasseById
      if (this.id) {
        this.getUserById2(this.id);
      }
      if(this.userId){
        this.getUserById(this.userId);

        
      }


      // Rafraîchissement automatique des messages toutes les 30 secondes
  
    });

        
    this.getAllUsersAndCoaches();
    this.getCountAcceptedEvents();
    this.getsall();
    this.loadLastAcceptedEvent();
  }

  

  getmessage2(recipientId: number, senderId: number): void {
    this.gaeageService.getMessagesBySenderIdAndRecipientId2(recipientId, senderId)
      .subscribe(messagesss => {
        this.messagesss = messagesss;
        this.combineMessages();
      });
  }

  getMessages(senderId: number, recipientId: number): void {
    this.gaeageService.getMessagesBySenderIdAndRecipientId(senderId, recipientId)
      .subscribe(messages => {
        this.messages = messages;
        this.combineMessages();
      });
  }

  combineMessages(): void {
    // Fusionnez les deux listes de messages en une seule
    this.allMessages = [...this.messages, ...this.messagesss];
    // Vous pouvez également trier la liste des messages ici si nécessaire
  }
  formatTime(timestamp: any): string {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0'); // Ajoute un zéro en tête si nécessaire
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ajoute un zéro en tête si nécessaire
    return `${hours}:${minutes}`;
  }
  
  getMessagesMerged(senderId: number, recipientId: number): void {
    // Appel des deux méthodes pour obtenir les messages
  
    // Fusionner les résultats des deux appels en utilisant forkJoin
    forkJoin([
      this.gaeageService.getMessagesBySenderIdAndRecipientId(senderId, recipientId),
      this.gaeageService.getMessagesBySenderIdAndRecipientId2(recipientId, senderId)
    ]).subscribe(([messages1, messages2]) => {
      this.messages = [...messages1, ...messages2];
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
  getUserById2(id: number): void {
    this.gaeageService.getUserById(id).subscribe(
      (data: any) => {
        this.userInfo2 = data;
        if (!this.userInfo2.image) {
          // Si userInfo.image est vide, attribuez-lui le chemin de l'image par défaut
          this.userInfo2.image = '../../assets/images/dfb8770ebc590a2eaeb851c87597dfc7.png';
        } else {
          // Sinon, concaténez le préfixe pour une image encodée en base64
          this.userInfo2.image = 'data:image/jpeg;base64,' + this.userInfo2.image;
        }
      },
      (error) => {
        console.error("Erreur lors de la récupération des informations de l'utilisateur:", error);
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
         // Mettre à jour le nombre d'événements
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



  getAllUsersAndCoaches(): void {
    this.gaeageService.getAllUsersAndCoaches().subscribe(
      usersAndCoaches => {
        this.usersAndCoaches = usersAndCoaches;
        // Assurez-vous que userInfo est initialisé correctement
        for (let user of this.usersAndCoaches) {
          // Vérifie si user.image est vide
          if (!user.image) {
            // Si user.image est vide, attribuez-lui le chemin de l'image par défaut
            user.image = '../../assets/images/dfb8770ebc590a2eaeb851c87597dfc7.png';
          } else {
            // Sinon, concaténez le préfixe pour une image encodée en base64
            user.image = 'data:image/jpeg;base64,' + user.image;
          }
        }
        // Vérifier l'état de connexion de chaque utilisateur
        this.usersAndCoaches.forEach(user => {
          // Définir l'état de connexion de l'utilisateur en utilisant la méthode du service AuthService
          user.isConnected = this.authService.isLoggedIn();
        });
      },
      error => {
        console.error('Erreur lors de la récupération des utilisateurs et des entraîneurs:', error);
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
  toggleDropdown4(): void {
    this.showDropdown4 = !this.showDropdown4;
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
  
  
  searchuser() {
    if (this.query2.trim() !== '') {
      this.gaeageService.searchuser(this.query2).subscribe(
        results2 => {
          this.searchResults2 = results2.map(result => {
            // Vérifie si result.image est vide
            if (!result.image) {
              // Si result.image est vide, attribuez-lui le chemin de l'image par défaut
              result.image = '../../assets/images/dfb8770ebc590a2eaeb851c87597dfc7.png';
            } else {
              // Sinon, concaténez le préfixe pour une image encodée en base64
              result.image = 'data:image/jpeg;base64,' + result.image;
            }
            return result;
          });
  
          // Définir l'état de connexion pour chaque utilisateur
          this.searchResults2.forEach(user => {
            user.isConnected = this.authService.isLoggedIn();
          });
        },
        error => {
          console.error('Error fetching search results:', error);
        }
      );
    } else {
      this.searchResults2 = []; // Vide les résultats si la requête est vide
    }
  }
}  