import { Injectable } from '@angular/core';
import { ParkingLot } from '../models/parqueapp';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  constructor(private http: HttpClient) {}

  obtenerLoterias(): Observable<ParkingLot> {
    return this.http
      .get<ParkingLot>(
        `${environment.apiParkingLot}parking-lot/getAllParkingLot`
      )
      .pipe(
        map(
          (resp) => {
            return resp;
          },
          (error: any) => error
        )
      );
  }
}
