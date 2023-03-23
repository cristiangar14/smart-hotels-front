import { createSelector } from '@ngrx/store';
import { UpdateHotelState } from 'src/app/core/models/hotel.state';
import { Appstate } from '../app.reducers';


export const selectUpdateHotelFeature = (state: Appstate) => state.updateHotel;

export const selectUpdateHotel = createSelector(
  selectUpdateHotelFeature,
  (state: UpdateHotelState) => state.loading
);

export const selectSuccessUpdateHotelMessage = createSelector(
  selectUpdateHotelFeature,
  (state: UpdateHotelState) => state.message,

);

export const selectSuccessUpdateHotel = createSelector(
  selectUpdateHotelFeature,
  (state: UpdateHotelState) => state.updated
);

export const selectErrorUpdateHotel = createSelector(
  selectUpdateHotelFeature,
  (state: UpdateHotelState) => state.error
);

