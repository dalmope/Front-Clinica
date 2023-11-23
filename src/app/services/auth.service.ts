import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDTO } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { ChangePassword } from '../models/change-passwrord';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = environment.server;

  authURL = this.serverUrl + '/auth/';

  constructor(private httpClient: HttpClient) { }

  public register(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.serverUrl + '/person/', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUsuario);
  }

  public refresh(dto: JwtDTO): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'refresh', dto);
  }

  public recoveryPassword(dniNumber: string): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'recovery', {dniNumber});
  }

  public changePassword(change: ChangePassword): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'change-password', change);
  }
}
