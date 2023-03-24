import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, tap } from 'rxjs';
import { Appstate } from 'src/app/state/app.reducers';
import { selectListHotels } from 'src/app/state/selectors';

import {animate, state, style, transition, trigger} from '@angular/animations';
import { IHotel } from 'src/app/core/models/hotel.interface';
import { getRoomsByHotel, loadHotels } from 'src/app/state/actions';

@Component({
  selector: 'app-list-hotels',
  templateUrl: './list-hotels.component.html',
  styleUrls: ['./list-hotels.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})




export class ListHotelsComponent implements OnInit, OnDestroy {
  dataSourceSub: Subscription = new Subscription();
  dataSource: IHotel[] | null = null;
  loading:boolean = false;
  columnsToDisplay = ['name', 'numberRooms', 'active'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: IHotel | null = null;


  constructor(
      private store: Store<Appstate>
    ){

  }

  ngOnInit(): void {
    this.store.dispatch(loadHotels())
    this.dataSourceSub = this.store.select('hotelsList').subscribe({
      next: ({hotels, loading}) => {
        this.dataSource = [...hotels];
        this.loading = loading
      }
    })

  }

  ngOnDestroy(): void {
    this.dataSourceSub.unsubscribe()
  }



}
