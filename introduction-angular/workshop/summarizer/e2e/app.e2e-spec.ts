import { SummarizerPage } from './app.po';

describe('summarizer App', () => {
  let page: SummarizerPage;

  beforeEach(() => {
    page = new SummarizerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
