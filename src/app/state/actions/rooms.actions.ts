import { createAction, props } from '@ngrx/store';
import { IRoom } from 'src/app/core/models/room.model';

export const sendCreateRooms = createAction(
  '[ROOM] send create room',
  props<{ newRooms: IRoom[], hotelId:string }>(),

);

export const roomsCreated = createAction(
  '[ROOM] room create success',
);

export const errorCreateRooms = createAction(
  '[ROOM] error room create',
  props<{ payload: any }>()
);

export const getRoomsByHotel = createAction(
  '[ROOM] send get rooms by hotel',
  props<{ hotelId:string }>(),

);

export const roomsByHotelObtained = createAction(
  '[ROOM] rooms by hotel get success',
  props<{ rooms:IRoom[] }>(),
);

export const errorGetRoomsByHotel = createAction(
  '[ROOM] error rooms by hotel get',
  props<{ payload: any }>()
);

export const updateRoom = createAction(
  '[Hotel] update room',
  props<{ room: IRoom, id:string }>()
);

export const updatedRoom = createAction(
  '[Hotel] update room success',
  props<{ message:string }>()
);

export const errorUpdateRoom = createAction(
  '[Hotel] error update room',
  props<{ payload: any }>()
);

