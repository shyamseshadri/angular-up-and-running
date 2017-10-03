import { EcommercePage } from './app.po';

describe('ecommerce App', () => {
  let page: EcommercePage;

  beforeEach(() => {
    page = new EcommercePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
