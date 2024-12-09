import { Component , OnInit } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {ColaboradoresService} from '../../../services/colaboradores.service'

@Component({
  selector: 'app-colaboradores-index',
  templateUrl: './colaboradores-index.component.html',
  styleUrls: ['./colaboradores-index.component.css']
})
export class ColaboradoresIndexComponent implements OnInit {

  data: any;

  displayedColumns: string[] = ['index','Identidad' ,'Nombres', 'Apellidos', 'Sexo'];
  itemsPerPage: number = 5;

  constructor(private dialog: MatDialog,
    private router :Router,
    private colaboradorService: ColaboradoresService,
  ) {}

  ngOnInit() {
    this.Listado();
  }

  async Listado(){
    this.colaboradorService.Listado().then(
      (data : any)=>{
        this.data = data;
        console.log('La data que me trae es', data)
      }, 

      error =>{
        console.log('El error es', error)
      }
    )
  }

  editar (data: any) {
    console.log('Editar usuario:', data);
  }


  eliminar (data: any) {
    console.log('Eliminar usuario:', data);
  }


  detalle(data: any) {
    console.log('Detalles del usuario:', data);
  }

  crearColaborador(){
    this.router.navigate(['/admin/colaboradoresCrear']);
  }

  sucursalesColaboradores(){
    this.router.navigate(['/admin/sucursalesColaboradores']);
  }

}
