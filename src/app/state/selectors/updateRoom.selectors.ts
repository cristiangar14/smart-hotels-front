import { createSelector } from '@ngrx/store';
import { UpdateRoomState } from 'src/app/core/models/room.state';
import { Appstate } from '../app.reducers';


export const selectUpdateRoomFeature = (state: Appstate) => state.updateRoom;

export const selectUpdateRoom = createSelector(
  selectUpdateRoomFeature,
  (state: UpdateRoomState) => state.loading
);

export const selectSuccessUpdateRoomMessage = createSelector(
  selectUpdateRoomFeature,
  (state: UpdateRoomState) => state.message,

);

export const selectSuccessUpdateRoom = createSelector(
  selectUpdateRoomFeature,
  (state: UpdateRoomState) => state.updated
);

export const selectErrorUpdateRoom = createSelector(
  selectUpdateRoomFeature,
  (state: UpdateRoomState) => state.error
);

