import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, tap, mergeMap } from 'rxjs/operators';
import { BookingService } from 'src/app/services/booking.service';
import { bookingCreated, errorCreateBooking, loadBookings, loadedBookings, sendCreateBooking } from '../actions';

@Injectable()
export class CreateBookingEffects {
    constructor(
      private actions$: Actions,
      private bookingServices: BookingService
    ) {}

   createBooking$ = createEffect(() => this.actions$.pipe(
     ofType(sendCreateBooking),
     exhaustMap((action) => this.bookingServices.createBooking(action.newBooking )
       .pipe(
        tap(console.log),
          map(booking => bookingCreated()),
         catchError(err => of(errorCreateBooking({payload: err})))
       ))
     )
   );


   getAllBookings$ = createEffect(() => this.actions$.pipe(
    ofType(loadBookings),
    mergeMap(() => this.bookingServices.getAllBookings()
      .pipe(
       tap(console.log),
         map(bookings => loadedBookings({bookings})),
        catchError(err => of(errorCreateBooking({payload: err})))
      ))
    )
  );

}
