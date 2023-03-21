import { createReducer, on } from '@ngrx/store';
import { IHotel } from 'src/app/core/models/hotel.interface';
import { HotelState } from 'src/app/core/models/hotel.state';
import { loadedHotel, loadHotel, errorLoadedHotel } from '../actions';


export const hotelInitialState: HotelState = {
  loading:false,
  loaded:false,
  error: null,
  hotel: null,
  id: null,
}

const _hotelReducer = createReducer(
  hotelInitialState,
  on(loadHotel, (state, { id }) => ({
    ...state,
    loading: true,
    id,
  })),
  on(loadedHotel, (state, {hotel}) => ({
    ...state,
    loading: false,
    loaded:true,
    hotel: { ...hotel },

  })),
  on(errorLoadedHotel, (state, {payload}) => ({
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

export function hotelReducer(state:any, action:any) {
  return _hotelReducer(state, action)
}
