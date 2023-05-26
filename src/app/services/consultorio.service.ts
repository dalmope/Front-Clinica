import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Consultorio } from '../models/Consultorio';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class ConsultorioService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  serverUrl = environment.server;
  consultorioURL = this.serverUrl + '/consultorio';
  token = this.tokenService.getToken();

  public create(consultorio: Consultorio): Observable<any> {
    return this.httpClient.post<any>(this.consultorioURL, consultorio, { headers: { Authorization: this.token } });
  }

  public update(consultorio: Consultorio): Observable<any> {
    return this.httpClient.put<any>(`${this.consultorioURL}/${consultorio.id}`, consultorio, { headers: { Authorization: this.token } });
  }

  public desactivate(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.consultorioURL}/${id}`, { headers: { Authorization: this.token } });
  }

  public getAllActivos(): Observable<Consultorio[]> {
    return this.httpClient.get<Consultorio[]>(this.consultorioURL, { headers: { Authorization: this.token } });
  }

  public getAll(): Observable<Consultorio[]> {
    return this.httpClient.get<Consultorio[]>(`${this.consultorioURL}/all`, { headers: { Authorization: this.token } });
  }

}
