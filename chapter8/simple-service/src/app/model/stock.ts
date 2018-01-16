export class Stock {
  favorite = false;

  constructor(public name: string,
              public code: string,
              public price: number,
              public previousPrice: number,
              public exchange: string) {}

  isPositiveChange(): boolean {
    return this.price >= this.previousPrice;
  }
}
