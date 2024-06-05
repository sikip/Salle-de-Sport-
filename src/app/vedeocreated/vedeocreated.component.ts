import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { eventtes } from '../eventtes';
import { chop } from '../chop';
import { Vedeo } from '../Vedeo';
@Component({
  selector: 'app-vedeocreated',
  templateUrl: './vedeocreated.component.html',
  styleUrls: ['./vedeocreated.component.css']
})
export class VedeocreatedComponent implements OnInit {
  userId: number | undefined;
  eventId: number | undefined;
  videoUrl: string | undefined;
  buttonClicked: boolean = false;
  eventtes: eventtes | undefined;
  salle: any[] = [];
  users: User[] = [];
  chops: chop[] = [];
  displayedSalle: any[] = [];
  lastAcceptedEvent: any[] = [];
  numberOfEvents: number = 0;
  userInfo: any;
  showDropdown: boolean = false;
  showDropdown2: boolean = false;
  userCount: number | undefined;
  countAcceptedEvents: number = 1 ;
  likesCount: number=0;
  showDropdown3: boolean = false;
  showDropdown4: boolean = false;
  image: File | undefined;
  image2: File | undefined;
  imageFile3!: File | undefined;
  imageFile4!: File | undefined;
  countchop:number=0;
  imageSrc: string | ArrayBuffer | null = null;
  imageSrc2: string | ArrayBuffer | null = null;
  imageName: string | undefined;
  imageSize: number | undefined;
  imageName2: string | undefined;
  imageSize2: number | undefined;
  imageName3: string | undefined;
  imageSize3: number | undefined;
  Vedeo: Vedeo = {
    id: 0,
    title: '',
    descrption: '',
    tags: '',
    videoName: ''
  };
  videos: Vedeo[] = [];
  latestVedeo: Vedeo | undefined;
  constructor(private route: ActivatedRoute, private gaeageService: GaeageserviceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = parseInt(params['userId']);
      this.eventId = parseInt(params['id']);
      
      
      // Vérifier si userId et eventId sont définis avant d'appeler les méthodes appropriées

      if(this.userId){
        this.getUserById(this.userId);
        this.getCountChopsByUserId(this.userId);
        this.getChopsByUserId(this.userId);
      }
            if (this.eventId) {
              this.getVoitureDetails(this.eventId);
              this.createPost(this.eventId);

      }
    });

    this.getsall(); 
    this.loadLastAcceptedEvent();
    this.getLatestVedeo();
  }
  getLatestVedeo(): void {
    this.gaeageService.getAllVideo()
      .subscribe((videos) => {
        // Assuming the list is sorted by the server in descending order of creation date or ID
        if (videos.length > 0) {
          this.latestVedeo = videos[videos.length - 1]; // Accéder au dernier élément de la liste
          console.log('Latest Vedeo retrieved successfully:', this.latestVedeo);
        } else {
          console.error('No videos found');
          // Handle no videos found
        }
      }, (error) => {
        console.error('Failed to retrieve videos:', error);
        // Handle error, e.g., show an error message
      });
  }
  
  createPost(eventId: number): void {
    this.gaeageService.createPost(eventId, this.Vedeo)
      .subscribe(
        (response) => {
          console.log('Vedeo created successfully:', response);
        },
        (error) => {
          console.error('Failed to create Vedeo:', error);
          // Ajoutez ici la logique en cas d'erreur
        }
      );
  }
  getVoitureDetails(eventId: number): void {
    this.gaeageService.getVoitureDetails(eventId).subscribe(
      (eventtes: eventtes) => {
        this.eventtes = eventtes;
        
        this.eventtes.image = 'data:image/jpeg;base64,' + this.eventtes.image;
        this.eventtes.image2 = 'data:image/jpeg;base64,' + this.eventtes.image2;
        this.eventtes.image3 = 'data:image/jpeg;base64,' + this.eventtes.image3;
        this.eventtes.image4 = 'data:image/jpeg;base64,' + this.eventtes.image4;
   
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des détails de la voiture :', error);
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



  getUserById(userId: number): void {
    this.gaeageService.getUserById(userId).subscribe(
      (data: any) => {
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
  UpdateUserImage(eventId: number): void {
    if (this.image) {
      this.gaeageService.UpdateEventImage(eventId, this.image).subscribe(
        () => {
          console.log('Image ajoutée avec succès à la salle avec l\'ID :', eventId);
          // Ajoutez ici la logique supplémentaire en cas de succès
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'image à la salle :', error);
          // Ajoutez ici la logique en cas d'erreur
        }
      );
    } else {
      console.error('Veuillez sélectionner une image.');
    }
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.image = file;
    this.imageName = file.name;
    this.imageSize = file.size; // Taille en bytes
    this.displaySelectedImage();
  }
  cancelImageSelection() {
   this.image = undefined;
   this.imageSrc = null;
   this.imageName = undefined;
   this.imageSize = undefined;
 }
 
  displaySelectedImage() {
   if (this.image) {
     const reader = new FileReader();
     reader.onload = (event) => {
       if (event.target?.result) {
         this.imageSrc = event.target.result;
       }
     };
     reader.readAsDataURL(this.image);
   }
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
  updateImages(eventId: number) {
    if (this.imageFile3 && this.imageFile4) {
   
      this.gaeageService.updateImagesById(eventId, this.imageFile3, this.imageFile4)
        .subscribe(
          () => {
            console.log('Images updated successfully');
            // Ajoutez ici la logique supplémentaire en cas de succès
          },
          error => {
            console.error('Failed to update images:', error);
            // Ajoutez ici la logique en cas d'erreur
          }
        );
    } else {
      console.error('Veuillez sélectionner deux images.');
    }
  }
  onFileSelected3(event: any) {
    this.imageFile3 = event.target.files[0];
  }

  onFileSelected4(event: any) {
    this.imageFile4 = event.target.files[0];
  }
  UpdateUserImageTitle(eventId: number): void {
    if (this.image2) {
      this.gaeageService.updateImageTitleById(eventId, this.image2).subscribe(
        () => {
          console.log('Image ajoutée avec succès à la salle avec l\'ID :', eventId);
          // Ajoutez ici la logique supplémentaire en cas de succès
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'image à la salle :', error);
          // Ajoutez ici la logique en cas d'erreur
        }
      );
    } else {
      console.error('Veuillez sélectionner une image.');
    }
  }
  onFileSelected2(event: any) {
    const file: File = event.target.files[0];
    this.image2 = file;

  }
}

