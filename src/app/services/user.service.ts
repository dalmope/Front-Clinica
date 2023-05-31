import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  token = this.tokenService.getToken();
  serverUrl = environment.server;
  userUrl = this.serverUrl + '/user';

  public getAllMeds(): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.userUrl + '/medico', { headers: { Authorization: this.token } });
  }
}
