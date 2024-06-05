import { Component, OnInit  } from '@angular/core';

import { eventtes } from '../eventtes';
import { ActivatedRoute } from '@angular/router';
import { commentaire } from '../commentaire';
import { GaeageserviceService } from '../gaeageservice.service';


@Component({
  selector: 'app-iventid',
  templateUrl: './iventid.component.html',
  styleUrls: ['./iventid.component.css']
})

export class IventidComponent implements OnInit  {
  clientCount1: number = 0;
  eventtes: eventtes | undefined;
  videoUrl: string | undefined;
  buttonClicked: boolean = false;
  eventtesList: eventtes[] = [];
  randomEvent: eventtes | undefined;
  commentaire: commentaire = new commentaire();
  eventId!: number;
  successMessage: string | undefined;
  errorMessage: string | undefined;
  cautchDetails: any;
  commentaires: commentaire[] = [];

  constructor(
    private route: ActivatedRoute,
    private GaeageserviceService: GaeageserviceService
  ) {}
  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.fetchClientCounts();
    this.getEventsWithPrevieosCree();
    this.route.paramMap.subscribe(params => {
      const carId = Number(params.get('id'));
      this.getVoitureDetails(carId);
      this.getCommentairesByEventId(carId); 
    });
    this.route.paramMap.subscribe(params => {
      this.eventId = Number(params.get('id'));
    });
    this.getCautchDetails();
    this.getFirstThreeEventsWithPrevieosCree();
    
  }
  getCommentairesByEventId(carId: number) {
    this.GaeageserviceService.getCommentairesByEventId(carId)
      .subscribe(commentaires => {
        this.commentaires = commentaires.slice(0, 3);
      });
  }
  onSubmit(): void {
    this.GaeageserviceService.addComment(this.eventId, this.commentaire).subscribe(
      response => {
        this.successMessage = 'Le commentaire a été ajouté avec succès.';
        this.commentaire = new commentaire(); // Réinitialiser le commentaire après l'ajout
      },
      error => {
        this.errorMessage = 'Une erreur s\'est produite lors de l\'ajout du commentaire.';
        console.error('Erreur lors de l\'ajout du commentaire :', error);
      }
    );
  }
  getVoitureDetails(carId: number): void {
    this.GaeageserviceService.getVoitureDetails(carId).subscribe(
      (eventtes: eventtes) => {
        this.eventtes = eventtes;
        
        this.eventtes.image = 'data:image/jpeg;base64,' + this.eventtes.image;
        this.eventtes.image2 = 'data:image/jpeg;base64,' + this.eventtes.image2;
        this.eventtes.image3 = 'data:image/jpeg;base64,' + this.eventtes.image3;
        this.eventtes.image4 = 'data:image/jpeg;base64,' + this.eventtes.image4;
   
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des détails de la voiture :', error);
      }
    );
}
getEventsWithPrevieosCree(): void {
  this.GaeageserviceService.getEventsWithPrevieosDeja().subscribe(
    events => {
      this.eventtesList = events;
      this.eventtesList.forEach(event => {
        event.image = 'data:image/jpeg;base64,' + event.image;
        // Vous pouvez également effectuer le traitement similaire pour les autres images si nécessaire
      });
      this.selectRandomEvent();
    },
    error => {
      console.error('Une erreur s\'est produite lors de la récupération des événements avec previeos = cree :', error);
    }
  );
}

getFirstThreeEventsWithPrevieosCree(): void {
  this.GaeageserviceService.getEventsWithPrevieosDeja().subscribe(
    events => {
      this.eventtesList = events.slice(0, 3); // Obtenir les trois premiers événements
      this.eventtesList.forEach(event => {
        event.image = 'data:image/jpeg;base64,' + event.image;
        // Vous pouvez également effectuer le traitement similaire pour les autres images si nécessaire
      });
    },
    error => {
      console.error('Une erreur s\'est produite lors de la récupération des trois premiers événements avec previeos = cree :', error);
    }
  );
}

selectRandomEvent(): void {
  const randomIndex = Math.floor(Math.random() * this.eventtesList.length);
  this.randomEvent = this.eventtesList[randomIndex];
}
private fetchClientCounts(): void {
  this.GaeageserviceService.commantairecount().subscribe(
    (count: number) => {
      this.clientCount1 = count;
      
    },
    (error) => {
      console.error('Erreur lors de la récupération du nombre de commentaires :', error);
    }
  );
}
getCautchDetails(): void {
  this.GaeageserviceService.getCautchDetails(this.eventId)
    .subscribe(
      (data: any) => {
        this.cautchDetails = data;
        console.log(this.cautchDetails); // Affiche les détails de l'événement dans la console
      },
      error => {
        console.log(error);
        // Gérer les erreurs ici
      }
    );
}
getImageUrl(base64Image: string): string {
  return 'data:image/jpeg;base64,' + base64Image;
}


getColor(index: number): string {
  return index < 2 ? '#060606' : 'green';
}

showVideo(eventId: number) {
  // Appelez le service pour récupérer la vidéo correspondant à l'événement
  this.GaeageserviceService.playVideoByEventId(eventId).subscribe((blob) => {
    const videoUrl = URL.createObjectURL(blob);
    this.videoUrl = videoUrl;
    this.buttonClicked = true;  // Mettez à jour l'état du bouton
  });
}
closeVideo() {
  this.buttonClicked = false;  // Mettez à jour l'état du bouton pour fermer la vidéo
}

shareOnFacebook(): void {
  const currentURL = window.location.href;
  const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`;
  window.open(facebookShareURL, '_blank');
}
 shareOnTwitter(): void {
  const urlToShare = "https://twitter.com/?logout=1708355061070"; 
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(urlToShare)}`, "_blank");
}
shareOnLinkedIn(): void {
  const urlToShare = window.location.href; 
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlToShare)}`, "_blank");
}

}
