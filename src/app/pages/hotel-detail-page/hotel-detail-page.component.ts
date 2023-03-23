import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadHotel } from 'src/app/state/actions';
import { Appstate } from 'src/app/state/app.reducers';
import { selectErrorHotel, selectHotel, selectLoadindHotel } from 'src/app/state/selectors/hotel.selector';

@Component({
  selector: 'app-hotel-detail-page',
  templateUrl: './hotel-detail-page.component.html',
  styleUrls: ['./hotel-detail-page.component.scss']
})
export class HotelDetailPageComponent implements OnInit{

  hotel$: Observable<any> = new Observable();
  errorData$: Observable<any> = new Observable();
  loading$: Observable<boolean> = new Observable();
  hotel: any;

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

    this.hotel$ = this.store.select(selectHotel)
    this.errorData$ = this.store.select(selectErrorHotel)
    this.loading$ = this.store.select<boolean>(selectLoadindHotel)

    this.hotel$.subscribe({
      next: (data) =>  data ?this.hotel  = data: null
    })


  }

}
