import { Component, OnInit } from '@angular/core';
import { commentaire } from '../commentaire';
import { GaeageserviceService } from '../gaeageservice.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  commentaire: any[] = []; 
  constructor(private GaeageserviceService: GaeageserviceService) { }
  ngOnInit(): void {
    this.getAllCommentsWithEventNames();
  }
  getAllCommentsWithEventNames(): void {
    this.GaeageserviceService.getAllCommentsWithEventNames().subscribe(
      (data: any[]) => {
        this.commentaire = data;
        
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des voitures :', error);
      }
    );
  }
  
}
