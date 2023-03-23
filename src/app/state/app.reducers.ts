import { ActionReducerMap } from "@ngrx/store";
import { CreateBookingState } from "../core/models/booking.state";
import { CreateHotelState, HotelState, UpdateHotelState } from "../core/models/hotel.state";
import { HotelsState } from "../core/models/hotels.state";
import { CreateRoomState, GetRoomsByHotelState, UpdateRoomState } from "../core/models/room.state";
import * as reducers from './reducers'
import { UIState } from "./reducers/ui.reducer";



export interface Appstate {
  hotelsList: HotelsState;
  hotel: HotelState;
  createHotel: CreateHotelState;
  createRooms: CreateRoomState;
  createBooking: CreateBookingState;
  updateHotel: UpdateHotelState;
  getRoomsByHotel: GetRoomsByHotelState;
  updateRoom: UpdateRoomState;
  ui: UIState
}


export const appReducers: ActionReducerMap<Appstate> = {
  hotelsList: reducers.hotelsReducer,
  hotel: reducers.hotelReducer,
  createHotel: reducers.createHotelReducer,
  createRooms: reducers.createRoomsReducer,
  createBooking: reducers.createBookingReducer,
  updateHotel: reducers.updateHotelReducer,
  getRoomsByHotel: reducers.getRoomsByHotelReducer,
  updateRoom: reducers.updateRoomReducer,
  ui: reducers.uiReducer

}