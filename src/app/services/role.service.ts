import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role } from '../models/Role';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  
  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  token = this.tokenService.getToken();
  serverUrl = environment.server;
  roleURL = this.serverUrl + '/role';

  public getAll(): Observable<any> {
    return this.httpClient.get<any>(this.roleURL, { headers: { Authorization: this.token } });
  }

  public getEspecialidades(): Observable<any> {
    return this.httpClient.get<any>(`${this.roleURL}/especialidad`, { headers: { Authorization: this.token } });
  }
}
