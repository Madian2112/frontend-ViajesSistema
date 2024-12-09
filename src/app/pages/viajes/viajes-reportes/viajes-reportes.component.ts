import { Component , OnInit, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import Chart from 'chart.js/auto';
import autoTable from 'jspdf-autotable';
import {ViajesService} from '../../../services/viajes.service'
import {SucursalService} from '../../../services/sucursal.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { DatePipe } from '@angular/common';


interface Viaje {
  viaj_Id: number;
  viaj_Fecha: string;
  viaj_Tarifa: number;
  cola_Id: number;
  transportista: string;
  sucu_Id: number;
  sucu_Nombre: string;
  usua_Id: number;
  usua_Usuario: string;
  viaj_TotalTarifa: number;
}

interface ViajeDetalle {
  vide_Id: number;
  viaj_Id: number;
  cola_Id: number;
  vide_DistanciaKM: number;
  colaborador: string 
}

@Component({
  selector: 'app-viajes-reportes',
  templateUrl: './viajes-reportes.component.html',
  styleUrls: ['./viajes-reportes.component.css']
})
export class ViajesReportesComponent  {
  pdfSrc: string | null = null;
  sucursalDDL: any;
  reporteForm!: FormGroup;
  viajesData: any
  viajesDetalleData: ViajeDetalle [] = []


  constructor(
              private sucursalService: SucursalService,
              private viajesService : ViajesService,
              private fb: FormBuilder,
              private router :Router,
              private datePipe: DatePipe,
  ) {
    this.reporteForm = this.fb.group({
      inicio_Fecha: ['', Validators.required],
      final_Fecha: ['', Validators.required],
      sucursal: [""],
    });
  }

  async ngOnInit() {

    await this.viajesService.Listado().then(
      (data : any) =>{
        this.viajesData = data
        console.log('Cantidad de viajes', data)
      }
    )

    await this.viajesService.ListadoViajesDetalles().then(
      (data : ViajeDetalle[]) =>{
        this.viajesDetalleData = data
      }
    )

    await this.sucursalService.Listado().then(
      (data: any) =>{
        this.sucursalDDL = data
      }
    )
  }

  // getViajesData(): Viaje[] {
  //   // Simulación de datos de tbViajes
  //   return [
  //     { viaj_Id: 1, viaj_Fecha: '2023-05-01', viaj_Tarifa: 100, cola_Id: 1, sucu_Id: 1, usua_Id: 1, viaj_TotalTarifa: 2 },
  //     { viaj_Id: 2, viaj_Fecha: '2023-05-02', viaj_Tarifa: 150, cola_Id: 2, sucu_Id: 1, usua_Id: 2, viaj_TotalTarifa: 3 }
  //   ];
  // }

  // getViajesDetallesData(): ViajeDetalle[] {
  //   // Simulación de datos de tbViajesDetalles
  //   return [
  //     { vide_Id: 1, viaj_Id: 1, cola_Id: 1, vide_DistanciaKM: 10 },
  //     { vide_Id: 2, viaj_Id: 1, cola_Id: 1, vide_DistanciaKM: 15 },
  //     { vide_Id: 3, viaj_Id: 1, cola_Id: 1, vide_DistanciaKM: 20 },
  //     { vide_Id: 4, viaj_Id: 1, cola_Id: 1, vide_DistanciaKM: 25 },
  //     { vide_Id: 5, viaj_Id: 1, cola_Id: 1, vide_DistanciaKM: 30 },
  //     { vide_Id: 6, viaj_Id: 2, cola_Id: 2, vide_DistanciaKM: 12 },
  //     { vide_Id: 7, viaj_Id: 2, cola_Id: 2, vide_DistanciaKM: 18 },
  //     { vide_Id: 8, viaj_Id: 2, cola_Id: 2, vide_DistanciaKM: 22 },
  //     { vide_Id: 9, viaj_Id: 2, cola_Id: 2, vide_DistanciaKM: 28 },
  //     { vide_Id: 10, viaj_Id: 2, cola_Id: 2, vide_DistanciaKM: 35 }
  //   ];
  // }

  generatePDF() {

    let fecha_Inicio = this.datePipe.transform(this.reporteForm.value.inicio_Fecha, 'yyyy-MM-dd') || '';
    let fecha_Final = this.datePipe.transform(this.reporteForm.value.final_Fecha, 'yyyy-MM-dd') || '';
    let sucu_id = this.reporteForm.value.sucursal;
  
    const viajesFiltrados: Viaje[] = this.viajesData.filter((viaje: any) => {
      // Convertir `viaj_Fecha` al formato 'yyyy-MM-dd' si es necesario
      const fechaViaje = this.datePipe.transform(viaje.viaj_Fecha, 'yyyy-MM-dd') || '';
  
      // Validar que `fechaViaje` esté en el rango y que `sucu_Id` coincida
      return (
        viaje.sucu_Id == sucu_id &&
        fechaViaje >= fecha_Inicio &&
        fechaViaje <= fecha_Final
      );
    });
  
    console.log('Datos filtrados:', viajesFiltrados);

    console.log('Este es el valor del formulario: ', this.reporteForm.value.sucursal, fecha_Inicio, fecha_Final)

    const doc = new jsPDF();
    const viajes = viajesFiltrados;
    const viajesDetalles = this.viajesDetalleData;
    let yOffset = 15;
    let totalGeneral = 0;

    doc.setFontSize(18);
    doc.text('Reporte de Viajes', 105, yOffset, { align: 'center' });
    yOffset += 10;

    const tableData: any[][] = [];
    viajes.forEach(viaje => {
      const viajeDetalles = viajesDetalles.filter(detalle => detalle.viaj_Id === viaje.viaj_Id);
      
      // Agregar el encabezado antes de cada viaje
      tableData.push([{
        content: 'Fecha',
        styles: { fillColor: [100, 100, 100], textColor: [255, 255, 255], fontStyle: 'bold', halign: 'center' }
      }, {
        content: 'Tarifa por KM',
        styles: { fillColor: [100, 100, 100], textColor: [255, 255, 255], fontStyle: 'bold', halign: 'center' }
      }, {
        content: 'Transportista',
        styles: { fillColor: [100, 100, 100], textColor: [255, 255, 255], fontStyle: 'bold', halign: 'center' }
      }, {
        content: 'Sucursal',
        styles: { fillColor: [100, 100, 100], textColor: [255, 255, 255], fontStyle: 'bold', halign: 'center' }
      }, {
        content: 'Creado por',
        styles: { fillColor: [100, 100, 100], textColor: [255, 255, 255], fontStyle: 'bold', halign: 'center' }
      }, {
        content: 'Total km',
        styles: { fillColor: [100, 100, 100], textColor: [255, 255, 255], fontStyle: 'bold', halign: 'center' }
      }]);
      
      // // Encabezado del viaje
      // tableData.push([{
      //   content: `Viaje ID: ${viaje.viaj_Id}`,
      //   colSpan: 5,
      //   styles: { fontStyle: 'bold', fillColor: [200, 200, 200] }
      // }]);

      // Información del viaje
      tableData.push([
        viaje.viaj_Fecha,
        `${viaje.viaj_Tarifa} Lps`,
        `${viaje.transportista}`,
        ` ${viaje.sucu_Nombre}`,
        ` ${viaje.usua_Usuario}`,
        `${viaje.viaj_TotalTarifa}`
      ]);
      
      // Encabezado de detalles
      tableData.push([{
        content: 'Detalles del Viaje',
        colSpan: 6,
        styles: { fontStyle: 'bold', fillColor: [220, 220, 220] }
      }]);

      // Detalles del viaje
      viajeDetalles.forEach(detalle => {
        tableData.push([
          `Colaborador: ${detalle.colaborador}`,
          `KM: ${detalle.vide_DistanciaKM} KM`,
          '',
          '',
          '',
          ''
        ]);
      });
      
      // Subtotal del viaje
      const subtotal = viaje.viaj_Tarifa * viaje.viaj_TotalTarifa;
      totalGeneral += subtotal;
      tableData.push([{
        content: `Subtotal del viaje: ${subtotal.toFixed(2)} Lps`,
        colSpan: 5,
        styles: { fontStyle: 'bold', fillColor: [240, 240, 240] }
      }]);
      
      // Espacio entre viajes
      tableData.push([{ content: '', colSpan: 5 }]);
    });

    // Configuración de la tabla
    autoTable(doc, {
      startY: yOffset,
      body: tableData,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: 'linebreak',
        cellWidth: 'wrap'
      },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 'auto' },
        3: { cellWidth: 'auto' },
        4: { cellWidth: 'auto' }
      }
    });

    // Total general
    const finalY = (doc as any).lastAutoTable.finalY || yOffset;
    doc.setFontSize(12);
    doc.text(`Total General: ${totalGeneral.toFixed(2)} Lps`, 15, finalY + 10);

    this.pdfSrc = doc.output('datauristring');
}

  downloadPDF() {
    if (this.pdfSrc) {
      const link = document.createElement('a');
      link.href = this.pdfSrc;
      link.download = 'reporte_viajes.pdf';
      link.click();
    }
  }

  onCancel(){
    this.router.navigate(['/admin/viajes']);
  }
}
