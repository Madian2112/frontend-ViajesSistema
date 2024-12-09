import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  private apiUrl: string = environment.apiUrl;
  private planillaEncabezado = `${this.apiUrl}/api/usuarios`;

  private options: {} = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
      })
    };
  }

  InciarSesion(usua_Usuario: string, usua_Clave: string){
    return this.http.get<any>(`${this.planillaEncabezado}/${usua_Usuario}/${usua_Clave}`, this.options).toPromise();
  }
}
