import { Component, OnInit,OnDestroy } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { eventtes } from '../eventtes';
import { choprevieux } from '../choprevieux';
import { chop } from '../chop';
@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
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
  chop: chop | undefined;
  numberOfEvents: number = 0;
  countchop:number=0;
  userInfo: any;
  showDropdown: boolean = false;
  showDropdown2: boolean = false;
  userCount: number | undefined;
  revieucount: number = 0;
  countAcceptedEvents: number = 1 ;
  showDropdown3: boolean = false;
  showDropdown4: boolean = false;
  fullSizeImageIndex: number | null = null;
  fullSizeImage: any;
  clickedImageIndex: number = -1; 
  intervalId: any; 
  chops: chop[] = [];
  chop2: chop[] = [];
  choprevieux :choprevieux[] = [];
  commentaire: string='';
  starRating: number=0;
  stars: number[] = [1, 2, 3, 4, 5]; 
  calculatedPrice:number = 0;
  totalPagesArray: number[] = [];
  totalPages: number = 0;
  pageSize: number = 5; // Nombre d'éléments par page
  currentPage: number = 0; // Page actuelle
  qrCodeUrl: string | ArrayBuffer | null = null;
  constructor(private route: ActivatedRoute, private gaeageService: GaeageserviceService) { }

  ngOnInit(): void {
    
    // Récupérer les IDs d'utilisateur et de classe à partir de l'URL
    this.route.params.subscribe(params => {
      this.userId = parseInt(params['userId']);
      this.id = parseInt(params['id']);
    


      if (this.id) {


      }
      if(this.userId){
        this.getUserById(this.userId);
        this.getCountChopsByUserId(this.userId);
        this.getChopsByUserId(this.userId);
        this.getQrCode(this.userId);

        this.intervalId = setInterval(() => {
          this.getCountChopsByUserId(this.userId!);
          this.getChopsByUserId(this.userId!);
          this.loadLastAcceptedEvent();
          this.getCountAcceptedEvents();
        }, 10000);
      

      }
      this.getlasttreeChops();
    this.getCountAcceptedEvents();
    this.getsall();
    this.loadLastAcceptedEvent();
  });
  }
  getQrCode(userId: number) {
     this.gaeageService.getQrCode(userId).subscribe(
    (response: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(response); // Convertit les données binaires du code QR en URL de données
      reader.onloadend = () => {
        this.qrCodeUrl = reader.result; // Stocke l'URL du code QR dans une variable pour l'afficher dans le template
      };
    },
    error => {
      console.error('Erreur lors de la récupération du code QR :', error);
    }
  );
}
  

  getlasttreeChops(): void {
    this.gaeageService.getAllChops()
      .subscribe(chop2 => {
        this.chop2 = chop2.map(chop => {
     
          return {
            ...chop,
            imageslid1: 'data:image/jpeg;base64,' + chop.imageslid1
          };
        }).slice(-3); // Utilisation de slice(-3) pour obtenir les 3 derniers éléments
       
      });
  }
  
  





  ngOnDestroy(): void {
    // Nettoyer l'intervalle lors de la destruction du composant
    clearInterval(this.intervalId);
  }

  getChopsByUserId(userId: number): void {
    this.gaeageService.getChopsByUserId(userId)
      .subscribe(chops => {
        if (chops && chops.length > 0) {
          this.chops = chops.map(chop => {
            return {
              ...chop,
              imageslid1: 'data:image/jpeg;base64,' + chop.imageslid1
            };
          });
          this.calculateTotalPages();
          this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
        } else {
          console.error('Aucune Chop n\'a été trouvée pour l\'utilisateur avec ID:', userId);
        }
      }, error => {
        console.error('Une erreur s\'est produite lors de la récupération des Chops:', error);
      });
  }



  calculateTotalPages() {
    this.totalPages = Math.ceil(this.chops.length / this.pageSize);
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
  isActivePage(pageIndex: number): boolean {
    return pageIndex === this.currentPage;
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
  addToCartpayment(): void {
    if (this.userId && this.id) {
      this.gaeageService.addToCartpayment(this.userId, this.id)
        .subscribe(
          response => {
            console.log('Chop added to cart successfully');
            // Handle success (if needed)
          },
          error => {
            console.error('Error adding chop to cart:', error);
            // Handle error (if needed)
          }
        );
    }
  }

  addToCart(): void {
    if (this.userId && this.id) {
      this.gaeageService.addToCart(this.userId, this.id)
        .subscribe(
          response => {
            console.log('Chop added to cart successfully');
            // Handle success (if needed)
          },
          error => {
            console.error('Error adding chop to cart:', error);
            // Handle error (if needed)
          }
        );
    }
  }
  showFullSizeImage(index: number): void {
    this.fullSizeImageIndex = index;
  }
  getFullSizeImage(): string | null {
    return this.fullSizeImage ||  (this.chop ? this.chop.imageslid1 : '');
  }
  setFullSizeImage(image: string, index: number): void {
    this.fullSizeImage = image;
    this.clickedImageIndex = index;
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
