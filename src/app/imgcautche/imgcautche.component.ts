import { Component, OnInit, OnDestroy } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service'; 
import { User } from '../user';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-imgcautche',
  templateUrl: './imgcautche.component.html',
  styleUrls: ['./imgcautche.component.css']
})
export class ImgcautcheComponent  implements OnInit , OnDestroy {
  users: User[] = [];
  refreshIntervalSubscription: Subscription | undefined;

  constructor(private gaeageService: GaeageserviceService) { }

  ngOnInit(): void {
    this.getUsersWithRoleCoach();
    this.startAutoRefresh();
  }

  ngOnDestroy(): void {
    this.stopAutoRefresh();
  }

  getUsersWithRoleCoach(): void {
    this.gaeageService.getUsersWithRoleCoach().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Une erreur s\'est produite : ', error);
      }
    );
  }

  startAutoRefresh(): void {
    this.refreshIntervalSubscription = interval(300000).subscribe(() => { // Rafraîchit toutes les 5 minutes
      this.getUsersWithRoleCoach();
    });
  }

  stopAutoRefresh(): void {
    if (this.refreshIntervalSubscription) {
      this.refreshIntervalSubscription.unsubscribe();
    }
  }
}
