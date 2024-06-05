import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private id: number | null = null;

  constructor() { }

  setUserId(id: number): void {
    this.id = id;
  }

  getUserId(): number | null {
    return this.id;
  }

  isLoggedIn(): boolean {
    return this.id !== null;
  }

  logout(): void {
    this.id = null;
    // Vous pouvez ajouter d'autres opérations de nettoyage ici, par exemple, supprimer le token JWT du localStorage
  }
}
