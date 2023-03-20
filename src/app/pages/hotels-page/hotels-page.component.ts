import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IHotel } from 'src/app/models/hotel.interface';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotels-page',
  templateUrl: './hotels-page.component.html',
  styleUrls: ['./hotels-page.component.scss']
})
export class HotelsPageComponent implements OnInit {
  listHotels:IHotel[] = [];

  constructor(
      private router: Router,
      private hotelService: HotelService
    ){

  }

  ngOnInit(): void {
    this.hotelService.getHotels()
      .then((response) => this.listHotels = response)
      .catch((error) => {
        throw new Error(`[GET-HOTELS]: ${error}`);
      })
  }

  passDetail(hotel:IHotel){
    let navigationExtras: NavigationExtras = {
      state: {
        data: hotel
      },
    }

    this.router.navigate([`/hotels/${hotel._id}`], navigationExtras)
  }

}
