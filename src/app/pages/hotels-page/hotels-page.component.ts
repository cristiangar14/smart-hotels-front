import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IHotel } from 'src/app/core/models/hotel.interface';
import { Appstate } from 'src/app/state/app.reducers';
import { selectErrorHotels, selectListHotels, selectLoadind } from 'src/app/state/selectors/hotels.selectors';

@Component({
  selector: 'app-hotels-page',
  templateUrl: './hotels-page.component.html',
  styleUrls: ['./hotels-page.component.scss']
})
export class HotelsPageComponent implements OnInit, OnDestroy {

  hotelsSub: Subscription = new Subscription();
  loading:boolean = false;
  hotels: IHotel[] | null = null;

  constructor(
      private router: Router,
      private store: Store<Appstate>
    ){

  }
  ngOnDestroy(): void {
    this.hotelsSub.unsubscribe();
  }

  ngOnInit(): void {
    this.hotelsSub =this.store.select('hotelsByFilterList').subscribe({
      next: ({hotels, loading}) => {
        this.hotels = [...hotels]
        this.loading = loading
      },
    })
  }

  passDetail(hotel:IHotel){
    let navigationExtras: NavigationExtras = {
      state: {
        data: hotel
      },
    }

    this.router.navigate([`/hotels/${hotel.id}`], navigationExtras)
  }

}
