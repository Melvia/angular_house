export interface IApartment {
  apartmentId: number;
  houseId: number;
  apartmentName: string;
  area: number;
}

export class Apartment implements IApartment {
  constructor(
    public apartmentId: number,
    public houseId: number,
    public apartmentName: string,
    public area: number
  ) {}
}
