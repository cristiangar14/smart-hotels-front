import { createReducer, on } from '@ngrx/store';
import { HotelsState } from 'src/app/core/models/hotels.state';
import { loadedHotels, loadHotels, errorLoadedHotels, loadHotelsByFilter, loadedByFilterHotels, errorLoadedHotelsByFilter } from '../actions';

export const hotelsByFilterInitialState: HotelsState = {
  loading:false,
  loaded:false,
  error: null,
  hotels:[],
  filter: null,
}

const _hotelsByFilterReducer = createReducer(
  hotelsByFilterInitialState,
  on(loadHotelsByFilter, (state, {payload}) => ({
    ...state,
    loading: true,
    loaded: false,
    filter: {...payload}

  })),
  on(loadedByFilterHotels, (state, {hotels}) => ({
    ...state,
    loading: false,
    loaded:true,
    hotels: [ ...hotels ]

  })),
  on(errorLoadedHotelsByFilter, (state, {payload}) => ({
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

export function hotelsByFilterReducer(state:any, action:any) {
  return _hotelsByFilterReducer(state, action)
}
