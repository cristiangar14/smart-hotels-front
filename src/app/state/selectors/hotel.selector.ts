import { createSelector } from '@ngrx/store';
import { HotelState } from 'src/app/core/models/hotel.state';
import { Appstate } from '../app.reducers';


export const selectHotelFeature = (state: Appstate) => state.hotel;

export const selectLoadindHotel = createSelector(
  selectHotelFeature,
  (state: HotelState) => state.loading
);

export const selectHotel = createSelector(
  selectHotelFeature,
  (state: HotelState) => state.hotel
);

export const selectErrorHotel = createSelector(
  selectHotelFeature,
  (state: HotelState) => state.error
);

