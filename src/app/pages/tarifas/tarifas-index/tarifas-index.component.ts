import { Component , OnInit } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {TarifaService} from '../../../services/tarifa.service'


@Component({
  selector: 'app-tarifas-index',
  templateUrl: './tarifas-index.component.html',
  styleUrls: ['./tarifas-index.component.css']
})
export class TarifasIndexComponent implements OnInit {
  data: any;

  displayedColumns: string[] = ['index', 'Tarifa', 'actions'];
  itemsPerPage: number = 5;

  constructor(private dialog: MatDialog,
    private router :Router,
    private tarifaService: TarifaService,
  ) {}

  ngOnInit() {
    this.Listado();
  }

  async Listado(){
    this.tarifaService.Listado().then(
      (data : any)=>{
        this.data = data;
        console.log('La data que me trae es', data)
      }, 

      error =>{
        console.log('El error es', error)
      }
    )
  }

  editar (user: any) {
    this.router.navigate(['/admin/tarifasEditar', user.tari_Id, user.tari_Tarifa]);
    console.log('Editar usuario:', user);
  }
}
