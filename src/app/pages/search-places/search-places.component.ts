import { Component, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import { Subject, takeUntil } from 'rxjs';
import { ParkingService } from 'src/app/core/services/parking.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ParkingLot, ParkingSpace } from 'src/app/core/models/parqueapp';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomHandler } from 'primeng/dom';
import { Vehicle } from '../../core/models/parqueapp';

@Component({
  selector: 'app-search-places',
  templateUrl: './search-places.component.html',
  styleUrls: ['./search-places.component.scss'],
})
export class SearchPlacesComponent {
  private unsubscribe$ = new Subject<void>();
  public parqueaderos: any;
  public listaPlazas: any = [];
  public mapCity: any;

  public displayModalRegistro = false;
  public displayModalPlazas = false;
  public reservaForm: any = FormGroup;
  public plazaSeleccionada: any = {};
  public listaVehiculos: any = [];
  public selectedVehicleType: any;

  constructor(
    private parkingService: ParkingService,
    private messageService: MessageService,
    private elementRef: ElementRef,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    //this.getParkingLots();
    this.crearFormulario();
    this.listaVehiculos = [
      {
        id: 1,
        plate: 'ICQ40D',
        type: 'Moto',
      },
      {
        id: 2,
        plate: 'JBG23F',
        type: 'Carro',
      },
      {
        id: 3,
        plate: 'NPM16R',
        type: 'Carro',
      },
    ];

    this.openPlatesModal();
  }

  openPlatesModal() {
    this.displayModalPlazas = true;
  }

  closePlatesModal() {
    this.displayModalPlazas = false;
  }

  crearFormulario() {
    this.reservaForm = this.formBuilder.group({
      placa: ['', Validators.required],
      fechaReserva: ['', Validators.required],
      horaEntrada: ['', Validators.required],
      horaSalida: ['', Validators.required],
    });
  }

  

  /**
   * Inicia las ventanas de confirmacion, tiene las siguientes modalidades
   * success
   * info
   * warn
   * error
   */
  show(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  ngAfterViewInit(): void {
    this.mapCity = new L.Map('map').setView([3.44898, -76.52781], 15);
    L.tileLayer(
      'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
      {
        maxZoom: 20,
        attribution:
          '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(this.mapCity);

    //this.showCityMap(this.mapCity );
  }

  getParkingLots() {
    this.parkingService
      .getAllParkingLots()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (resp: ParkingLot) => {
          if (!resp) {
            this.show('error', 'Error', 'No se encontraron parqueaderos');
          }
          this.parqueaderos = resp;
          //this.showCityMap();
        },
        (err) => {
          this.show('error', 'Error', err.message);
        }
      );
  }

  showCityMap() {
    this.parqueaderos.forEach((item: any) => {
      const popupOptions = {
        className: 'customPopup test2',
      };
      const popupInfo = `
      <p class="popup__header"> <strong> ${item.name} </strong> <br> 
      <div class="separator-1">Dirección: ${item.address}</div>
      <div class="separator-1">Horario de atención: ${item.start_date} - ${item.end_date}</div>
      <button type="button" id="sendData" class="edit btn btn-warning btn-sm btn-block dataModal sendData" data-toggle="modal" data-target="#dataModal">Reservar</button> </p>`;
      const marker: L.Marker = L.marker([item.latitude, item.longitude])
        .addTo(this.mapCity)
        .bindTooltip(item.name)
        .bindPopup(popupInfo, popupOptions)
        .on('popupopen', () => {
          this.elementRef.nativeElement
            .querySelector('.edit')
            .addEventListener('click', (e: any) => {
              this.reservar(item.id);
            });
        });
    });
  }

  
  reservar(id: number) {
    this.parkingService
      .getAllParkingSpaces(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (resp: ParkingSpace) => {
          this.reservaForm.get('placa').setValue(this.selectedVehicleType);
          this.reservaForm.get('placa').disable();
          
          if (!resp) {
            this.show('error', 'Error', 'No se encontraron plazas disponibles');
          } else{
            this.listaPlazas = resp;
            this.mostarPlazasDisponibles(id);  
          }
        },
        (err) => {
          this.show('error', 'Error', err.message);
        }
      );
  }

  mostrarPlazasDisponiblesPlaca(vehicle: Vehicle): void {  
    this.selectedVehicleType = vehicle;
    /**
     * Se debe cambiar por la api donde consulta los parqueaderos con ese tipo de plazas disponibles  
     * Se envia el tipo de vehiculo y se espera la lista
     * @param tipoVehiculo = this.selectedVehicleType.type
     * */
    this.parkingService
    .getAllParkingLots()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (resp: ParkingLot) => {
        if (!resp) {
          this.show('error', 'Error', 'No se encontraron parqueaderos');
        } else{
        this.parqueaderos = resp;
        this.showCityMap();
        this.show('success', 'Bienvenido', 'Se mostraran los parqueaderos con plazas disponibles para ' + this.selectedVehicleType.type);
        this.closePlatesModal();
        }      
      },
      (err) => {
        this.show('error', 'Error', err.message);
      }
    );
  }

  mostarPlazasDisponibles(id: number) {
    this.plazaSeleccionada = this.parqueaderos.find((x: any) => x.id === id);
    this.mostrarModalRegistro();
    
    return;
    this.displayModalPlazas = true;
    let parkingSelect = this.parqueaderos.find((x: any) => x.id === id);
    let placesAvailable = this.listaPlazas.length;
    this.confirmationService.confirm({
      key: 'plazas-disponibles',
      message: `El parqueadero <b>${parkingSelect.name}</b> tiene ${placesAvailable} plazas disponibles, desea reservar?`,
      accept: () => {
        this.mostrarModalRegistro();
      },
      reject: () => {
        // Lógica si se presiona cancelar
      },
    });
  }

  mostrarModalRegistro() {
    this.displayModalRegistro = true;
  }

  realizarRegistro() {
    // Lógica para guardar la reserva
    this.displayModalRegistro = false; // Cerrar el diálogo
  }

  cancelarReserva() {
    this.displayModalRegistro = false;
  }

  get placa() {
    return this.reservaForm.get('placa');
  }
  
  get fechaReserva() {
    return this.reservaForm.get('fechaReserva');
  }
  
  get horaEntrada() {
    return this.reservaForm.get('horaEntrada');
  }
  
  get horaSalida() {
    return this.reservaForm.get('horaSalida');
  }
  
}
