import { createAction, props } from '@ngrx/store';
import { IHotel } from 'src/app/core/models/hotel.interface';

export const loadHotel = createAction(
  '[Hotel] load hotel',
  props<{ id: string }>()
);

export const loadedHotel = createAction(
  '[Hotel] loaded success',
  props<{ hotel: IHotel }>()
);

export const errorLoadedHotel = createAction(
  '[Hotel] error loaded success',
  props<{ payload: any }>()
);

