export interface IHouse {
  houseId: number;
  houseName: string;
}
export class House implements IHouse {
  constructor(public houseId: number, public houseName: string) {}
}
