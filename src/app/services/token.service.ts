import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
import { NotificationService } from './notification.service';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  roles: Array<string> = [];

  constructor(
    private router: Router,
    private noti: NotificationService
  ) { }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  private getTokenExpiration(token: string): number | null {
    const tokenPayload = this.decodeTokenPayload(token);
    if (tokenPayload && tokenPayload.exp) {
      return tokenPayload.exp;
    }
    return null;
  }

  public isLogged(): boolean {
    const token = this.getToken();
    if (token) {
      const tokenExpiration = this.getTokenExpiration(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      return tokenExpiration && tokenExpiration > currentTimestamp;
    }
    return false;
  }

  private getPaylodFromToken = (base64: string): string => base64.split('.')[1]

  private decodeBase64 = (base64: string): string => Buffer.from(base64, 'base64').toString('utf-8');
  
  public getUserName(): string | null {
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
    this.roles = values.roles;
    if (this.roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }
    return true;
  }

  public isSecretary(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    const decodedPayload =  this.decodeBase64(this.getPaylodFromToken(token));
    const values = JSON.parse(decodedPayload);
    this.roles = values.roles;
    if (this.roles.indexOf('ROLE_SECRETARIO') < 0) {
      return false
    }
    return true;
  }

  public logOut(): void {
    window.localStorage.clear();
    this.noti.onInformation('Sesión cerrada correctamente');
    location.reload();
  }

  private decodeTokenPayload(token: string): any {
    const tokenParts = token.split('.');
    if (tokenParts.length === 3) {
      const payload = this.decodeBase64(this.getPaylodFromToken(token));
      return JSON.parse(payload);
    }
    return null;
  }
}