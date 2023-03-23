import { createSelector } from '@ngrx/store';
import { GetRoomsByHotelState } from 'src/app/core/models/room.state';
import { Appstate } from '../app.reducers';


export const selectgetRoomsByHotelFeature = (state: Appstate) => state.getRoomsByHotel;

export const selectLoadingGetRoomsByHotel = createSelector(
  selectgetRoomsByHotelFeature,
  (state: GetRoomsByHotelState) => state.loading
);

export const selectRoomsByHotel = createSelector(
  selectgetRoomsByHotelFeature,
  (state: GetRoomsByHotelState) => state.rooms,

);

export const selectSuccessGetRoomsByHotel = createSelector(
  selectgetRoomsByHotelFeature,
  (state: GetRoomsByHotelState) => state.obtained
);

export const selectErrorGetRoomsByHotel = createSelector(
  selectgetRoomsByHotelFeature,
  (state: GetRoomsByHotelState) => state.error
);

