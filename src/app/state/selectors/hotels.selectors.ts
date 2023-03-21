import { createSelector } from '@ngrx/store';
import { HotelsState } from 'src/app/core/models/hotels.state';
import { Appstate } from '../app.reducers';


export const selectHotelsFeature = (state: Appstate) => state.hotelsList;

export const selectLoadind = createSelector(
  selectHotelsFeature,
  (state: HotelsState) => state.loading
);

export const selectListHotels = createSelector(
  selectHotelsFeature,
  (state: HotelsState) => state.hotels
);

export const selectErrorHotels = createSelector(
  selectHotelsFeature,
  (state: HotelsState) => state.error
);

