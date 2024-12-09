import { Component , OnInit, NgZone, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import {ColaboradoresService} from '../../../services/colaboradores.service'
import iziToast from 'izitoast';
// import { MessageService } from 'primeng/api';
// import { Toast } from 'primeng/toast';
// import { ButtonModule } from 'primeng/button';
// import { Ripple } from 'primeng/ripple';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-colaboradores-crear',
  templateUrl: './colaboradores-crear.component.html',
  styleUrls: ['./colaboradores-crear.component.css']
})
export class ColaboradoresCrearComponent implements OnInit {

  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private router :Router,
              private colaboradorService : ColaboradoresService,
              private zone: NgZone,
              private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.employeeForm = this.fb.group({
      cola_Identidad: ['', Validators.required],
      cola_PrimerNombre: ['', Validators.required],
      cola_SegundoNombre: [''],
      cola_PrimerApellido: ['', Validators.required],
      cola_SegundoApellido: [''],
      cola_Sexo: ['', Validators.required],
      cola_EsTransportista: [false]
    });
  }


  
  finalizarCreacion() {
    console.log('Me entro a este if ');
    this.employeeForm.reset();
    iziToast.success({
      title: 'Confirmación',
      message: 'Colaboradro creado exitosamente',
      position: 'topRight'
    });
  }

  onSubmit() {
    let success;
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
  
      const modelo: any = {
        cola_Identidad: this.employeeForm.value.cola_Identidad,
        cola_PrimerNombre: this.employeeForm.value.cola_PrimerNombre,
        cola_SegundoNombre: this.employeeForm.value.cola_SegundoNombre,
        cola_PrimerApellido: this.employeeForm.value.cola_PrimerApellido,
        cola_SegundoApellido: this.employeeForm.value.cola_SegundoApellido,
        cola_Sexo: this.employeeForm.value.cola_Sexo,
        cola_EsTransportista: this.employeeForm.value.cola_EsTransportista
      };
  
      this.zone.run(()=>{

        this.colaboradorService.Crear(modelo).subscribe(
          (res: any) => {
              console.log('La respuesta es', res);
              success = 1;
          },
          error => {
              console.log('El error es', error);
          }
        );
      })
    }
    this.employeeForm.reset();
  }

  onCancel() {
    this.router.navigate(['/admin/colaboradores']);
  }

  

  sucursalesColaboradores(){
    this.router.navigate(['/admin/sucursalesColaboradores']);
  }

  iziToast(){
    iziToast.success({
      title: 'Confirmación',
      message: 'Colaboradro creado exitosamente',
      position: 'topRight'
    });
  }

}
