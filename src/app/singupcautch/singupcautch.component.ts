import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GaeageserviceService } from '../gaeageservice.service';
import { SignupRequest } from '../SignupRequest'; 
import { Router } from '@angular/router';
import { MessageResponse } from '../MessageResponse ';


@Component({
  selector: 'app-singupcautch',
  templateUrl: './singupcautch.component.html',
  styleUrls: ['./singupcautch.component.css']
})
export class SingupcautchComponent {
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
      roles: [['mod']]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.loading = true;

      const signupRequest: SignupRequest = this.signupForm.value;

      this.gaeageserviceService.registerUser(signupRequest).subscribe(
        (response: MessageResponse) => {
          this.message = response.message;
          this.loading = false;
          // Rediriger l'utilisateur vers une page de connexion ou une autre page appropriée après une inscription réussie
          this.router.navigate(['/sigin']);
        },
        (error) => {
          this.message = error.error.message;
          this.loading = false;
        }
      );
    }
  }

}
