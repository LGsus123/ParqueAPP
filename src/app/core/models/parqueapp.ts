export interface Parqueapp {
}

export interface ParkingLot {
    id: number,
    name: String,
    start_date: Date,
    end_date: Date,
    address: String,
    latitude: number,
    longitude: number,
}

export interface Customer {
    id: number,
    id_card: string,
    first_name: string,
    last_name: string,
    phone: number,
    address: string,
}

export interface ParkingSpace {
    id: number,
    type: string,
    state: number,
    parking_lot: ParkingLot
}

export interface Vehicle {
    id: number,
    plate: string;
    type: string;
}