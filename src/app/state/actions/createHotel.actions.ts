import { createAction, props } from '@ngrx/store';
import { IHotel } from 'src/app/core/models/hotel.interface';
import { IRoom } from 'src/app/core/models/room.model';


export const sendOtherCreateHotel = createAction(
  '[Hotel] send other create hotel'
);

export const sendCreateHotel = createAction(
  '[Hotel] send create hotel',
  props<{ newHotel: IHotel, newRooms:IRoom[] }>()
);

export const hotelCreated = createAction(
  '[Hotel] hotel create success',
  props<{ hotel: IHotel }>()
);

export const errorCreateHotel = createAction(
  '[Hotel] error hotel create',
  props<{ payload: any }>()
);


