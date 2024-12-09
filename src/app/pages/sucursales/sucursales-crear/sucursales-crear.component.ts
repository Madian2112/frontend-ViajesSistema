import { Component, OnInit, ViewChild, ElementRef, NgZone, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog } from '@angular/material/dialog';
import {environment } from '../../../../../enviroment';
import {SucursalService} from '../../../services/sucursal.service'
import { Router } from '@angular/router'; 

declare var google: any;

@Component({
  selector: 'app-sucursales-crear',
  templateUrl: './sucursales-crear.component.html',
  styleUrls: ['./sucursales-crear.component.css']
})
export class SucursalesCrearComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @ViewChild('mapSearchBox') mapSearchBox!: ElementRef;

  branchForm: FormGroup;
  map: any;
  geocoder: any;
  marker: any = null;
  autocomplete: any;

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,  
    private sucursalService: SucursalService,
    private router :Router,
  ) {
    this.branchForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      country: [''],
      state: [''],
      city: [''],
      latitude: [''],  // Latitud
      longitude: [''],
      direccion2:[''],
    });
  }

  ngOnInit() {
    this.loadGoogleMapsScript();
  }

  async Listado(){
    this.sucursalService.Listado().then(
      (data : any)=>{
        console.log('La data que me trae es', data)
      }, 

      error =>{
        console.log('El error es', error)
      }
    )
  }
  
  loadGoogleMapsScript() {
      const script = window.document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => this.initMap();
      window.document.body.appendChild(script);
  }  
  
  initMap() {
    this.geocoder = new google.maps.Geocoder();
    const mapOptions = {
      center: { lat: 0, lng: 0 }, // Coordenadas por defecto
      zoom: 2
    };
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

    // Listener para hacer clic en el mapa
    this.map.addListener('click', (event: any) => {
      this.ngZone.run(() => {
        // Si ya hay un marcador, lo eliminamos
        if (this.marker) {
          this.marker.setMap(null);
        }
        // Agregar marcador en la ubicación seleccionada
        this.addMarker(event.latLng);
        this.updateLocationDetails(event.latLng);
      });
    });
  }

  addMarker(latLng: any) {
    // Crear marcador en la ubicación del clic
    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'Ubicación seleccionada'
    });
  }
  
  updateLocationDetails(latLng: any) {
    this.geocoder.geocode({ location: latLng }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.ngZone.run(() => {
            this.branchForm.patchValue({
              address: results[0].formatted_address,
              latitude: latLng.lat(),
              longitude: latLng.lng()
            });
            for (let component of results[0].address_components) {
              if (component.types.includes('country')) {
                this.branchForm.patchValue({ country: component.long_name });
              }
              if (component.types.includes('administrative_area_level_1')) {
                this.branchForm.patchValue({ state: component.long_name });
              }
              if (component.types.includes('locality')) {
                this.branchForm.patchValue({ city: component.long_name });
              }
            }
          });
        }
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  geocodeAddress() {
    let address = this.branchForm.value.direccion2;
    
    let adrresSplit = address.split(",")
    let ciudad = adrresSplit[0].trim() || 'San Pedro Sula'
    let departamento = adrresSplit[1].trim() || 'Cortes'
    let pais = adrresSplit[2].trim() || 'Honduras'
    
    // Construir una dirección completa
    address =  `${ciudad}, ${departamento}, ${pais}`.trim();
  
    // Configurar la geocodificación
    this.geocoder.geocode({ 
      address: address, 
      region: 'hn' // Especifica la región (Honduras)
    }, (results: any, status: any) => {
      if (status === 'OK' && results.length > 0) {
        // Obtener el mejor resultado
        const result = results[0];
  
        // Obtener latitud y longitud
        const latLng = result.geometry.location;
        const lat = latLng.lat();
        const lng = latLng.lng();
  
        console.log('Dirección consultada:', address);
        console.log('Resultado de la geocodificación:', results);
  
        // Actualizar el formulario
        this.branchForm.patchValue({
          address: result.formatted_address, // Usar la dirección formateada del resultado
          latitude: lat,
          longitude: lng
        });
  
        // Extraer país, estado y ciudad
        for (let component of result.address_components) {
          if (component.types.includes('country')) {
            this.branchForm.patchValue({ country: component.long_name });
          }
          if (component.types.includes('administrative_area_level_1')) {
            this.branchForm.patchValue({ state: component.long_name });
          }
          if (component.types.includes('locality') || component.types.includes('sublocality')) {
            this.branchForm.patchValue({ city: component.long_name });
          }
        }
  
        // Centrar el mapa
        this.map.setCenter(latLng);
  
        // Colocar el marcador
        if (this.marker) {
          this.marker.setMap(null);
        }
        this.marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: 'Ubicación seleccionada'
        });
      } else {
        console.error('Geocodificación fallida debido a: ' + status);
      }
    });
  }
  


  reverseGeocode() {

    let lat = this.branchForm.value.lat2;
    let lng =this.branchForm.value.lng2;

    const latLng = new google.maps.LatLng(lat, lng);
    
    this.geocoder.geocode({ location: latLng }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          // Actualizar los campos del formulario
          this.branchForm.patchValue({
            address: results[0].formatted_address,
            latitude: lat,
            longitude: lng
          });
  
          // Extraer país, estado y ciudad
          for (let component of results[0].address_components) {
            if (component.types.includes('country')) {
              this.branchForm.patchValue({ country: component.long_name });
            }
            if (component.types.includes('administrative_area_level_1')) {
              this.branchForm.patchValue({ state: component.long_name });
            }
            if (component.types.includes('locality')) {
              this.branchForm.patchValue({ city: component.long_name });
            }
          }
  
          // Centrar el mapa en la latitud y longitud obtenida
          this.map.setCenter(latLng);
  
          // Colocar el marcador en la nueva ubicación
          if (this.marker) {
            this.marker.setMap(null);
          }
          this.marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            title: 'Ubicación seleccionada'
          });
        }
      } else {
        console.error('Geocodificación inversa fallida debido a: ' + status);
      }
    });
  }
  
  
  
  
  async onSubmit() {

    if (this.branchForm.valid) {

      let modelo : any = {
        sucu_Nombre : this.branchForm.value.name,
        sucu_Latitud : this.branchForm.value.latitude.toString(),
        sucu_Longitud : this.branchForm.value.longitude.toString()
        }

        console.log('Este es el modeloque mando', modelo)

      await this.sucursalService.Crear(modelo).then(
        (res: any) =>{
          console.log('Esta es la respuesta', res)
        }, 
        error =>{
          console.log('Este es error', error)
        }
      )

      this.branchForm.reset();

    }
  }

  onCancel() {
    this.router.navigate(['/admin/sucursales']);
  }

  sucursalesColaboradores(){
    this.router.navigate(['/admin/sucursalesColaboradores']);
  }
}
