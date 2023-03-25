import { BookingModel } from "./booking.model";
import { IRoom } from "./room.model";
import { IRoomType } from "./roomType.interface";


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
  room: IRoom | null
}


export interface BookingsState{
  bookings: BookingModel[] | null,
  loading: boolean,
  loaded: boolean,
  error: any,

}
