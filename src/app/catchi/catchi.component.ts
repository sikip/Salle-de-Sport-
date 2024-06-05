import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authresponse';
import { GaeageserviceService } from '../gaeageservice.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { Chart } from 'chart.js';
import { eventtes } from '../eventtes';
import { clientaccept } from '../clientaccept';

@Component({
  selector: 'app-catchi',
  templateUrl: './catchi.component.html',
  styleUrls: ['./catchi.component.css']
})
export class CatchiComponent implements OnInit {
  User: User | undefined;
  totalEventsByUser: number=1 ; 
  revenue: number=1 ; 
  remoi: number=1 ; 
  remoi2: number=1 ; 
  remoi3: number=1 ; 
  remoiper :number=1;
  client:number=1;
  revenueChange: string = '';
  percentageChange: number = 0;
  userId: number = 0;
  events: any[] = [];
  clientAccepts: clientaccept[] = [];

  eventsWithLikes: any[] = [];
  constructor(private GaeageserviceService: GaeageserviceService,
              private route: ActivatedRoute,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const carId = Number(params.get('id')); // Obtenez l'ID de voiture à partir de la route
      const userId = Number(params.get('id')); // Obtenez l'ID de l'utilisateur à partir de la route
      this.getVoitureDetails(carId);
      this.getCountTotalEventsByUser(userId); // Utilisez l'ID de l'utilisateur pour obtenir le nombre total d'événements
      this.calculateUserEarnings(userId);
      this.calculateUserEarningsmois(userId);
      this. calculateAcceptedRevenueForUserInCurrentMonth(userId);
      this.getRevenueChange(userId);
      this.eventsper(userId);
      this.countEventByMonth(userId);
      this.calculcaount(userId);
      this.countAcceptedClientsByUserId(userId);
      this.loadEvents(userId);
      this.loadClientAccepts(userId); 
      this.getEventsWithLikesByUserId(userId);
    });

  }
  getEventsWithLikesByUserId(userId: number) {
    this.GaeageserviceService.getEventsWithLikesByUserId(userId)
        .subscribe(
            data => {
                this.eventsWithLikes = data.slice(0, 3);;
                console.log(data); // Afficher les données récupérées dans la console pour le débogage
            },
            error => {
                console.log('Une erreur s\'est produite : ', error); // Gérez l'erreur comme vous le souhaitez
            }
        );
}
  
  loadClientAccepts(userId: number): void {
    this.GaeageserviceService.getClientAcceptsByUserId(userId)
      .subscribe(clientAccepts => {
        this.clientAccepts = clientAccepts;
      });
  }

  loadEvents(userId: number): void {
    this.GaeageserviceService.getAcceptedEventsByUserId(userId)
      .subscribe(events => {
        this.events = events.slice(0, 4);
      });
  }



  countAcceptedClientsByUserId(userId: number) {
    this.GaeageserviceService.countAcceptedClientsByUserId(userId).subscribe(
      (count: number) => {
        this.client = count;  
      },
      (error) => {
        console.error('Error fetching car count:', error);
      }
    );
  }

  countEventByMonth(userId: number): void {
    this.GaeageserviceService.countEventByMonth(userId).subscribe(data => {
      const labels = Object.keys(data);
      const values = Object.values(data);

      const ctx = document.getElementById('barChart') as HTMLCanvasElement;
      const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'number of events per month',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
     
      });
    });
  }

  eventsper(userId: number) {
    this.GaeageserviceService.eventsper(userId).subscribe(
      (count: number) => {
        this.remoiper = count; 
        this.createChart();  
      },
      (error) => {
        console.error('Error fetching car count:', error);
      }
    );
  }
  createChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {

        datasets: [{
        
          label: ' revenu sur total ' , 
          data: [this.revenue, this.remoiper], // Utiliser la moitié du revenu total
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
   
        // Définir un angle de départ pour la moitié du cercle

      }
    });
  }
  getRevenueChange(userId: number): void {
    this.GaeageserviceService.getRevenueChange(userId).subscribe(
      (response: any) => { // Utilisez le type 'any' pour le corps de la réponse
        console.log('Changement de revenu :', response.revenueChange);
        this.revenueChange = response.revenueChange; // Affectez la valeur à la propriété revenueChange
      },
      (error) => {
        console.error('Erreur lors de la récupération du changement de revenu :', error);
      }
    );
  }

  
  calculcaount(userId: number) {
    this.GaeageserviceService.calculcaount(userId).subscribe(
      (count: number) => {
        this.remoi3 = count;  
      },
      (error) => {
        console.error('Error fetching car count:', error);
      }
    );
  }
  
  

  calculateAcceptedRevenueForUserInCurrentMonth(userId: number) {
    this.GaeageserviceService.calculateAcceptedRevenueForUserInCurrentMonth(userId).subscribe(
      (count: number) => {
        this.remoi2 = count;  
      },
      (error) => {
        console.error('Error fetching car count:', error);
      }
    );
  }
  calculateUserEarningsmois(userId: number) {
    this.GaeageserviceService.calculateUserEarningsmois(userId).subscribe(
      (count: number) => {
        this.remoi = count;  
      },
      (error) => {
        console.error('Error fetching car count:', error);
      }
    );
  }
  calculateUserEarnings(userId: number): void {
    this.GaeageserviceService.calculateUserEarnings(userId).subscribe(
      (count: number) => {
        this.revenue = count;  
      },
      (error) => {
        console.error('Error fetching car count:', error);
      }
    );
  }

  getCountTotalEventsByUser(userId: number): void {
    this.GaeageserviceService.getCountTotalEventsByUser(userId).subscribe(
        (count: number) => {
          this.totalEventsByUser = count;  
        },
        (error) => {
          console.error('Error fetching car count:', error);
        }
      );
      }
  getVoitureDetails(carId: number): void {
    this.GaeageserviceService.getUserById(carId).subscribe(
      (User: User) => {
        this.User = User;
        this.User.image = 'data:image/jpeg;base64,' + this.User.image;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des détails de la voiture :', error);
      }
    );
  }
}
