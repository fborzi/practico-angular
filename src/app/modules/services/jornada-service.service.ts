import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jornadaLaboral } from '../models/jornadaLaboral';

@Injectable({
  providedIn: 'root'
})
export class JornadaServiceService {

  constructor(private http: HttpClient) { }

  private refresh = new Subject<void>();

  getRefreshRequired(){
    return this.refresh;
  }

  crearJornadaLaboral(jornada: jornadaLaboral): Observable <any>{
    let endpoint = 'jornadas-laborales';
    return this.http.post(environment.jornada + endpoint, jornada,{responseType: 'text'}).pipe(
      tap(()=>{
        this.refresh.next()
      })
    );
  }

  public getJornadasLaborales(): Observable<jornadaLaboral[]>{
    let endpoint = 'jornadas-laborales';
    return this.http.get<jornadaLaboral[]>(environment.jornada + endpoint);
  }

}
