import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoServiceService {

  constructor(private http: HttpClient) { }

  private refreshRequired = new Subject<void>();

  getRefreshRequired(){
    return this.refreshRequired;
  }

  crearEmpleado(empleado: Empleado): Observable <any>{
    let endpoint = 'empleados';
    return this.http.post(environment.empleado + endpoint, empleado).pipe(
      tap(()=>{
        this.refreshRequired.next()
      })
    );
  }

  public getEmpleados(): Observable<Empleado[]>{
    let endpoint = 'empleados';
    return this.http.get<Empleado[]>(environment.empleado + endpoint);
  }
}
