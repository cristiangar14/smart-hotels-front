import { PassengersModel } from "./passenger.model";

export class BookingModel {
  constructor(
    public roomId: string,
    public responsible: PassengersModel,
    public start: Date,
    public end: Date,
    public emergencyContact: {},
    public passengers: PassengersModel[],
    public id?: string,
    ){}
}
