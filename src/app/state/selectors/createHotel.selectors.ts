import { createSelector } from '@ngrx/store';
import { CreateHotelState } from 'src/app/core/models/hotel.state';
import { Appstate } from '../app.reducers';


export const selectCreateHotelFeature = (state: Appstate) => state.createHotel;

export const selectCreateHotel = createSelector(
  selectCreateHotelFeature,
  (state: CreateHotelState) => state.loading
);

export const selectCreatedHotel = createSelector(
  selectCreateHotelFeature,
  (state: CreateHotelState) => state.hotel,

);

export const selectSuccessCreateHotel = createSelector(
  selectCreateHotelFeature,
  (state: CreateHotelState) => state.created
);

export const selectErrorCreateHotel = createSelector(
  selectCreateHotelFeature,
  (state: CreateHotelState) => state.error
);

