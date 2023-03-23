import { createReducer, on } from '@ngrx/store';
import { UpdateHotelState } from 'src/app/core/models/hotel.state';
import { loadedHotel, loadHotel, errorLoadedHotel, updateHotel, updatedHotel, errorUpdateHotel } from '../actions';


export const updateHotelInitialState: UpdateHotelState = {
  loading:false,
  updated:false,
  error: null,
  hotel: null,
  message: ''
}

const _updateHotelReducer = createReducer(
  updateHotelInitialState,
  on(updateHotel, (state, { hotel }) => ({
    ...state,
    loading: true,
    hotel,
    message: '',
  })),
  on(updatedHotel, (state, { message }) => ({
    ...state,
    loading: false,
    updated:true,
    message,

  })),
  on(errorUpdateHotel, (state, {payload}) => ({
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

export function updateHotelReducer(state:any, action:any) {
  return _updateHotelReducer(state, action)
}
