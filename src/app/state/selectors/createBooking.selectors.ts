import { createSelector } from '@ngrx/store';
import { CreateBookingState } from 'src/app/core/models/booking.state';
import { Appstate } from '../app.reducers';


export const selectCreateBookingFeature = (state: Appstate) => state.createBooking;

export const selectCreateBooking = createSelector(
  selectCreateBookingFeature,
  (state: CreateBookingState) => state.loading
);

export const selectCreatedBooking = createSelector(
  selectCreateBookingFeature,
  (state: CreateBookingState) => state.booking,

);

export const selectSuccessCreateBooking = createSelector(
  selectCreateBookingFeature,
  (state: CreateBookingState) => state.created
);

export const selectErrorCreateBooking = createSelector(
  selectCreateBookingFeature,
  (state: CreateBookingState) => state.error
);

