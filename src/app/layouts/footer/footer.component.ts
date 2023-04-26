import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private primengConfig: PrimeNGConfig) {}
  fullYear: any;
  version: string = '';

  ngOnInit() {
  this.fullYear = new Date().getFullYear();
  this.version = environment.version;
  }

  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
 
}
