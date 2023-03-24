import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, tap, mergeMap, switchMap } from 'rxjs/operators';
import { RoomService } from 'src/app/services/room.service';
import { errorGetRoomsByHotel, getRoomsByHotel, roomsByHotelObtained } from '../actions';

@Injectable()
export class GetRoomsByHotelEffects {
    constructor(
      private actions$: Actions,
      private roomService: RoomService
    ) {}

    GetRoomsByHotel$ = createEffect(() => this.actions$.pipe(
     ofType(getRoomsByHotel),
     switchMap((action) => this.roomService.getRoomsByHotel(action.hotelId)
       .pipe(
        tap(console.log),
          map(rooms => roomsByHotelObtained({rooms})),
         catchError(err => of(errorGetRoomsByHotel({payload: err})))
       ))
     )
   );

}
