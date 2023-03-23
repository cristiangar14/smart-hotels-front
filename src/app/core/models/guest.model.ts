export class GuestsModel {
  constructor(
    public name: string,
    public email: string,
    public phone: string,
    public gender: string,
    public documentType: string,
    public document: number,
    public guests: [],
    public uid?: string,
    ){}
}

