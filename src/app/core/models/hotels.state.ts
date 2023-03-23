import { IHotel } from "./hotel.interface";

export interface HotelsState{
  hotels: ReadonlyArray<IHotel>,
  loading: boolean,
  loaded: boolean,
  error: any,
  filter: any,
}
