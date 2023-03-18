import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  roles: Array<string> = [];

  constructor(
    private router: Router
  ) { }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  private getPaylodFromToken = (base64: string): string => base64.split('.')[1]

  private decodeBase64 = (base64: string): string => Buffer.from(base64, 'base64').toString('utf-8');
  
  public async getUserName(): Promise<string | null> {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const decodedPayload =  this.decodeBase64(this.getPaylodFromToken(token));
    const values = JSON.parse(decodedPayload);
    return values.sub;
  }

  public isAdmin(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    const decodedPayload =  this.decodeBase64(this.getPaylodFromToken(token));
    const values = JSON.parse(decodedPayload);
    const roles = values.roles;
    if (roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }
    return true;
  }

  public logOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}