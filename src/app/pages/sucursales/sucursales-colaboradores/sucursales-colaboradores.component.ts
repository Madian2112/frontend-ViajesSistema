import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SucursalService} from '../../../services/sucursal.service'
import {ColaboradoresService} from '../../../services/colaboradores.service'
import {Colaboradores} from '../../../Interfaces/colaboradoresInterface'
import { Location } from '@angular/common';
import { EMPTY } from 'rxjs';


@Component({
  selector: 'app-sucursales-colaboradores',
  templateUrl: './sucursales-colaboradores.component.html',
  styleUrls: ['./sucursales-colaboradores.component.css']
})
export class SucursalesColaboradoresComponent implements OnInit {

  managementForm!: FormGroup;
  branches : any;
  emplSucu : boolean = false;
  collaborators : Colaboradores[] = [];
  modeloVacio : boolean = false;

  constructor(private fb: FormBuilder,
              private sucursalesServices : SucursalService, 
              private colaboradoresService : ColaboradoresService,
              private location: Location
  ) {
    this.managementForm = this.fb.group({})
  }

  ngOnInit(): void {
    this.managementForm = this.fb.group({
      branch: ['', Validators.required] // Control inicial mínimo
    });
    this.initFormSelect('');

    this.sucursalesServices.Listado().then(
      (data : any)=>{
        this.branches = data;
        console.log('La data que me trae es', data)
      }, 

      error =>{
        console.log('El error es', error)
      }
    )

  }

  initFormSelect(sucu_Id : string) {

    const formControls: { [key: string]: any } = {
      branch: [sucu_Id, Validators.required],
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
      this.sucursalesServices.ListadoEmpleadosSinSucursal(event.target.value).subscribe(
        (res : any) => {
          if (Array.isArray(res)) {
            this.collaborators = res.filter((re: any) => re.cola_EsTransportista == 0);
          } 
          this.emplSucu =  true;
          this.initFormSelect(event.target.value)
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

  onSubmit() {
    if (this.managementForm.valid) {
      console.log(this.managementForm.value);
      let json: any[] = []; // Declara modelo como un array vacío
  
      for (let i = 0; i < this.collaborators.length; i++) {
        if (this.managementForm.value[`collaborator${i}`] && this.managementForm.value[`collaboratorInput${i}`] != '') {
          json.push({  sucu_Id: this.managementForm.value.branch,
                        cola_Id: this.collaborators[i].cola_Id,
                        suco_DistanciaColaborador: this.managementForm.value[`collaboratorInput${i}`],});
        }
      }

      let modelo : any = {
        Json: JSON.stringify(json).toString()
      }

      console.log('El json que me lleva es', modelo.Json);
      
      if(json.toString() == '' ){
        this.modeloVacio =  true;
      }

      else{
        this.modeloVacio =  false;
        this.sucursalesServices.CrearSucursalColaborador(modelo).subscribe(
          (resq: any)=>{
            console.log('La respuesta es esta', resq)
          }, 
          error =>{
            console.log('El error es ese', error)
          },
        )
      }

    }
    this.initFormSelect('')
    this.emplSucu =  false;
    // this.managementForm.reset();
  }
  
  

  onCancel() {
    this.location.back();
  }

}
