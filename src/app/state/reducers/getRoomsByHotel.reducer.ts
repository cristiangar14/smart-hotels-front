import { createReducer, on } from '@ngrx/store';
import { GetRoomsByHotelState } from 'src/app/core/models/room.state';
import { errorGetRoomsByHotel, getRoomsByHotel, roomsByHotelObtained } from '../actions';


export const getRoomsByHotelInitialState: GetRoomsByHotelState = {
  loading:false,
  obtained:false,
  error: null,
  rooms: [],
  hotelId: '',
}

const _getRoomsByHotelReducer = createReducer(
  getRoomsByHotelInitialState,
  on(getRoomsByHotel, (state, { hotelId }) => ({
    ...state,
    loading: true,
    obtained: false,
    hotelId
  })),
  on(roomsByHotelObtained, (state, { rooms }) => ({
    ...state,
    loading: false,
    obtained:true,
    rooms

  })),
  on(errorGetRoomsByHotel, (state, {payload}) => ({
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

export function getRoomsByHotelReducer(state:any, action:any) {
  return _getRoomsByHotelReducer(state, action)
}
