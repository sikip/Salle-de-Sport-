import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GaeageserviceService } from '../gaeageservice.service';
import { offre } from '../offre';
import { AuthService } from '../authresponse';
import { JwtResponse } from '../JwtResponse ';

@Component({
  selector: 'app-signin2',
  templateUrl: './signin2.component.html',
  styleUrls: ['./signin2.component.css']
})
export class Signin2Component implements OnInit {
  salle: any[] = [];
  offre: offre | undefined;
  displayedSalle: any[] = [];
  id!: number;
  loading = false;
  message: string | undefined;

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private gaeageService: GaeageserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.getOffreById(this.id);
      }
    });

    this.getsall();
  }

  getOffreById(id: number): void {
    this.gaeageService.getOffreById(id).subscribe(
      offre => this.offre = offre
    );
  }

  getsall(): void {
    this.gaeageService.getsall().subscribe(
      (data: any[]) => {
        this.salle = data;
        this.displayedSalle = this.salle.slice(0, 1);
        
        this.salle.forEach(salle => {
          salle.image = 'data:image/jpeg;base64,' + salle.image;
        });
      }
    );
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;

      // Utilisez les valeurs directement du formulaire plutôt que de faire appel à la méthode .value
      const loginRequest = this.loginForm.value;

      this.gaeageService.connect(loginRequest).subscribe(
        (response: JwtResponse) => {
          // Si votre JWT contient l'ID utilisateur, utilisez-le pour le stocker dans le service d'authentification
          const id = response.id;
          this.authService.setUserId(id);

   

          // Redirigez vers la page appropriée en fonction du rôle de l'utilisateur
          const isAdmin = response.roles.includes('ROLE_ADMIN');

          if (isAdmin) {
            this.router.navigate(['/admin', id]); // Redirection vers la page admin
          } else {
            // Si l'utilisateur n'est pas un admin, vérifiez si userPay est vrai
            if (response.userPay === 'true') {
              this.router.navigate(['/user',id]); // Redirection vers la page d'information de l'utilisateur
            } else {
              if (this.offre) {
                // Vérifiez si l'offre est définie avant de l'utiliser
                this.router.navigate(['/payment2', id, this.offre.id ]); // Redirection vers une autre page
              }
            }
          }
        });
}
  }
}
