import { createAction, props } from '@ngrx/store';
import { BookingModel } from 'src/app/core/models/booking.model';
import { IRoom } from 'src/app/core/models/room.model';


export const initCreateBooking = createAction(
  '[BOOKING] init create booking',
  props<{ start: Date, end: Date, numberGuests: number, room:IRoom }>(),

);


export const sendCreateBooking = createAction(
  '[BOOKING] send create booking',
  props<{ newBooking: BookingModel }>(),

);

export const bookingCreated = createAction(
  '[BOOKING] booking create success',
);

export const errorCreateBooking = createAction(
  '[BOOKING] error booking create',
  props<{ payload: any }>()
);

export const loadAvailableRooms = createAction(
  '[Available Rooms Filter] load rooms filter',
  props<{ hotelId: string, start: Date, end: Date, numberGuests: number }>()
);

export const loadedByAvailableRooms = createAction(
  '[Available Rooms  Filter] loaded success',
  props<{ rooms: IRoom[] }>()
);

export const errorLoadedAvailableRoom = createAction(
  '[Available Rooms  Filter] error loaded success',
  props<{ payload: any }>()
);




