import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GaeageserviceService } from '../gaeageservice.service';
import { SignupRequest } from '../SignupRequest'; 
import { Router } from '@angular/router';
import { MessageResponse } from '../MessageResponse ';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;
  message: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private gaeageserviceService: GaeageserviceService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: [['user']] // Par défaut, assignez le rôle "user"
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.loading = true;
  
      const signupRequest: SignupRequest = this.signupForm.value;
  
      // Vérifier la validité du nom d'utilisateur
      if (!this.isValidUsername(signupRequest.username)) {
        this.loading = false;
        this.message = 'Nom d\'utilisateur invalide.';
        return;
      }
  
      // Vérifier la validité de l'e-mail
      if (!this.isValidEmail(signupRequest.email)) {
        this.loading = false;
        this.message = 'Email invalide.';
        return;
      }
  
      this.gaeageserviceService.registerUser(signupRequest).subscribe(
        (response: MessageResponse) => {
          this.message = response.message;
          this.loading = false;
          // Rediriger l'utilisateur vers une page de connexion ou une autre page appropriée après une inscription réussie
          this.router.navigate(['/erreure1']);
        },
        (error) => {
          this.message = error.error.message;
          this.loading = false;
        }
      );
    }
  }
  

  isValidUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9\-]+$/;
    return username.trim() !== '' && usernameRegex.test(username);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
