export class IRoom {
  constructor(
    public description: string,
    public type: string,
    public capacity: number,
    public available: boolean,
    public basisCost: number,
    public tax: number,
    public code: string,
    public location: string,
    public hotelId: string,
    public id?: string,
    ) {
  }
}


