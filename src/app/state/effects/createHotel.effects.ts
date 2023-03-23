import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { HotelService } from 'src/app/services/hotel.service';
import { errorCreateHotel, sendCreateHotel, hotelCreated } from '../actions';

@Injectable()
export class CreateHotelEffects {
    constructor(
      private actions$: Actions,
      private hotelService: HotelService
    ) {}

   createHotels$ = createEffect(() => this.actions$.pipe(
     ofType(sendCreateHotel),
     exhaustMap((action) => this.hotelService.createHotel(action.newHotel)
       .pipe(
        tap(console.log),
          map(hotel => hotelCreated({hotel})),
         catchError(err => of(errorCreateHotel({payload: err})))
       ))
     )
   );

}
