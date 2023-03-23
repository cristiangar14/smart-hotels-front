import { createReducer, on } from '@ngrx/store';
import { UpdateRoomState } from 'src/app/core/models/room.state';
import { errorUpdateRoom, updatedRoom, updateRoom } from '../actions';


export const updateRoomInitialState: UpdateRoomState = {
  loading:false,
  updated:false,
  error: null,
  room: null,
  message: ''
}

const _updateRoomReducer = createReducer(
  updateRoomInitialState,
  on(updateRoom, (state, { room }) => ({
    ...state,
    loading: true,
    room,
    message: '',
  })),
  on(updatedRoom, (state, { message }) => ({
    ...state,
    loading: false,
    updated:true,
    message,

  })),
  on(errorUpdateRoom, (state, {payload}) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      name: payload.url,
      message: payload.message
    }

  }))
);

export function updateRoomReducer(state:any, action:any) {
  return _updateRoomReducer(state, action)
}
