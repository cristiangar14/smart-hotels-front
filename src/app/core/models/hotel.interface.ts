export class IHotel {
  constructor(
    public coverText: string,
    public name: string,
    public numberRooms: number,
    public services: string,
    public location: {},
    public images: string[],
    public active: boolean,
    public commonAreas: {}[],
    public contact:{},
    public id?: string,
    ) {
  }
}
