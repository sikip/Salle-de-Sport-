import { Component, OnInit  } from '@angular/core';

import { GaeageserviceService } from '../gaeageservice.service';
import * as Aos from 'aos';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent implements OnInit   {
  eventtes: any[] = []; 
  displayedevent: any[] = [];
  constructor(private GaeageserviceService: GaeageserviceService) { }
  ngOnInit(): void {
    this.getevent();
  }

  getevent(): void {
    this.GaeageserviceService.getevent().subscribe(
      (data: any[]) => {
        this.eventtes = data;
        this.displayedevent = this.eventtes.slice(0, 3);
        this.eventtes.forEach(eventtes => {
          eventtes.image = 'data:image/jpeg;base64,' + eventtes.image;
        });
        
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des voitures :', error);
      }
    );
  }

}
