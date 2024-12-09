import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { MediaComponent } from './pages/media/media.component';
import { ServerComponent } from './pages/server/server.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TerminalComponent } from './pages/terminal/terminal.component';
import { RecycleBinComponent } from './pages/recycle-bin/recycle-bin.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';
import { SucursalesIndexComponent } from './pages/sucursales/sucursales-index/sucursales-index.component';
import { SucursalesCrearComponent } from './pages/sucursales/sucursales-crear/sucursales-crear.component';
import { SucursalesColaboradoresComponent } from './pages/sucursales/sucursales-colaboradores/sucursales-colaboradores.component';
import { ColaboradoresIndexComponent } from './pages/colaboradores/colaboradores-index/colaboradores-index.component';
import { ColaboradoresCrearComponent } from './pages/colaboradores/colaboradores-crear/colaboradores-crear.component';
import { ViajesIndexComponent } from './pages/viajes/viajes-index/viajes-index.component';
import { ViajesCrearComponent } from './pages/viajes/viajes-crear/viajes-crear.component';
import { ViajesReportesComponent } from './pages/viajes/viajes-reportes/viajes-reportes.component';
import { TarifasIndexComponent } from './pages/tarifas/tarifas-index/tarifas-index.component';
import { TarifasEditarComponent } from './pages/tarifas/tarifas-editar/tarifas-editar.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin/medias', component: MediaComponent },
  { path: 'admin/contacts', component: ContactComponent },
  { path: 'admin/terminal', component: TerminalComponent },
  { path: 'admin/recycle-bin', component: RecycleBinComponent },
  { path: 'admin/servers', component: ServerComponent },
  { path: 'admin/documentation', component: DocumentationComponent },

  { path: 'admin/sucursales', component: SucursalesIndexComponent },
  { path: 'admin/sucursalesCrear', component: SucursalesCrearComponent },
  { path: 'admin/sucursalesColaboradores', component: SucursalesColaboradoresComponent },

  { path: 'admin/colaboradores', component: ColaboradoresIndexComponent },
  { path: 'admin/colaboradoresCrear', component: ColaboradoresCrearComponent },

  { path: 'admin/viajes', component: ViajesIndexComponent },
  { path: 'admin/viajesCrear', component: ViajesCrearComponent },
  { path: 'admin/viajesReportes', component: ViajesReportesComponent },

  { path: 'admin/tarifas', component: TarifasIndexComponent },
  { path: 'admin/tarifasEditar/:tari_Id/:tari_Tarifa', component: TarifasEditarComponent },


  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' } ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
