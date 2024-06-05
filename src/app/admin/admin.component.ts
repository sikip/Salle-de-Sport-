import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../authresponse';
import { Chart } from 'chart.js';
import { CartesianScaleOptions } from 'chart.js';
import { classes } from '../classes';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public showModal: boolean = false;
  chart: any;
  salle: any[] = [];
  displayedSalle: any[] = [];
  userId!: number;
  userInfo: any;
  clientCount1: number = 1;
  currentNumber1: number = 0;
  cautchCount2: number = 1;
  currentNumber2: number = 0;
  eventCount2: number = 1;
  currentNumber3: number = 0;
  lineChart: any;
  classes: classes[] | undefined;
  constructor(private GaeageserviceService: GaeageserviceService,
              private route: ActivatedRoute,
              private authService: AuthService) {}

              ngOnInit(): void {
                // Récupération des données pour le graphique
                this.GaeageserviceService.countUsersByMonth().subscribe(data => {
                  const labels = Object.keys(data);
                  const values = Object.values(data);
            
                  const ctx = document.getElementById('barChart') as HTMLCanvasElement;
                  const barChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                      labels: labels,
                      datasets: [{
                        label: 'Number of users per month',
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                      }]
                    },
                 
                  });
                });
                
    this.getsall();
    this.fetchClientCounts();
    this.fetchCarCount2();
    this.fetcheventCount2();
    this.getFirstFiveClasses();
    this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
    });
    const userId = this.authService.getUserId();
    if (userId) {
      this.GaeageserviceService.getUserById(userId).subscribe(
        (data) => {
          this.userInfo = data;
          // Convertir l'image en format base64
          if (this.userInfo && this.userInfo.image) {
            this.userInfo.image = 'data:image/jpeg;base64,' + this.userInfo.image;
          }
        },
        (error) => {
          console.error("Erreur lors de la récupération des informations de l'utilisateur:", error);
        }
      );
    }
  }

  getsall(): void {
    this.GaeageserviceService.getsall().subscribe(
      (data: any[]) => {
        this.salle = data;
        this.displayedSalle = this.salle.slice(0, 1);
        
        // Convertir les images en format base64
        this.salle.forEach(salle => {
          salle.image = 'data:image/jpeg;base64,' + salle.image;
          salle.imageslid1 = 'data:image/jpeg;base64,' + salle.imageslid1;
        });
      },
      (error) => {
        console.error("Erreur lors de la récupération des salles:", error);
      }
    );
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.GaeageserviceService.updateUserImage(this.userId, file).subscribe(
        () => {
          console.log('Image mise à jour avec succès');
          // Mettez ici la logique supplémentaire en cas de succès
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'image : ', error);
          // Mettez ici la logique en cas d'erreur
        }
      );
    }
  }
  private fetchClientCounts(): void {
    this.GaeageserviceService.getNumberClients().subscribe(
      (count: number) => {
        this.clientCount1 = count;
        this.animateNumbers1();
      },
      (error) => {
        console.error('Error fetching car count:', error);
      }
    );
  }
  private animateNumbers1(): void {
    const interval1 = setInterval(() => {
      if (this.currentNumber1 < this.clientCount1) {
        this.currentNumber1 += 1;
      } else {
        clearInterval(interval1);
      }
    }, 20);
  }
  private fetchCarCount2(): void {
    this.GaeageserviceService.getNumbecautche().subscribe(
      (count: number) => {
        this.cautchCount2 = count;
        this.animateNumbers2();
      },
      (error) => {
        console.error('Error fetching car count:', error);
      }
    );
  }
  private animateNumbers2(): void {
    const interval2 = setInterval(() => {
      if (this.currentNumber2 < this.cautchCount2) {
        this.currentNumber2 += 1;
      } else {
        clearInterval(interval2);
      }
    }, 20);
  }
  private fetcheventCount2(): void {
    this.GaeageserviceService.getNumberEvent().subscribe(
      (count: number) => {
        this.eventCount2 = count;
        this.animateNumbers3();
      },
      (error) => {
        console.error('Error fetching event count:', error);
      }
    );
  }

  private animateNumbers3(): void {
    const interval3 = setInterval(() => {
      if (this.currentNumber3 < this.eventCount2) {
        this.currentNumber3 += 1;
      } else {
        clearInterval(interval3);
      }
    }, 20);
  }
  getFirstFiveClasses(): void {
    this.GaeageserviceService.getAllClasses()
      .subscribe(classes => this.classes = classes.slice(0, 5));
  }
  toggleModal(): void {
    this.showModal = !this.showModal;
  }
  
}

