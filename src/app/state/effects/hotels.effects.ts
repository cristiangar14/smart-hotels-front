import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { HotelService } from 'src/app/services/hotel.service';
import { errorLoadedHotels, loadedHotels, loadHotels } from '../actions';

@Injectable()
export class HotelsEffects {
    constructor(
      private actions$: Actions,
      private hotelService: HotelService
    ) {}

   loadHotels$ = createEffect(() => this.actions$.pipe(
     ofType(loadHotels),
     exhaustMap(() => this.hotelService.getHotelsDataApi()
       .pipe(
         map(hotels => loadedHotels({hotels})),
         catchError(err => of(errorLoadedHotels({payload: err})))
       ))
     )
   );

}
