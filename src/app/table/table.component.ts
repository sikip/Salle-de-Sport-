import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';

import * as AOS from 'aos';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  offre: any[] = []; 
  displayedOffre: any[] = [];
  constructor(private GaeageserviceService: GaeageserviceService) { }
  ngOnInit(): void {
    this.getAllOffre(); 
    AOS.init({
      duration: 800, 
      easing: 'ease-in-out', 
      once: true 
    });
  }
  getAllOffre(): void {
    this.GaeageserviceService.getAllOffre().subscribe(
      (data: any[]) => {
        this.offre = data;
        this.displayedOffre = this.offre.slice(0, 3);
      }
    );
  }
}