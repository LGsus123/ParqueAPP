import { Component, ElementRef, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { SessionService } from 'src/app/core/services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Ng-Prime';
  showLoader: boolean = false;
  theme: string = '';

  constructor(private elementRef: ElementRef,
    public  _router: Router) {

   
  }

  ngOnInit() {
   
  }


}