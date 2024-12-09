import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import {TarifaService} from '../../../services/tarifa.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tarifas-editar',
  templateUrl: './tarifas-editar.component.html',
  styleUrls: ['./tarifas-editar.component.css']
})
export class TarifasEditarComponent implements OnInit {

  employeeForm!: FormGroup;
  tariId: any;
  tariTarifa: any;

  constructor(private fb: FormBuilder,
              private router :Router,
              private tarifaService : TarifaService,
              private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();
    this.tariId = this.route.snapshot.paramMap.get('tari_Id');
    this.tariTarifa = this.route.snapshot.paramMap.get('tari_Tarifa');

    this.employeeForm.patchValue({
      tari_Tarifa : this.tariTarifa
    })
  }

  initForm() {
    this.employeeForm = this.fb.group({
      tari_Tarifa: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      
      const modelo : any = {
        tari_Id: parseInt(this.tariId),
        tari_Tarifa: parseInt(this.employeeForm.value.tari_Tarifa)
      }
      console.log('El modelo es este', modelo)

      this.tarifaService.Editar(modelo).subscribe(
        (res : any) =>{
          console.log('La respuesta es', res)
        },
        error =>{
          console.log('El error es', error)
        }
      )

    }
  }

  onCancel() {
    this.router.navigate(['/admin/tarifas']);
  }

  sucursalesColaboradores(){
    this.router.navigate(['/admin/tarifas']);
  } 

}
