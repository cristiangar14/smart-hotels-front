import { createReducer, on } from '@ngrx/store';
import { CreateBookingState } from 'src/app/core/models/booking.state';
import { initCreateBooking } from '../actions';
import { bookingCreated, errorCreateBooking, sendCreateBooking } from '../actions';


export const createBookingInitialState: CreateBookingState = {
  loading:false,
  created:false,
  error: null,
  booking: null,
  start: null,
  end: null,
  numberGuests: null,
  room: null,
}

const _createBookingReducer = createReducer(
  createBookingInitialState,
  on(initCreateBooking, (state, { start, end, numberGuests, room }) => ({
    ...state,
    loading: false,
    created: false,
    start,
    end,
    numberGuests,
    room
  })),
  on(sendCreateBooking, (state, { newBooking }) => ({
    ...state,
    loading: true,
    created: false,
    booking: {...newBooking}
  })),
  on(bookingCreated, (state) => ({
    ...state,
    loading: false,
    created:true,
    booking: null

  })),
  on(errorCreateBooking, (state, {payload}) => ({
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

export function createBookingReducer(state:any, action:any) {
  return _createBookingReducer(state, action)
}
