import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { HotelService } from 'src/app/services/hotel.service';
import { errorLoadedHotel, errorUpdateHotel, loadedHotel, loadHotel, updatedHotel, updateHotel } from '../actions';

@Injectable()
export class HotelEffects {
    constructor(
      private actions$: Actions,
      private hotelService: HotelService
    ) {}

   loadHotel$ = createEffect(() => this.actions$.pipe(
     ofType(loadHotel),
     exhaustMap((action) => this.hotelService.getHotelById(action.id)
       .pipe(
         map(hotel => loadedHotel({hotel})),
         catchError(err => of(errorLoadedHotel({payload: err})))
       ))
     )
   );

   updateHotel$ = createEffect(() => this.actions$.pipe(
    ofType(updateHotel),
    exhaustMap((action) => this.hotelService.updateHotel(action.hotel)
      .pipe(
        map(message => updatedHotel({message})),
        catchError(err => of(errorUpdateHotel({payload: err})))
      ))
    )
  );

}
