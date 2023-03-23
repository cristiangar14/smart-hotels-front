import { IRoom } from "./room.model";


export interface RoomState{
  id: string | null,
  room: IRoom | null,
  loading: boolean,
  loaded: boolean,
  error: any,
}

export interface CreateRoomState{
  rooms: IRoom[] | [],
  loading: boolean,
  created: boolean,
  error: any,
}

export interface GetRoomsByHotelState{
  rooms: IRoom[] | [],
  loading: boolean,
  obtained: boolean,
  error: any,
  hotelId: string
}

export interface UpdateRoomState{
  room: IRoom | null,
  loading: boolean,
  updated: boolean,
  message: string,
  error: any,
}
