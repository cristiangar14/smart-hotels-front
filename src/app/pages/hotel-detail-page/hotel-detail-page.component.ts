import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { loadAvailableRooms, loadHotel } from 'src/app/state/actions';
import { Appstate } from 'src/app/state/app.reducers';
import { selectErrorHotel, selectHotel, selectLoadindHotel } from 'src/app/state/selectors/hotel.selector';

@Component({
  selector: 'app-hotel-detail-page',
  templateUrl: './hotel-detail-page.component.html',
  styleUrls: ['./hotel-detail-page.component.scss']
})
export class HotelDetailPageComponent implements OnInit, OnDestroy{

  hotelsub$: Subscription = new Subscription();
  filterInitsub$: Subscription = new Subscription();
  errorData: any;
  loading: boolean =  false;
  hotel: any;
  hotelId: any;

  constructor(
      private route: ActivatedRoute,
      private store: Store<Appstate>
    ){}

  ngOnInit(): void {
    this.route.params.subscribe(
        ({id}) => {
          if (id) {
              this.store.dispatch(loadHotel({id}))
          }
        }
    )



    this.hotelsub$ = this.store.select('hotel').subscribe({
      next: ({hotel, loading, id, error}) => {
        this.hotel = hotel;
        this.hotelId = id;
        this.errorData = error;
        this.loading = loading;

        this.store.dispatch(loadAvailableRooms(id, ))
      }
    })


  }

  ngOnDestroy(): void {
    this.hotelsub$.unsubscribe();
  }

}
