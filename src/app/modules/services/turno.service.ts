import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Turno } from '../models/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private http: HttpClient) { }

  public getTurnos(): Observable<Array<Turno>>{
    let endpoint = 'turnos';
    return this.http.get<Array<Turno>>(environment.turno + endpoint);
  }


}
