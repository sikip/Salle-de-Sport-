import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../authresponse'; 
import { GaeageserviceService } from '../gaeageservice.service';
import { JwtResponse } from '../JwtResponse ';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-signin-component',
  templateUrl: './signin-component.component.html',
  styleUrls: ['./signin-component.component.css']
})
export class SigninComponentComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private gaeageService: GaeageserviceService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
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
          const isUser = response.roles.includes('ROLE_USER');
          const iscautch = response.roles.includes('ROLE_COACH');
          if (isAdmin) {
            this.router.navigate(['/admin', id]); // Redirection vers la page admin
          } if(isUser) {
            // Si l'utilisateur n'est pas un admin, vérifiez si userPay est vrai
            if (response.userPay === 'true'   && response.confuser==='true' ) {
              this.router.navigate(['/user',id]); // Redirection vers la page d'information de l'utilisateur
            }if(response.confuser==='false' ) {
              this.router.navigate(['/erreure1']);
            }if(response.userPay === 'false') {
              // Si userPay n'est pas vrai, redirigez vers une autre page
              this.router.navigate(['/PaymentComponentComponent',id ]); // Redirection vers une autre page
            }
          } if(iscautch){
            this.router.navigate(['/cautchtach',id]);
          }
        });
}
  }
}

