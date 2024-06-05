import {  Component, OnInit  } from '@angular/core';
import { AuthService } from '../authresponse';
import { GaeageserviceService } from '../gaeageservice.service';
import { eventtes } from '../eventtes';
import { chop } from '../chop'; 
import { classes } from '../classes';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Chart } from 'chart.js';
import { User } from '../user';

@Component({
  selector: 'app-chop2',
  templateUrl: './chop2.component.html',
  styleUrls: ['./chop2.component.css']
})
export class Chop2Component implements OnInit  {
  salle: any[] = [];
  users: User[] = [];
  chops: chop[] = [];
  chops2: chop[] = [];
  chop2: chop[] = [];
  displayedSalle: any[] = [];
  userInfo: any;
  lastAcceptedEvent: any[] = [];
  showDropdown: boolean = false;
  showDropdown2: boolean = false;
  showDropdown3: boolean = false;
  numberOfEvents: number = 0; // Variable pour stocker le nombre d'événements
  imageFile: any;
  cautchId!: number;
  http: any;
  classes: classes[] = [];
  userAttributes: any;
  userId: string | undefined;
  numberOfClasses: number = 1;
  countAcceptedEvents: number = 1;
  eventsCount: number =1;
  searchResults2: any[] = [];
  query2: string = '';
  showChopsResult: boolean = false;
  minPrice: number =0;
  maxPrice: number =0;
  priceRange: number =100;
  showChopsResults2: boolean = false;
  countchop:number=0;
  showDropdown4: boolean = false;
  intervalId: any;
  constructor(    private route: ActivatedRoute , private  gaeageService: GaeageserviceService,
    private router: Router  ) { }
 
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
        this.intervalId = setInterval(() => {
          this.getChops();
        }, 1000);
      });
    
    this.getsall();
    this.loadLastAcceptedEvent();
    this.getUsersWithRoleCoach();
    this.getCountAcceptedEvents();
    this.getChops();
  
      this.chop2 = [];
    this.route.paramMap.subscribe(params => {
      if (params.has('userId')) {
        this.cautchId = +params.get('userId')!;
      }
    });
 
    this.route.paramMap.subscribe(params => {
      const userId = Number(params.get('userId'));
      if (userId) {
        this.getClassesByUserId(userId);
        this.countClassesByUserId(userId);
        this.getUserAttributes(userId);
        this.getNumberOfEventsByUserId(userId);
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

  getChopsByUserId(userId: number): void {
    this.gaeageService.getChopsByUserId(userId)
      .subscribe(chops2 => {
        this.chops2 = chops2.map(chop => {
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

  fetchChopsByType(type: string): void {
    switch (type) {
      case 'wheyprotein':
        this.gaeageService.getChopsByTypewheyprotein()
        .subscribe(chops => {
          this.chops = chops.map(chop => {
            return {
              ...chop,
              imageslid1: 'data:image/jpeg;base64,' + chop.imageslid1
            };
          });
        });
        break;
      case 'caseine':
        this.gaeageService.getChopsByTypecaséine()
        .subscribe(chops => {
          this.chops = chops.map(chop => {
            return {
              ...chop,
              imageslid1: 'data:image/jpeg;base64,' + chop.imageslid1
            };
          });
        });
          break;
          case 'poid':
            this.gaeageService.getChopsByTypePOId()
            .subscribe(chops => {
              this.chops = chops.map(chop => {
                return {
                  ...chop,
                  imageslid1: 'data:image/jpeg;base64,' + chop.imageslid1
                };
              });
            });
        break;
        case 'riz':
          this.gaeageService.getChopsByTypeRiz()
          .subscribe(chops => {
            this.chops = chops.map(chop => {
              return {
                ...chop,
                imageslid1: 'data:image/jpeg;base64,' + chop.imageslid1
              };
            });
          });
      break;
      default:
        break;
    }
  }




  searchChops(): void {
    const minPrice = this.priceRange;
    const maxPrice =   this.priceRange; // Calcul du prix maximum en soustrayant le prix minimum de 1000
  
    this.gaeageService.searchChopsByPriceRange(minPrice, maxPrice)
      .subscribe(chops => {
        this.chops = chops.map(chop => {
          return {
            ...chop,
            imageslid1: 'data:image/jpeg;base64,' + chop.imageslid1
          };
        });
      });
  }
  
  showChopsByTypeTchort(): void {
    this.gaeageService.getChopsByTypeTchort()
      .subscribe(chop2 => {
        this.chop2 = chop2.map(chop => {
          return {
            ...chop,
            imageslid1: 'data:image/jpeg;base64,' + chop.imageslid1
          };
        });
        this.showChopsResult = true; // Mettre showChopsResult à true lorsque les résultats sont récupérés
      });
  }
  getChopsByTypeShort(): void {
    this.gaeageService.getChopsByTypeShort()
      .subscribe(chop2 => {
        this.chop2 = chop2.map(chop => {
          return {
            ...chop,
            imageslid1: 'data:image/jpeg;base64,' + chop.imageslid1
          };
        });
        this.showChopsResult = true; // Mettre showChopsResult à true lorsque les résultats sont récupérés
      });
  }
  getChopsByTypePantalon(): void {
    this.gaeageService.getChopsByTypePantalon()
      .subscribe(chop2 => {
        this.chop2 = chop2.map(chop => {
          return {
            ...chop,
            imageslid1: 'data:image/jpeg;base64,' + chop.imageslid1
          };
        });
        this.showChopsResult = true; // Mettre showChopsResult à true lorsque les résultats sont récupérés
      });
  }
  getChopsByTypeDebardeur(): void {
    this.gaeageService.getChopsByTypeDébardeur()
      .subscribe(chop2 => {
        this.chop2 = chop2.map(chop => {
          return {
            ...chop,
            imageslid1: 'data:image/jpeg;base64,' + chop.imageslid1
          };
        });
        this.showChopsResult = true; // Mettre showChopsResult à true lorsque les résultats sont récupérés
      });
  }
  getChopsByTypeSurvetement(): void {
    this.gaeageService.getChopsByTypeSurvêtement()
      .subscribe(chop2 => {
        this.chop2 = chop2.map(chop => {
          return {
            ...chop,
            imageslid1: 'data:image/jpeg;base64,' + chop.imageslid1
          };
        });
        this.showChopsResult = true; // Mettre showChopsResult à true lorsque les résultats sont récupérés
      });
  }
  getChopsByTypeLegging(): void {
    this.gaeageService.getChopsByTypeLegging()
      .subscribe(chop2 => {
        this.chop2 = chop2.map(chop => {
          return {
            ...chop,
            imageslid1: 'data:image/jpeg;base64,' + chop.imageslid1
          };
        });
        this.showChopsResult = true; // Mettre showChopsResult à true lorsque les résultats sont récupérés
      });
  }
  getChopsByTypeChaussures(): void {
    this.gaeageService.getChopsByTypeChaussures()
      .subscribe(chop2 => {
        this.chop2 = chop2.map(chop => {
          return {
            ...chop,
            imageslid1: 'data:image/jpeg;base64,' + chop.imageslid1
          };
        });
        this.showChopsResult = true; // Mettre showChopsResult à true lorsque les résultats sont récupérés
      });
  }
  getChops(): void {
    this.gaeageService.getAllChops()
      .subscribe(chops => {
        this.chops = chops
          .filter(chop => chop.kontiter > 0) // Filtrer les chopdis avec kontiter > 0
          .map(chop => {
            return {
              ...chop,
              imageslid1: 'data:image/jpeg;base64,' + chop.imageslid1
            };
          });
      });
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

  getUserAttributes(userId: number): void {
    this.gaeageService.getUserAttributes(userId).subscribe(
      (data: any) => {
        this.userAttributes = JSON.parse(data);
        this.drawChart();
      },
      error => {
        console.error('Error fetching user attributes:', error);
      }
    );
  }

  drawChart(): void {
    if (!this.userAttributes) {
      console.error('User attributes data is empty.');
      return;
    }

    const labels = Object.keys(this.userAttributes);
    const values = Object.values(this.userAttributes);

    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    if (!ctx) {
      console.error('Canvas element not found.');
      return;
    }

    const barChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'IBM par mois',
          data: values,
          backgroundColor: 'rgba(85, 110, 230)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      }
    });
  }
  
 





  countClassesByUserId(userId:number ) {
    this.gaeageService.countClassesByUserId(userId)
    .subscribe(count => {
      this.numberOfClasses = count;
    });
  }
  getClassesByUserId(userId: number): void {
    this.gaeageService.getClassesByUserId(userId)
      .subscribe(classes => {
        this.classes = classes.slice(0,3);
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
  searchuser() {
    if (this.query2.trim() !== '') {
      this.gaeageService.searchchopuser(this.query2).subscribe(
        results2 => {
          this.searchResults2 = results2.map(result => {
            // Vérifie si result.image est vide
            if (result.imageslid1 && result.imageslid1.trim() !== '') {
              // Concaténez le préfixe pour une image encodée en base64
              result.imageslid1 = 'data:image/jpeg;base64,' + result.imageslid1;
            }
            return result;
          });
  
          // Définir l'état de connexion pour chaque utilisateur
          this.searchResults2.forEach(user => {
            // Faites ce que vous devez faire avec chaque utilisateur (user)
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




