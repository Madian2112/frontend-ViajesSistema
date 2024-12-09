import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from '../../services/login.service'
import { Router } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  credencialesInvalidad: boolean = false;

  constructor(private fb: FormBuilder,
              private loginService : LoginService,
              private router :Router,
              public cookieService: CookieService,
  ) {
    this.loginForm = this.fb.group({
      usua_Usuario: ['', Validators.required],
      usua_Clave: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      
      await this.loginService.InciarSesion(this.loginForm.value.usua_Usuario, this.loginForm.value.usua_Clave).then(
        (request: any) =>{
          console.log('La respuesta del inicio de sesion es', request[0].usua_EsGerente);
          this.cookieService.set('esGerente', request[0].usua_EsGerente);
          this.cookieService.set('usuario_Id', request[0].usua_Id);
          if(request.length > 0){
            this.credencialesInvalidad = false;
            this.router.navigate(['/admin/viajes']);
          }

          else{
            this.credencialesInvalidad = true;
          }
        }, 
        error =>{
          console.log('El error es ', error)
        }
      )

      console.log('Login submitted', this.loginForm.value); 
    }
  }

}
