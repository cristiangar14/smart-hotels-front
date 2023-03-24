import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { RoomService } from 'src/app/services/room.service';
import { errorCreateRooms, errorLoadedAvailableRoom, errorUpdateRoom, loadAvailableRooms, loadedByAvailableRooms, roomsCreated, sendCreateRooms, updatedRoom, updateRoom } from '../actions';

@Injectable()
export class CreateRoomsEffects {
    constructor(
      private actions$: Actions,
      private roomService: RoomService
    ) {}

   createRooms$ = createEffect(() => this.actions$.pipe(
     ofType(sendCreateRooms),
     exhaustMap((action) => this.roomService.createRooms(action.newRooms, action.hotelId)
       .pipe(
        tap(console.log),
          map(hotel => roomsCreated()),
         catchError(err => of(errorCreateRooms({payload: err})))
       ))
     )
   );

    updateRoom$ = createEffect(() => this.actions$.pipe(
      ofType(updateRoom),
      exhaustMap((action) => this.roomService.updateRoom(action.room, action.id)
        .pipe(
          map(message => updatedRoom({message})),
          catchError(err => of(errorUpdateRoom({payload: err})))
        ))
      )
    )

    AvailableRooms$ = createEffect(() => this.actions$.pipe(
      ofType(loadAvailableRooms),
      exhaustMap((action) => this.roomService.getAvailableRoomsByHotel(action.hotelId, action.start, action.end, action.numberGuests)
        .pipe(
          map(rooms => loadedByAvailableRooms({rooms})),
          catchError(err => of(errorLoadedAvailableRoom({payload: err})))
        ))
      )
    )

}
