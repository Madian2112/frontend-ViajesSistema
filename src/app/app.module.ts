import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// dashboard components
import { LayoutComponent } from './dashboard/layout/layout.component';
import { TopBarComponent } from './dashboard/top-bar/top-bar.component';
import { OverlayComponent } from './dashboard/overlay/overlay.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar/sidebar.component';
import { SidebarItemComponent } from './dashboard/sidebar/sidebar-item/sidebar-item.component';
import { SidebarItemsComponent } from './dashboard/sidebar/sidebar-items/sidebar-items.component';
import { SidebarHeaderComponent } from './dashboard/sidebar/sidebar-header/sidebar-header.component';
import { SidebarItemSectionComponent } from './dashboard/sidebar/sidebar-item-section/sidebar-item-section.component';

// pages
import { HomeComponent } from './pages/home/home.component';
import { MediaComponent } from './pages/media/media.component';
import { ServerComponent } from './pages/server/server.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TerminalComponent } from './pages/terminal/terminal.component';
import { RecycleBinComponent } from './pages/recycle-bin/recycle-bin.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';

// icons
import { DocIconComponent } from './dashboard/icons/doc-icon/doc-icon.component';
import { UserIconComponent } from './dashboard/icons/user-icon/user-icon.component';
import { MediaIconComponent } from './dashboard/icons/media-icon/media-icon.component';
import { ServerIconComponent } from './dashboard/icons/server-icon/server-icon.component';
import { ContactIconComponent } from './dashboard/icons/contact-icon/contact-icon.component';
import { TerminalIconComponent } from './dashboard/icons/terminal-icon/terminal-icon.component';
import { RecycleBinIconComponent } from './dashboard/icons/recycle-bin-icon/recycle-bin-icon.component';

// others
import { DocComponent } from './components/docs/doc/doc.component';
import { ContentComponent } from './components/content/content.component';
import { SnippetComponent } from './components/docs/snippet/snippet.component';
import { FolderIconComponent } from './components/docs/icons/folder-icon/folder-icon.component';
import { AngularIconComponent } from './components/docs/icons/angular-icon/angular-icon.component';
import { SucursalesIndexComponent } from './pages/sucursales/sucursales-index/sucursales-index.component';
import { SucursalesCrearComponent } from './pages/sucursales/sucursales-crear/sucursales-crear.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Para [formGroup] y formControlName
import { CommonModule } from '@angular/common';// Para *ngIf
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { SucursalesColaboradoresComponent } from './pages/sucursales/sucursales-colaboradores/sucursales-colaboradores.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { ColaboradoresIndexComponent } from './pages/colaboradores/colaboradores-index/colaboradores-index.component';
import { ColaboradoresCrearComponent } from './pages/colaboradores/colaboradores-crear/colaboradores-crear.component';
import { ViajesIndexComponent } from './pages/viajes/viajes-index/viajes-index.component';
import { ViajesCrearComponent } from './pages/viajes/viajes-crear/viajes-crear.component';
import { LoginComponent } from './auth/login/login.component';

import { CookieService } from 'ngx-cookie-service';
import { TarifasIndexComponent } from './pages/tarifas/tarifas-index/tarifas-index.component';
import { TarifasEditarComponent } from './pages/tarifas/tarifas-editar/tarifas-editar.component';
import { DatePipe } from '@angular/common';
import { ViajesReportesComponent } from './pages/viajes/viajes-reportes/viajes-reportes.component';  // Asegúrate de importar DatePipe
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,

    // dashboard
    LayoutComponent,
    TopBarComponent,
    OverlayComponent,
    SidebarComponent,
    SidebarItemComponent,
    SidebarItemsComponent,
    SidebarHeaderComponent,
    SidebarItemSectionComponent,

    // pages
    HomeComponent,
    MediaComponent,
    ServerComponent,
    ContactComponent,
    TerminalComponent,
    RecycleBinComponent,
    DocumentationComponent,

    // icons
    DocIconComponent,
    UserIconComponent,
    MediaIconComponent,
    ServerIconComponent,
    ContactIconComponent,
    TerminalIconComponent,
    RecycleBinIconComponent,

    // others
    DocComponent,
    SnippetComponent,
    ContentComponent,
    FolderIconComponent,
    AngularIconComponent,
    SucursalesIndexComponent,
    SucursalesCrearComponent,
    SucursalesColaboradoresComponent,
    ColaboradoresIndexComponent,
    ColaboradoresCrearComponent,
    ViajesIndexComponent,
    ViajesCrearComponent,
    LoginComponent,
    TarifasIndexComponent,
    TarifasEditarComponent,
    ViajesReportesComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCheckboxModule,
    PdfViewerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
