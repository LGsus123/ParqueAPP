import { Component, OnInit, Inject } from '@angular/core';
import { MegaMenuItem, MessageService } from 'primeng/api';
import { DOCUMENT } from '@angular/common';
import { ParkingService } from 'src/app/core/services/parking.service';
import { Subject, takeUntil } from 'rxjs';
import { Customer } from 'src/app/core/models/parqueapp';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private unsubscribe$ = new Subject<void>();

  opciones: MegaMenuItem[] = [];
  cliente: any;
  constructor(@Inject(DOCUMENT) private document: Document,
              private parkingService: ParkingService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.opciones = [      
      {
        label: 'Home',
        routerLink: '/dashboard'
      },
      {
        label: 'Reservas',
        routerLink: '/reservation'
      },
      {
        label: 'Buscar',
        routerLink: '/search'
      },
      {
        label: 'Administrar reservas',
        routerLink: '/management-reservation'
      }  
    ];
    this.getCustomerById();
  }

  show(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  getCustomerById(){
    this.parkingService
    .getCustomerById(1)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (resp: Customer) => {
        if (!resp) {
          this.show('error', 'Error', 'No se encontraron parqueaderos');
        }
        this.cliente = resp;
        //this.showCityMap();
      },
      (err) => {
        this.show('error', 'Error', err.message);
      }
    );
  }

  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
}
