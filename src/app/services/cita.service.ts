import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrearCita } from '../models/CrearCita';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Citas } from '../models/Citas';
import { AsignarCita } from '../models/AsignarCita';
import { EstadoCitaEnum } from '../models/EstadoCitaEnum';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(private httpClient: HttpClient,private tokenService: TokenService) { }

  serverUrl = environment.server;
  citaUrl = this.serverUrl + '/cita-medica';
  token = this.tokenService.getToken();
  username: string = this.tokenService.getUserName();

  public create(cita: CrearCita): Observable<any> {
    return this.httpClient.post<any>(this.citaUrl + '/paciente', cita, { headers: { Authorization: this.token } });
  }

  public getAll(): Observable<Citas> {
    return this.httpClient.get<Citas>(this.citaUrl, { headers: { Authorization: this.token } });
  }

  public getAllByUser(): Observable<Citas> {
    return this.httpClient.get<Citas>(this.citaUrl + '/paciente/' + this.username, { headers: { Authorization: this.token } });
  }

  public getAllByEstado(estado: EstadoCitaEnum): Observable<Citas> {
    return this.httpClient.get<Citas>(this.citaUrl + '/estado/' + estado, { headers: { Authorization: this.token } });
  }

  public deleteCita(id: number): Observable<any> {
    console.log("id: " + id);
    return this.httpClient.delete<any>(this.citaUrl + '/' + id, { headers: { Authorization: this.token } });
  }

  public asignarCita(cita: AsignarCita): Observable<any> {
    return this.httpClient.post<any>(this.citaUrl + '/asignar', cita, { headers: { Authorization: this.token } });
  }

}
