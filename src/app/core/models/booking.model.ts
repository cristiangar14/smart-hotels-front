import { GuestsModel } from "./guest.model";

export class BookingModel {
  constructor(
    public responsible: GuestsModel,
    public start: Date,
    public end: Date,
    public emergencyContact: {},
    public guests: GuestsModel[],
    public id?: string,
    public roomId?: string,
    public hotelId?: string,
    ){}
}
