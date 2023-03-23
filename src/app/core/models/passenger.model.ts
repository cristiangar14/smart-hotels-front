export class PassengersModel {
  constructor(
    public name: string,
    public email: string,
    public phone: string,
    public gender: string,
    public documentType: string,
    public document: number,
    public passengers: [],
    public uid?: string,
    ){}
}

