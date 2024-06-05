import { Component,OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
@Component({
  selector: 'app-hh',
  templateUrl: './hh.component.html',
  styleUrls: ['./hh.component.css']
})
export class HhComponent implements OnInit  {
  clientCount1: number = 1;
  currentNumber1: number = 0;
  cautchCount2: number = 1;
  currentNumber2: number = 0;

  constructor(private GaeageserviceService: GaeageserviceService) {}
  ngOnInit(): void {
    this.fetchClientCounts();
    this.fetchCarCount2();
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
}
