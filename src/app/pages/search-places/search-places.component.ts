import { Component, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import { Subject, takeUntil } from 'rxjs';
import { ParkingService } from 'src/app/core/services/parking.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ParkingLot, ParkingSpace } from 'src/app/core/models/parqueapp';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomHandler } from 'primeng/dom';
import { Vehicle } from '../../core/models/parqueapp';
import { Router } from '@angular/router';
import { DateFormatPipe } from '../../core/pipes/date-format.pipe';
import { HourFormatPipe } from '../../core/pipes/hour-format.pipe';

@Component({
  selector: 'app-search-places',
  templateUrl: './search-places.component.html',
  styleUrls: ['./search-places.component.scss'],
  providers: [DateFormatPipe, HourFormatPipe]
})
export class SearchPlacesComponent {
  private unsubscribe$ = new Subject<void>();
  public parqueaderos: any;
  public listaPlazas: any = [];
  public mapCity: any;

  public displayModalRegistro = false;
  public displayModalPlazas = false;
  public reservaForm: any = FormGroup;
  public reservaFiltrosForm: any = FormGroup;
  public plazaSeleccionada: any = {};
  public listaVehiculos: any = [];
  public selectedVehicleType: any;
  public objetoReserva: any;

  public displayModalFiltros = false;
  public camposFiltros = {
    horaFilterEntrada: '',
    horaFilterCierre: '',
    montoMinimo: '',
    montoMaximo: ''
  };

  // Topes de fechas
  minDate: Date;
  maxDate: Date;
  minHour: any;
  minHourSalida: any;

  constructor(
    private parkingService: ParkingService,
    private messageService: MessageService,
    private elementRef: ElementRef,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private datePipe: DateFormatPipe,
    private hourPipe: HourFormatPipe
  ) {
      this.minDate = new Date();
      this.maxDate = new Date();
  }

  ngOnInit(): void {
    //this.getParkingLots();
    this.topesFechas();
    this.crearFormulario();    
    this.crearFormularioFiltros();
    this.getAllVehiclesByCustomerId();    
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

  crearFormularioFiltros() {
    this.reservaFiltrosForm = this.formBuilder.group({
      horaFilterEntrada: [''],
      horaFilterCierre: [''],
      montoMinimo: [''],
      montoMaximo: [''],
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

  topesFechas(){   
    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    this.minDate = today;
    this.maxDate = tomorrow;    
  }

  getAllVehiclesByCustomerId(){
    this.parkingService
    .getAllVehiclesByCustomerId(1)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (resp: ParkingLot) => {
        if (!resp) {
          this.show('error', 'Error', 'No se encontraron parqueaderos');
        }
        this.listaVehiculos = resp;
        //this.showCityMap();
      },
      (err) => {
        this.show('error', 'Error', err.message);
      }
    );
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
          this.reservaForm.get('horaEntrada').disable();
          this.reservaForm.get('horaSalida').disable();
          
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
    this.parkingService
    .getParkingLotsByParkingSpaceType(this.selectedVehicleType.type)
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

  validateDate(){    
      this.reservaForm.get('horaEntrada').enable();
      
  }

  validateTime(){
    this.reservaForm.get('horaSalida').enable(); 
  }

  redirectToDashboard() {
    if(!this.reservaForm.get('placa').value){
      this.router.navigate(['/dashboard']);
    } 
   
  }

  mostrarModalRegistro() {
    this.displayModalRegistro = true;
  }

  crearObjetoReserva(){
    //http://localhost:8080/parking-space/reserveParkingSpace/1/1/moto/2023-05-07/10:30/13:30
    //parking_lot_id: any, id_vehicle: any, type_vehicle: any, date_reserve: any, start_time: any, end_time: any,
    this.objetoReserva = {
      parking_lot_id: this.plazaSeleccionada.id,
      id_vehicle: this.selectedVehicleType.id,
      type_vehicle: this.selectedVehicleType.type,
      date_reserve: this.datePipe.transform(this.reservaForm.get('fechaReserva').value),
      start_time: this.hourPipe.transform(this.reservaForm.get('horaEntrada').value),
      end_time: this.hourPipe.transform(this.reservaForm.get('horaSalida').value),
    };    
    this.realizarRegistro();
  }

  realizarRegistro() {
    
    this.parkingService
    .reserveParkingSpace(this.objetoReserva.parking_lot_id, this.objetoReserva.id_vehicle,
                          this.objetoReserva.type_vehicle, this.objetoReserva.date_reserve,
                          this.objetoReserva.start_time, this.objetoReserva.end_time)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (resp: any) => {
        this.show('success', 'Reservado', 'Reserva realizada con exito');       
      },
      (err) => {
        this.show('error', 'Error Reserva', err.message);
      }
    );
    this.displayModalRegistro = false; // Cerrar el diálogo
  }

  cancelarReserva() {
    this.displayModalRegistro = false;
  }

  assignEntryDate($event: any){
    this.camposFiltros.horaFilterEntrada = this.hourPipe.transform($event);
  }

  assignExitDate($event: any){
    this.camposFiltros.horaFilterCierre = this.hourPipe.transform($event);
  }

  assignMinimumAmount($event: any){
    this.camposFiltros.montoMinimo = $event.value;
  }

  assignMaximumAmount($event: any){   
    this.camposFiltros.montoMaximo = $event.value;
  }

  sendFilter(){
    this.camposFiltros.montoMinimo = this.reservaFiltrosForm.get('montoMinimo').value;
    this.camposFiltros.montoMaximo = this.reservaFiltrosForm.get('montoMaximo').value;
    console.log('send', this.reservaFiltrosForm);  
  }

  openFilterModal(){
    this.displayModalFiltros = true;
  }

  closeFilterModal(){
    this.displayModalFiltros = false;
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

  get horaFilterEntrada(){
    return this.reservaFiltrosForm.get('horaFilterEntrada');
  }
  get horaFilterCierre(){
    return this.reservaFiltrosForm.get('horaFilterCierre');
  }
  get montoMinimo(){
    return this.reservaFiltrosForm.get('montoMinimo');
  }
  get montoMaximo(){
    return this.reservaFiltrosForm.get('montoMaximo');
  }
  
}
