import { BookingModel } from "./booking.model";


export interface BookingState{
  id: string | null,
  booking: BookingModel | null,
  loading: boolean,
  loaded: boolean,
  error: any,

}

export interface CreateBookingState{
  booking:  BookingModel | null,
  loading: boolean,
  created: boolean,
  error: any,
  start: Date | null,
  end: Date | null,
  numberGuests: number | null
}
