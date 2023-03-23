import { createSelector } from '@ngrx/store';
import { CreateRoomState } from 'src/app/core/models/room.state';
import { Appstate } from '../app.reducers';


export const selectCreateRoomFeature = (state: Appstate) => state.createRooms;

export const selectCreateRooms = createSelector(
  selectCreateRoomFeature,
  (state: CreateRoomState) => state.loading
);

export const selectCreatedRooms = createSelector(
  selectCreateRoomFeature,
  (state: CreateRoomState) => state.rooms,

);

export const selectSuccessCreateRooms = createSelector(
  selectCreateRoomFeature,
  (state: CreateRoomState) => state.created
);

export const selectErrorCreateRooms = createSelector(
  selectCreateRoomFeature,
  (state: CreateRoomState) => state.error
);

