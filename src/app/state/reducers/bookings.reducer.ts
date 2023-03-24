import { createReducer, on } from '@ngrx/store';
import { BookingsState } from 'src/app/core/models/booking.state';
import { errorLoadedBookings, loadBookings, loadedBookings } from '../actions';

export const bookingsInitialState: BookingsState = {
  loading:false,
  loaded:false,
  error: null,
  bookings:[],
}

const _bookingsReducer = createReducer(
  bookingsInitialState,
  on(loadBookings, (state) => ({...state, loading: true})),
  on(loadedBookings, (state, {bookings}) => ({
    ...state,
    loading: false,
    loaded:true,
    bookings: [ ...bookings ]

  })),
  on(errorLoadedBookings, (state, {payload}) => ({
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

export function bookingsReducer(state:any, action:any) {
  return _bookingsReducer(state, action)
}
