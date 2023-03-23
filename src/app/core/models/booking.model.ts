import { GuestsModel } from "./guest.model";

export class BookingModel {
  constructor(
    public roomId: string,
    public responsible: GuestsModel,
    public start: Date,
    public end: Date,
    public emergencyContact: {},
    public guests: GuestsModel[],
    public id?: string,
    ){}
}
