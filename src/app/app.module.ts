import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { MegaMenuModule } from 'primeng/megamenu';
import { DialogModule } from "primeng/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';

import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SearchPlacesComponent } from './pages/search-places/search-places.component';
import { DetailParkingComponent } from './pages/detail-parking/detail-parking.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { ManagementReservationComponent } from './pages/management-reservation/management-reservation.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    SearchPlacesComponent,
    DetailParkingComponent,
    ReservationComponent,
    ManagementReservationComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    MenuModule,
    ToastModule,
    MegaMenuModule,
    DialogModule,
    BrowserAnimationsModule,
    CardModule,
    MessagesModule,
    ChartModule,
    ProgressSpinnerModule,
    HttpClientModule,
    ConfirmDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    MessageService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
