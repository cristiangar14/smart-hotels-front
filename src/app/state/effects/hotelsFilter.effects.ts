import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, tap, mergeMap } from 'rxjs/operators';
import { HotelService } from 'src/app/services/hotel.service';
import { errorLoadedHotelsByFilter, loadedByFilterHotels, loadHotelsByFilter } from '../actions';

@Injectable()
export class HotelsEffectsFilter {
    constructor(
      private actions$: Actions,
      private hotelService: HotelService
    ) {}

   loadHotelsByFilter$ = createEffect(() => this.actions$.pipe(
    ofType(loadHotelsByFilter),
    mergeMap((actions) => this.hotelService.getHotelsFilter(actions.payload)
      .pipe(
        map(hotels => loadedByFilterHotels({hotels})),
        catchError(err => of(errorLoadedHotelsByFilter({payload: err})))
      ))
    )
  );

}
