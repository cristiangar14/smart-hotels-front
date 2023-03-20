import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOTEL_LIST } from '../mocks/hotels.mocks';
import { IHotel } from '../models/hotel.interface';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  hotelList:IHotel[] = HOTEL_LIST;

  constructor() { }

  getHotels(filter?:string): Promise<IHotel[]>{

    if (filter) {
      let listHotel:IHotel[] = this.hotelList.filter((hotel:IHotel) => hotel._id !== filter)
      return Promise.resolve(listHotel)
    } else {
      return Promise.resolve(this.hotelList)
    }


  }

}
