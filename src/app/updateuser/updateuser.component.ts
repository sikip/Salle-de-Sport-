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
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  @ViewChild('emailInput') emailInput: ElementRef | undefined;
 
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
  confibm: number | undefined;
  poid?: number;
  telephone?: number;
  janfi?: number;
  fivri?: number;
  mars?: number;
  avrile?: number;
  mais?: number;
  juin?: number;
  juilliat?: number;
  aute?: number;
  septembre?: number;
  octobre?: number;
  decembre?: number;
  nauvembre?: number;
  username: string = '';
  email: string = '';
  emailInvalid: boolean = false;
  telephoneInvalid: boolean = false;
  usernameInvalid: boolean = false;
  updateSuccess: boolean | null = null;
  image: File | undefined;
  intervalId: any; 
 imageSrc: string | ArrayBuffer | null = null;
 imageName: string | undefined;
 imageSize: number | undefined;
 countchop:number=0;
 chops: chop[] = [];
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

  updateUser(userId: number): void {
    this.gaeageService.updateUser(userId,this.janfi, this.fivri, this.mars, this.avrile, this.mais,
      this.juin, this.juilliat, this.aute, this.septembre,
      this.octobre, this.decembre, this.nauvembre)
      .subscribe(
        response => {
          console.log('Utilisateur mis à jour avec succès:', response);
          // Réinitialiser les champs du formulaire après la mise à jour réussie si nécessaire
          this.resetForm();
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        }
      );
  }
  updateUser2(userId: number): void {
    // Vérification des champs de l'email
    if (!this.isValidUsername(this.username)) {
      console.error('Nom d\'utilisateur invalide');
      this.usernameInvalid = true; // Définir la variable usernameInvalid sur true
      return; // Arrêter le processus si le nom d'utilisateur est invalide
    }
    if (!this.isValidEmail(this.email)) {
      console.error('Adresse e-mail invalide');
      this.emailInvalid = true; 
      return; // Arrêter le processus si l'email est invalide
    }
    if (this.telephone === undefined || !this.isValidTelephone(this.telephone.toString())) {
      console.error('Numéro de téléphone invalide');
      this.telephoneInvalid = true; // Définir la variable telephoneInvalid sur true
      return; // Arrêter le processus si le téléphone est invalide
    }
   
    this.gaeageService.updateUser2(userId, this.username, this.email, this.telephone)
      .subscribe(
        response => {
          console.log('Utilisateur mis à jour avec succès:', response);
          this.updateSuccess = true;
          // Réinitialiser les champs du formulaire après la mise à jour réussie si nécessaire
          this.resetForm();
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
          this.updateSuccess = false;
        }
      );
  }

  updateUser3(userId: number): void {
    // Vérification des champs de l'email
    this.gaeageService.updateUser3(userId, this.confibm, this.poid)
      .subscribe(
        response => {
          console.log('Utilisateur mis à jour avec succès:', response);
          this.updateSuccess = true;
          // Réinitialiser les champs du formulaire après la mise à jour réussie si nécessaire
          this.resetForm();
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
          this.updateSuccess = false;
        }
      );
  }




  onUpdateUserClick(userId: number): void {
    this.updateUser2(userId); // Appeler la méthode pour mettre à jour l'utilisateur
  }
  isValidUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9\-]+$/;
    return username.trim() !== '' && usernameRegex.test(username);
  }
  
  isValidEmail(email: string): boolean {
    // Utiliser une expression régulière pour vérifier le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  isValidTelephone(telephone: string): boolean {
    // Utiliser une expression régulière pour vérifier le format du téléphone
    const telephoneRegex = /^\d{8}$/;
    return telephoneRegex.test(telephone);
  }
 resetForm(): void {
    // Réinitialiser les valeurs des champs du formulaire si nécessaire
    this.confibm = undefined;
    this.poid = undefined;
    this.telephone = undefined;
    this.janfi = undefined;
    this.fivri = undefined;
    this.mars = undefined;
    this.avrile = undefined;
    this.mais = undefined;
    this.juin = undefined;
    this.juilliat = undefined;
    this.aute = undefined;
    this.septembre = undefined;
    this.octobre = undefined;
    this.decembre = undefined;
    this.nauvembre = undefined;
    this.username  = '';
    this.email = '';
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
  isEmailValid(email: string): boolean {
    return !!email && email.includes('@'); 
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
 
 UpdateUserImage(userId: number): void {
   if (this.image) {
     this.gaeageService.UpdateUserImage(userId, this.image).subscribe(
       () => {
         console.log('Image ajoutée avec succès à la salle avec l\'ID :', userId);
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
 
}

