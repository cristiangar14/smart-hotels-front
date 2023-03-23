import { createAction, props } from '@ngrx/store';
import { IHotel } from 'src/app/core/models/hotel.interface';

export const loadHotels = createAction(
  '[Hotel List] load hotels'
);

export const loadedHotels = createAction(
  '[Hotel List] loaded success',
  props<{ hotels: IHotel[] }>()
);

export const errorLoadedHotels = createAction(
  '[Hotel List] error loaded success',
  props<{ payload: any }>()
);

export const loadHotelsByFilter = createAction(
  '[Hotel List Filter] load hotels filter',
  props<{ payload: any }>()
);
