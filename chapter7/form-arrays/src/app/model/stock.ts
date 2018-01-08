export class Stock {
  favorite = false;
  notablePeople: Person[];

  constructor(public name: string,
              public code: string,
              public price: number,
              public previousPrice: number) {
    this.notablePeople = [];
  }

  isPositiveChange(): boolean {
    return this.price >= this.previousPrice;
  }
}

export class Person {
  name: string;
  title: string;
}