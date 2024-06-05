import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { eventtes } from '../eventtes';
@Component({
  selector: 'app-ivent',
  templateUrl: './ivent.component.html',
  styleUrls: ['./ivent.component.css']
})
export class IventComponent  implements OnInit {
  clientCount1: number = 1;
  currentNumber1: number = 0;
  eventCount2: number = 1;
  currentNumber3: number = 0;
  eventfalse: number = 1;
  currentNumber4: number = 0;
  eventtes: any[] = []; 
  constructor(private GaeageserviceService: GaeageserviceService) {}

  ngOnInit(): void {
    this.fetchClientCounts();
    this.fetcheventCount2();
    this.fetcheventCount3();
    this.getAllEvents();
  }
  getAllEvents(): void {
    this.GaeageserviceService.geteventall().subscribe(
      (data: any[]) => {
        this.eventtes = data;
        
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des voitures :', error);
      }
    );
  }
  private fetchClientCounts(): void {
    this.GaeageserviceService.getNumberEventacept().subscribe(
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

  private fetcheventCount3(): void {
    this.GaeageserviceService.getNumberEventfalse().subscribe(
      (count: number) => {
        this.eventfalse = count;
        this.animateNumbers4();
      },
      (error) => {
        console.error('Error fetching event count:', error);
      }
    );
  }
  private animateNumbers4(): void {
    const interval3 = setInterval(() => {
      if (this.currentNumber4 < this.eventfalse) {
        this.currentNumber4 += 1;
      } else {
        clearInterval(interval3);
      }
    }, 20);
  }
}
