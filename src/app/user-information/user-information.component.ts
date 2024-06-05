import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authresponse';
import { GaeageserviceService } from '../gaeageservice.service';
import { ActivatedRoute } from '@angular/router'; // Importez le ActivatedRoute
import { eventtes } from '../eventtes';
import { publication } from '../publication';
@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit{
  salle: any[] = [];
  publication :publication = {
    id: 0 ,
    commentaire:'',
    image: '',
    addedDate: new Date()
  };
  publications:  any[] = [];
  displayedSalle: any[] = [];
  userInfo: any;
  lastAcceptedEvent: any[] = [];
  showDropdown: boolean = false;
  showDropdown2: boolean = false;
  numberOfEvents: number = 0; // Variable pour stocker le nombre d'événements
  imageFile: any;
  cautchId!: number;
  http: any;
  countAcceptedEvents: number= 1 ;
  showDropdown3: boolean = false;
  constructor(    private route: ActivatedRoute , private  gaeageService: GaeageserviceService) { }
  ngOnInit(): void {
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
    this.loadPublicationsWithUserImages();
  }
  loadPublicationsWithUserImages(): void {
    this.gaeageService.getAllPublicationsWithUserImages().subscribe(
      (publications: publication[]) => {
        // Mélanger l'ordre des publications de manière aléatoire
        publications = this.shuffleArray(publications);
        
        // Formatage des dates
        this.publications = this.formatDates2(publications);
  
        // Traitement des images
        this.publications.forEach(publication => {
          publication.image = 'data:image/jpeg;base64,' + publication.image;
          publication.user.image = 'data:image/jpeg;base64,' + publication.user.image;
        });
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des publications avec les images utilisateur : ', error);
      }
    );
  }
  
  // Fonction pour mélanger un tableau aléatoirement
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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

  

  
  onSubmit(): void {
    const formData = new FormData();
    formData.append('commentaire', this.publication.commentaire.toString());
    formData.append('imageFile', this.publication.image);

    this.gaeageService.addpub(this.cautchId, formData).subscribe(
      (response) => {
        console.log('Publication ajoutée avec succès:', response);
        // Réinitialiser le formulaire ou effectuer d'autres actions si nécessaire
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la publication:', error);
      }
    );
  }

  onFileSelected(event: any, field: keyof publication) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      (this.publication[field] as any) = file;
    }
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
formatDates2(publications: publication[]): publication[] {
  return publications.map(publication => {
    const eventDate = new Date(publication.addedDate);
    const currentDate = new Date();
    const differenceInSeconds = Math.floor((currentDate.getTime() - eventDate.getTime()) / 1000);

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

    publication.timeAgo = timeAgo ;
    return publication;
  });
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
