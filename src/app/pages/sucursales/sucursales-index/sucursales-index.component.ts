import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {SucursalService} from '../../../services/sucursal.service'
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface sucursales{
  sucu_Id: number,
  sucu_Nombre: string, 
  sucu_Latitud: string , 
  sucu_Longitud: string, 
  colaboradores : []
}

@Component({
  selector: 'app-sucursales-index',
  templateUrl: './sucursales-index.component.html',
  styleUrls: ['./sucursales-index.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SucursalesIndexComponent implements OnInit {

  data: sucursales [] = [];
  expandedElement: any | null;
  expandedRows: boolean[] = [];

  displayedColumns: string[] = ['index', 'Nombre', 'Latitud', 'Longitud'];
  itemsPerPage: number = 5;

  constructor(private dialog: MatDialog,
    private router :Router,
    private sucursalService: SucursalService,
  ) {}

  ngOnInit() {
    this.Listado();
  }

  async Listado(){
    // this.sucursalService.Listado().then(
    //   (data : sucursales[])=>{
    //     this.data = data;

    //     console.log('La data que me trae es', data)
    //   }, 

    //   error =>{
    //     console.log('El error es', error)
    //   }
    // )

    this.sucursalService.Listado().then(
      (data: sucursales[]) => {
        this.data = data;  // Asignamos las sucursales
    
        // Luego recorremos las sucursales y por cada una obtenemos los colaboradores
        this.data = this.data.map(sucursal => {
          // Aquí llamamos a un servicio que obtenga los colaboradores de cada sucursal
          this.sucursalService.ListadoEmpleadosConSucursal(sucursal.sucu_Id).subscribe(
            (colaboradores: any) => {
              // Asignamos los colaboradores a la sucursal correspondiente
              sucursal.colaboradores = colaboradores;
            },
            (error) => {
              console.log('Error al obtener colaboradores para la sucursal', sucursal.sucu_Id);
            }
          );
          return sucursal;
        });
    
        console.log('La data con colaboradores es', this.data);
      },
      error => {
        console.log('El error es', error);
      }
    );
    

  }

  editUser (user: any) {
    console.log('Editar usuario:', user);
  }


  deleteUser (user: any) {
    console.log('Eliminar usuario:', user);
  }


  viewDetails(user: any) {
    console.log('Detalles del usuario:', user);
  }

  crearSucursal(){
    this.router.navigate(['/admin/sucursalesCrear']);
  }

  eliminarDetalle(detalle: any, j:any){
    console.log('La data para eliminar es', detalle, j)
  }

  toggleExpand(index: number) {
    this.expandedRows[index] = !this.expandedRows[index];
  }

  sucursalesColaboradores(){
    this.router.navigate(['/admin/sucursalesColaboradores']);
  }


}
