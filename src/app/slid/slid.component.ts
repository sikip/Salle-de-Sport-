import { Component } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service';
@Component({
  selector: 'app-slid',
  templateUrl: './slid.component.html',
  styleUrls: ['./slid.component.css']
})
export class SlidComponent {
  videoUrl: string | undefined;
  buttonClicked: boolean = false;

  constructor(private GaeageserviceService: GaeageserviceService) {}

  showVideo() {
    // Appelez le service pour récupérer la vidéo
    this.GaeageserviceService.playVideo(1).subscribe((blob) => {
      const videoUrl = URL.createObjectURL(blob);
      this.videoUrl = videoUrl;
      this.buttonClicked = true;  // Mettez à jour l'état du bouton
    });
  }
  closeVideo() {
    this.buttonClicked = false;  // Mettez à jour l'état du bouton pour fermer la vidéo
  }
}