import { Component, OnInit, Inject } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  opciones: MegaMenuItem[] = [];
  constructor(@Inject(DOCUMENT) private document: Document) { }
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
  }

  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
}
