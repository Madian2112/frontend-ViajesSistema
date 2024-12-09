import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private http: HttpClient) { }
  private apiUrl: string = environment.apiUrl;
  private encabezado = `${this.apiUrl}/api/sucursales`;

  private options: {} = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  // private getHttpOptions() {
  //   return {
  //     headers: new HttpHeaders({
  //     })
  //   };
  // }

  Crear(modelo: any){
    return this.http.post<any>(`${this.encabezado}/`, modelo).toPromise();
  }

  CrearSucursalColaborador(modelo: any): Observable<any>{
    return this.http.post<any>(`${this.encabezado}/sucursalEmpleado/`, modelo);
  }

  Listado(){
    return this.http.get<any>(`${this.encabezado}/`, this.options).toPromise();
  }

  ListadoEmpleadosSinSucursal(sucu_Id : number){
    return this.http.get<any>(`${this.encabezado}/emplSucu/${sucu_Id}`, this.options) ;
  }

  ListadoEmpleadosConSucursal(sucu_Id : number){
    return this.http.get<any>(`${this.encabezado}/emplConSucu/${sucu_Id}`, this.options) ;
  }

}
