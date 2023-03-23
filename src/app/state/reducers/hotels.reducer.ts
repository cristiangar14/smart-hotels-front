import { createReducer, on } from '@ngrx/store';
import { HotelsState } from 'src/app/core/models/hotels.state';
import { loadedHotels, loadHotels, errorLoadedHotels, loadHotelsByFilter } from '../actions';

export const hotelsInitialState: HotelsState = {
  loading:false,
  loaded:false,
  error: null,
  hotels:[],
  filter: null,
}

const _hotelsReducer = createReducer(
  hotelsInitialState,
  on(loadHotels, (state) => ({...state, loading: true})),
  on(loadHotelsByFilter, (state, {payload}) => ({
    ...state,
    loading: true,
    loaded: false,
    filter: {...payload}

  })),
  on(loadedHotels, (state, {hotels}) => ({
    ...state,
    loading: false,
    loaded:true,
    hotels: [ ...hotels ]

  })),
  on(errorLoadedHotels, (state, {payload}) => ({
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

export function hotelsReducer(state:any, action:any) {
  return _hotelsReducer(state, action)
}
