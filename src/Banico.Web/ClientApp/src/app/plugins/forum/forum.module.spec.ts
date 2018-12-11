import { ForumModule } from './forum.module';

describe('ForumModule', () => {
  let forumModule: ForumModule;

  beforeEach(() => {
    forumModule = new ForumModule();
  });

  it('should create an instance', () => {
    expect(forumModule).toBeTruthy();
  });
});
