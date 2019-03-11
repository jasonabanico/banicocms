import { LinksModule } from './links.module';

describe('LinksModule', () => {
  let linksModule: LinksModule;

  beforeEach(() => {
    linksModule = new LinksModule();
  });

  it('should create an instance', () => {
    expect(linksModule).toBeTruthy();
  });
});
