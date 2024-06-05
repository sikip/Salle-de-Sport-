import { Component, OnInit } from '@angular/core';
import { GaeageserviceService } from '../gaeageservice.service'; 
import { User } from '../user';  
@Component({
  selector: 'app-userclient',
  templateUrl: './userclient.component.html',
  styleUrls: ['./userclient.component.css']
})
export class UserclientComponent implements OnInit {
  users: User[] = [];
  constructor(private gaeageService: GaeageserviceService) { }

  ngOnInit(): void {
    this.findUsersByRoleUser();

  }

  findUsersByRoleUser(): void {
    this.gaeageService.findUsersByRoleUser().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Une erreur s\'est produite : ', error);
      }
    );
  }

}
