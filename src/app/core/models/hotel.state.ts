import { IHotel } from "./hotel.interface";


export interface HotelState{
  id: string | null,
  hotel: IHotel | null,
  loading: boolean,
  loaded: boolean,
  error: any,
}

export interface CreateHotelState{
  id: string | null | undefined,
  hotel: IHotel | null,
  loading: boolean,
  created: boolean,
  error: any,
}

export interface UpdateHotelState{
  hotel: IHotel | null,
  loading: boolean,
  updated: boolean,
  message: string,
  error: any,
}
