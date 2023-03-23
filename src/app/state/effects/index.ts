import { HotelEffects } from "./hotel.effects";
import { HotelsEffects } from "./hotels.effects";
import { CreateHotelEffects } from "./createHotel.effects";
import { CreateRoomsEffects } from "./rooms.effects";
import { CreateBookingEffects } from "./createBooking.effects";
import { GetRoomsByHotelEffects } from "./getRoomsByHotel.effects";


export const EffectsArray:any[] = [
  HotelsEffects,
  HotelEffects,
  CreateHotelEffects,
  CreateRoomsEffects,
  CreateBookingEffects,
  GetRoomsByHotelEffects
];
