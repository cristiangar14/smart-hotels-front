import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { RoomService } from 'src/app/services/room.service';
import { loadAvailableRooms, loadHotel } from 'src/app/state/actions';
import { Appstate } from 'src/app/state/app.reducers';

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
  start: Date = new Date();
  end: Date = new Date();
  numberGuest: number = 1;

  constructor(
      private route: ActivatedRoute,
      private roomService: RoomService,
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


      }
    })
    this.filterInitsub$ = this.store.select('hotelsByFilterList').subscribe({
      next: ({filter}) => {
        this.start = filter.start;
        this.end = filter.end;
        this.numberGuest = filter.numberGuest;
        this.store.dispatch(loadAvailableRooms({hotelId:this.hotelId, start: filter.start, end: filter.end, numberGuests: filter.numberGuests}))
      }
    })


  }

  ngOnDestroy(): void {
    this.hotelsub$.unsubscribe();
    this.filterInitsub$.unsubscribe();
  }

}
