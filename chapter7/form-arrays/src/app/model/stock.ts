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

  addNotablePerson(p: Person) {
    this.notablePeople.push(p);
  }

  removeNotablePerson(index: number) {
    this.notablePeople.splice(index, 1);
  }
}

export class Person {
  name: string;
  title: string;
}