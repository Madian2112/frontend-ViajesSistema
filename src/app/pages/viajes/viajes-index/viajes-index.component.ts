import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {SucursalService} from '../../../services/sucursal.service'
import {ViajesService} from '../../../services/viajes.service'


@Component({
  selector: 'app-viajes-index',
  templateUrl: './viajes-index.component.html',
  styleUrls: ['./viajes-index.component.css']
})
export class ViajesIndexComponent implements OnInit  {

  data: any;
  esGerente: any;

  displayedColumns: string[] = ['index', 'transportista', 'usuario', 'sucursal', 'viaj_Fecha', 'viaj_Tarifa', 'viaj_TotalTarifa', 'total'];
  itemsPerPage: number = 5;

  constructor(private dialog: MatDialog,
    private router :Router,
    private sucursalService: SucursalService,
    public cookieService: CookieService,
    private viajeServices: ViajesService,
  ) {}

  ngOnInit() {
    this.Listado();
    this.esGerente = this.cookieService.get('esGerente');
    if (this.esGerente === 'true') {
      this.displayedColumns.push('actions');
    }
    console.log('Esto me lleva el booleano', this.esGerente)
  }

  async Listado(){
    this.viajeServices.Listado().then(
      (data : any)=>{
        this.data = data;
        console.log('La data que me trae es', data)
      }, 

      error =>{
        console.log('El error es', error)
      }
    )
  }

  editUser (user: any) {
    console.log('Editar usuario:', user);
  }


  deleteUser (user: any) {
    console.log('Eliminar usuario:', user);
  }


  viewDetails(user: any) {
    this.router.navigate(['/admin/viajesReportes']);

  }

  crearSucursal(){
    this.router.navigate(['/admin/viajesCrear']);
  }

}
