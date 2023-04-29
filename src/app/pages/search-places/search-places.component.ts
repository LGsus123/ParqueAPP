import { Component } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';
import { Subject, takeUntil } from 'rxjs';
import { ParkingService } from 'src/app/core/services/parking.service';
import { MessageService } from 'primeng/api';
import { ParkingLot } from 'src/app/core/models/parqueapp';

@Component({
  selector: 'app-search-places',
  templateUrl: './search-places.component.html',
  styleUrls: ['./search-places.component.scss'],
})
export class SearchPlacesComponent {
  private unsubscribe$ = new Subject<void>();
  public parqueaderos: any;
  public mapCity: any;

  constructor(
    private parkingService: ParkingService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getParkingLots();
  }

  getParkingLots() {
    this.parkingService
      .obtenerLoterias()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (resp: ParkingLot) => {
          console.log('consumiendo vixxxio', resp);
          if (!resp) {
            this.show('error', 'Error', 'No se encontrarons parqueaderos');
          }
          this.parqueaderos = resp;          
            this.showCityMap(this.mapCity);
         
        },
        (err) => {
          this.show('error', 'Error', err.message);
        }
      );
  }

  /**
    success
    info
    warn
    error
  */
  show(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  ngAfterViewInit(): void {
    this.mapCity = new Map('map').setView([3.44898, -76.52781], 13);
    tileLayer(
      'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
      {
        maxZoom: 20,
        attribution:
          '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(this.mapCity );

    //this.showCityMap(this.mapCity );
  }

  showCityMap(map: any) {  
    console.log('parkes', this.parqueaderos);
    
    this.parqueaderos.forEach((item: any) => {
      marker([item.latitude, item.longitude]).addTo(map).bindTooltip(item.name);
    });
      
    
    //const markerItem = marker([lat, lng]).addTo(map).bindTooltip('a ver');
    // map.fitBounds([[markerItem.getLatLng().lat, markerItem.getLatLng().lng]]);
  }
  
}
