import { createSelector } from '@ngrx/store';
import { CreateBookingState } from 'src/app/core/models/booking.state';
import { Appstate } from '../app.reducers';


export const selectCreateBookingFeature = (state: Appstate) => state.createBooking;

export const selectStartCreateBooking = createSelector(
  selectCreateBookingFeature,
  (state: CreateBookingState) => state.start
);

export const selectEndCreateBooking = createSelector(
  selectCreateBookingFeature,
  (state: CreateBookingState) => state.end
);

export const selectNumberGuestCreateBooking = createSelector(
  selectCreateBookingFeature,
  (state: CreateBookingState) => state.numberGuests
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

