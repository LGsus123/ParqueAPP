import { Injectable } from '@angular/core';
import { ParkingLot, ParkingSpace } from '../models/parqueapp';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  constructor(private http: HttpClient) {}

  getAllParkingLots(): Observable<ParkingLot> {
    return this.http
      .get<ParkingLot>(
        `${environment.apiParkingLot}parking-lot/getAllParkingLots`
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

  getAllParkingSpaces(id: number): Observable<ParkingSpace> {
    return this.http
      .get<ParkingSpace>(
        `${environment.apiParkingLot}parking-space/getAllParkingSpacesEnableByParkingLotId/${id}`
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
