import { Injectable } from '@angular/core';
import { delay, filter, Observable, of } from 'rxjs';
import { HOTEL_LIST } from '../mocks/hotels.mocks';
import { IHotel } from '../core/models/hotel.interface';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  hotelList:IHotel[] = HOTEL_LIST;

  constructor() { }

  getHotelsDataApi(): Observable<IHotel[]>{
    return of(this.hotelList).pipe(
        delay(1500)
      )
  }

  getHotelById(id:string): Observable<IHotel>{
    return of(this.hotelList[0]).pipe(
      delay(1500)
    )

  }

  createHotel(hotel:any){
    console.log('servicio',hotel)
  }

}
