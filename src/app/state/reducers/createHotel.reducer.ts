import { createReducer, on } from '@ngrx/store';
import { CreateHotelState } from 'src/app/core/models/hotel.state';
import { errorCreateHotel, hotelCreated, sendCreateHotel, sendOtherCreateHotel } from '../actions';


export const createHotelInitialState: CreateHotelState = {
  loading:false,
  created:false,
  error: null,
  hotel: null,
  id: null,
}

const _createHotelReducer = createReducer(
  createHotelInitialState,
  on(sendOtherCreateHotel, (state) => ({
    loading:false,
    created:false,
    error: null,
    hotel: null,
    id: null,
  })),
  on(sendCreateHotel, (state, { newHotel }) => ({
    ...state,
    loading: true,
    created: false,
    hotel: { ...newHotel }
  })),
  on(hotelCreated, (state, {hotel}) => ({
    ...state,
    loading: false,
    created:true,
    hotel: { ...hotel },
    id: hotel.id

  })),
  on(errorCreateHotel, (state, {payload}) => ({
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

export function createHotelReducer(state:any, action:any) {
  return _createHotelReducer(state, action)
}
