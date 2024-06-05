import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GaeageserviceService } from '../gaeageservice.service';
import { offre } from '../offre';

@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.component.html',
  styleUrls: ['./signup2.component.css']
})
export class Signup2Component implements OnInit {
  salle: any[] = [];
  offre: offre | undefined;
  displayedSalle: any[] = [];
  id!: number;
  signupForm!: FormGroup;
  loading = false;
  message: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private gaeageserviceService: GaeageserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: [['user']]
    });

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.getOffreById(this.id);
      }
    });

    this.getsall();
  }

  getsall(): void {
    this.gaeageserviceService.getsall().subscribe(
      (data: any[]) => {
        this.salle = data;
        this.displayedSalle = this.salle.slice(0, 1);
        
        this.salle.forEach(salle => {
          salle.image = 'data:image/jpeg;base64,' + salle.image;
        });
      }
    );
  }

  getOffreById(id: number): void {
    this.gaeageserviceService.getOffreById(id).subscribe(
      offre => this.offre = offre
    );
  }
  
  onSubmit(): void {
    if (this.signupForm.valid) {
      this.loading = true;

      const signupRequest = this.signupForm.value;

      this.gaeageserviceService.registerUser(signupRequest).subscribe(
        (response: any) => {
          this.message = response.message;
          this.loading = false;
         // Redirection après inscription réussie
         if (this.offre && this.offre.id) {
          this.router.navigate(['/tform4', this.offre.id]);
        } else {
          // Gérer le cas où l'offre n'est pas définie ou n'a pas d'ID
          console.error('Erreur: Offre non définie ou ID manquant.');
        }
      },
        (error: any) => {
          this.message = error.error.message;
          this.loading = false;
        }
      );
    }
  }
}
