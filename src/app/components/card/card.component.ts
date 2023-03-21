import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IHotel } from 'src/app/core/models/hotel.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() data: any

  constructor(
    private router: Router,
    ){}

  passDetail(hotel:IHotel){
    let navigationExtras: NavigationExtras = {
      state: {
        data: hotel
      },
    }
    this.router.navigate([`/hotels/${hotel._id}`], navigationExtras)
  }

  passReservation(hotel:IHotel){
    let navigationExtras: NavigationExtras = {
      state: {
        data: hotel
      },
    }
    this.router.navigate([`/reservation/${hotel._id}`], navigationExtras)
  }

}
