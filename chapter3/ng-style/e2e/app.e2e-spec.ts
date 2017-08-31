import { StockMarketPage } from './app.po';

describe('stock-market App', () => {
  let page: StockMarketPage;

  beforeEach(() => {
    page = new StockMarketPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
