import { Component  , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SucursalService} from '../../../services/sucursal.service'
import {ColaboradoresService} from '../../../services/colaboradores.service'
import {ViajesService} from '../../../services/viajes.service'
import {TarifaService} from '../../../services/tarifa.service'
import {Colaboradores} from '../../../Interfaces/colaboradoresInterface'
import { EMPTY } from 'rxjs';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-viajes-crear',
  templateUrl: './viajes-crear.component.html',
  styleUrls: ['./viajes-crear.component.css']
})
export class ViajesCrearComponent implements OnInit {

  managementForm!: FormGroup;
  branches : any;
  emplSucu : boolean = false;
  collaborators : Colaboradores[] = [];
  modeloVacio : boolean = false;
  collaboradoresDDL : any;
  suma: boolean = false;
  mas100: boolean = false;
  tarifa: number = 0;

  constructor(private fb: FormBuilder,
              private sucursalesServices : SucursalService, 
              private colaboradoresService : ColaboradoresService,
              private datePipe: DatePipe,
              private tarifService : TarifaService,
              public cookieService: CookieService,
              public viajeService: ViajesService,
              private router :Router,
  ) {}

  async ngOnInit() {
    this.managementForm = this.fb.group({
      branch: ['', Validators.required],
      transportista: ['', Validators.required] // Control inicial mínimo
    });
    await this.tarifService.Listado().then(
      (res:any)=>{
        this.tarifa = res[0].tari_Tarifa
      }
    )
    this.initFormSelect("", '');

    this.sucursalesServices.Listado().then(
      (data : any)=>{
        this.branches = data;
        console.log('La data que me trae es', data)
      }, 

      error =>{
        console.log('El error es', error)
      }
    )

    await this.colaboradoresService.Listado().then(
      (res: any) =>{
        if(Array.isArray(res)){
        this.collaboradoresDDL = res.filter((re: any) => re.cola_EsTransportista == 1)
        }
      }
    )

  }

  initFormSelect(sucu_Id : string, transportista : string) {

    const formControls: { [key: string]: any } = {
      branch: [sucu_Id, Validators.required],
      transportista: [transportista, Validators.required],
    };
  
    this.collaborators.forEach((collaborator, index) => {
      formControls[`collaborator${index}`] = [false];
      formControls[`collaboratorName${index}`] = [''];
      formControls[`collaboratorInput${index}`] = [
        '',
        [
          Validators.pattern(/^[1-9][0-9]*$/), // Solo números positivos, sin ceros iniciales
          Validators.max(50) // Máximo permitido: 50
        ]
      ];    });

    this.managementForm = this.fb.group(formControls);
  }

  onSelect(event: any) {
    console.log('Este es el event', event.target.value)
    if(event.target.value != ''){
      this.sucursalesServices.ListadoEmpleadosConSucursal(event.target.value).subscribe(
        (res : any) => {
          if (Array.isArray(res)) {
            this.collaborators = res.filter((re: any) => re.cola_EsTransportista == 0);
          } 
          else{
            console.log('No es un arreglo porque viene asi', res)
          }
          this.emplSucu =  true;
          this.initFormSelect(event.target.value, '')
        },
        error =>{
          console.log('El error es', error)
        }
      )
    }
    else{
      this.emplSucu = false;
    }
  }

  onSelectColaborador(event: any) {
    console.log('Este es el event', event.target.value)
  }

  onSubmit() {
    if (this.managementForm.valid) {
      console.log(this.managementForm.value);
      let json: any[] = []; // Declara modelo como un array vacío
  
      for (let i = 0; i < this.collaborators.length; i++) {
        if (this.managementForm.value[`collaborator${i}`]) {
          json.push({
            cola_Id: this.collaborators[i].cola_Id,
            suco_Distancia: this.collaborators[i].suco_DistanciaColaborador,
            vide_DistanciaKM: this.collaborators[i].suco_DistanciaColaborador,
          });
        }
      }
  
      const today = new Date();
      const modelo: any = {
        viaj_Fecha: this.datePipe.transform(today, 'yyyy-MM-dd'),
        viaj_Tarifa: this.tarifa,
        cola_Id: this.managementForm.value.transportista,
        sucu_Id: this.managementForm.value.branch,
        usua_Id: parseInt(this.cookieService.get('usuario_Id'), 10),
        viaj_TotalTarifa: parseInt(
          json.reduce((acumulador, item) => acumulador + item.suco_Distancia, 0),
          10
        ),
        Json: JSON.stringify(json),
      };
      console.log('Este es el modelo que me lleva', modelo);
  
      // Verifica el total de distancia
      if (json.reduce((acumulador, item) => acumulador + item.suco_Distancia, 0) <= 100) {
        this.mas100 = false;
  
        if (json.length === 0) {
          this.modeloVacio = true;
        } else {
          this.modeloVacio = false;
  
          try {
            const resq = this.viajeService.Crear(modelo).subscribe();
            console.log('La respuesta es esta', resq);
          } catch (error) {
            console.error('El error es ese', error);
          }
        }
      } else {
        this.mas100 = true;
      }
  
      // Acciones posteriores, ejecutadas al final del flujo
      
    }
    // this.managementForm.reset();
    this.emplSucu = false;
    this.initFormSelect('', '');
  }
  

  onCancel() {
    this.router.navigate(['/admin/viajes']);
  }

}
