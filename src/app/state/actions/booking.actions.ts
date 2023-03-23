import { createAction, props } from '@ngrx/store';
import { BookingModel } from 'src/app/core/models/booking.model';


export const initCreateBooking = createAction(
  '[BOOKING] init create booking',
  props<{ start: Date, end: Date, numberGuests: number }>(),

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

