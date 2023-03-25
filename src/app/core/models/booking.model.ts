import { GuestsModel } from "./guest.model";
import { IRoom } from "./room.model";

export class BookingModel {
  constructor(
    public responsible: GuestsModel,
    public start: Date,
    public end: Date,
    public emergencyContact: {},
    public rangeTimestamp: any,
    public guests: GuestsModel[],
    public id?: string,
    public roomId?: string,
    public hotelId?: string,
    public room?: IRoom
    ){}
}
