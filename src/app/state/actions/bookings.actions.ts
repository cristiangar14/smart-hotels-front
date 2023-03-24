import { createAction, props } from '@ngrx/store';
import { BookingModel } from 'src/app/core/models/booking.model';

export const loadBookings = createAction(
  '[BOOKINGS] load bookings'
);

export const loadedBookings = createAction(
  '[BOOKINGS] loaded success',
  props<{ bookings: BookingModel[] }>()
);

export const errorLoadedBookings = createAction(
  '[BOOKINGS] error loaded',
  props<{ payload: any }>()
);


