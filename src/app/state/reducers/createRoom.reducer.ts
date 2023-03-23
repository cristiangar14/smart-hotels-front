import { createReducer, on } from '@ngrx/store';
import { CreateRoomState } from 'src/app/core/models/room.state';
import { errorCreateRooms, roomsCreated, sendCreateRooms } from '../actions';


export const createRoomsInitialState: CreateRoomState = {
  loading:false,
  created:false,
  error: null,
  rooms: [],
}

const _createRoomsReducer = createReducer(
  createRoomsInitialState,
  on(sendCreateRooms, (state, { newRooms }) => ({
    ...state,
    loading: true,
    created: false,
    rooms: [...newRooms]
  })),
  on(roomsCreated, (state) => ({
    ...state,
    loading: false,
    created:true,
    room: []

  })),
  on(errorCreateRooms, (state, {payload}) => ({
    ...state,
    loading: false,
    created: false,
    error: {
      url: payload.url,
      name: payload.url,
      message: payload.message
    }

  }))
);

export function createRoomsReducer(state:any, action:any) {
  return _createRoomsReducer(state, action)
}
