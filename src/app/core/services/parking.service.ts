import { Injectable } from '@angular/core';
import { Customer, ParkingLot, ParkingSpace } from '../models/parqueapp';
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

  getParkingLotsByParkingSpaceType(type: string): Observable<ParkingLot> {
    return this.http
      .get<ParkingLot>(
        `${environment.apiParkingLot}parking-lot/getParkingLotsByParkingSpaceType/${type}`
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

  getAllVehiclesByCustomerId(id: number): Observable<ParkingLot> {
    return this.http
      .get<ParkingLot>(
        `${environment.apiParkingLot}vehicle/getAllVehiclesByCustomerId/${id}`
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

  getCustomerById(id: number): Observable<Customer> {
    return this.http
      .get<Customer>(
        `${environment.apiParkingLot}customer/getCustomerById/${id}`
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

  reserveParkingSpace(parking_lot_id: any, id_vehicle: any, type_vehicle: any, date_reserve: any, start_time: any, end_time: any): Observable<any> {
    return this.http.put<any>(
      `${environment.apiParkingLot}parking-space/reserveParkingSpace/
        ${parking_lot_id}/${id_vehicle}/${type_vehicle}/${date_reserve}/${start_time}/${end_time}`,
      {}
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
