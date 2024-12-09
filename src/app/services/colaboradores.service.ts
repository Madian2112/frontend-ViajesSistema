import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {

  constructor(private http: HttpClient) { }
  private apiUrl: string = environment.apiUrl;
  private encabezado = `${this.apiUrl}/api/colaboradores`;

  private options: {} = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  Crear(modelo: any): Observable<any>{
    return this.http.post<any>(`${this.encabezado}/`, modelo);
  }

  Listado(){
    return this.http.get<any>(`${this.encabezado}/`, this.options).toPromise();
  }
}
