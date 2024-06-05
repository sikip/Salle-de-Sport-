import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
import { commentaire } from '../commentaire';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent implements OnInit {
  commentaires: commentaire[] = []; // Changez ici

  constructor(private service: GaeageserviceService) { }

  ngOnInit(): void {
    this.getCommentaires();
  }

  getCommentaires() {
    this.service.getcommentaire().subscribe(data => {
      // Utilisez slice() pour récupérer les trois premiers commentaires
      this.commentaires = data.slice(0, 3);
    });

}
}