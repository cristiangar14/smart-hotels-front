import { createReducer, on } from '@ngrx/store';
import { GetAvalableRoomsByHotelState } from 'src/app/core/models/room.state';
import { errorLoadedAvailableRoom, loadAvailableRooms, loadedByAvailableRooms } from '../actions';


export const getAvailableRoomsByHotelInitialState: GetAvalableRoomsByHotelState = {
  loading:false,
  obtained:false,
  error: null,
  rooms: [],
  hotelId: '',
  start: new Date(),
  end: new Date(),
  numberGuests: 1
}

const _getAvailableRoomsByHotelReducer = createReducer(
  getAvailableRoomsByHotelInitialState,
  on(loadAvailableRooms, (state, { hotelId, start, end, numberGuests }) => ({
    ...state,
    loading: true,
    obtained: false,
    start,
    end,
    numberGuests,
    hotelId
  })),
  on(loadedByAvailableRooms, (state, { rooms }) => ({
    ...state,
    loading: false,
    obtained:true,
    rooms,
    start: new Date(),
    end: new Date(),
    numberGuests: 1
  })),
  on(errorLoadedAvailableRoom, (state, {payload}) => ({
    ...state,
    loading: false,
    obtained: false,
    error: {
      url: payload.url,
      name: payload.url,
      message: payload.message
    }

  }))
);

export function getAvailableRoomsByHotelReducer(state:any, action:any) {
  return _getAvailableRoomsByHotelReducer(state, action)
}
