import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetailParkingComponent } from './pages/detail-parking/detail-parking.component';
import { SearchPlacesComponent } from './pages/search-places/search-places.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { ManagementReservationComponent } from './pages/management-reservation/management-reservation.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'parking', component: DetailParkingComponent },///:id
  { path: 'search', component: SearchPlacesComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'management-reservation', component: ManagementReservationComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
