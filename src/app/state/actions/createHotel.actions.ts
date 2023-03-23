import { createAction, props } from '@ngrx/store';
import { IHotel } from 'src/app/core/models/hotel.interface';

export const sendCreateHotel = createAction(
  '[Hotel] send create hotel',
  props<{ newHotel: IHotel }>()
);

export const hotelCreated = createAction(
  '[Hotel] hotel create success',
  props<{ hotel: IHotel }>()
);

export const errorCreateHotel = createAction(
  '[Hotel] error hotel create',
  props<{ payload: any }>()
);


