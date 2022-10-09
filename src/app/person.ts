export interface IPerson {
  id: number;
  aId: number;
  name: string;
}
export class Person implements IPerson {
  constructor(public id: number, public aId: number, public name: string) {}
}
