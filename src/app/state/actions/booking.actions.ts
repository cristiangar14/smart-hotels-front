import { createAction, props } from '@ngrx/store';
import { BookingModel } from 'src/app/core/models/booking.model';

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

