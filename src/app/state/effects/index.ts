import { HotelEffects } from "./hotel.effects";
import { HotelsEffects } from "./hotels.effects";
import { CreateHotelEffects } from "./createHotel.effects";
import { CreateRoomsEffects } from "./rooms.effects";
import { CreateBookingEffects } from "./booking.effects";
import { GetRoomsByHotelEffects } from "./getRoomsByHotel.effects";
import { HotelsEffectsFilter } from "./hotelsFilter.effects";


export const EffectsArray:any[] = [
  HotelsEffects,
  HotelsEffectsFilter,
  HotelEffects,
  CreateHotelEffects,
  CreateRoomsEffects,
  CreateBookingEffects,
  GetRoomsByHotelEffects
];
