import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCommentComponent } from './comment.component';

describe('ForumCommentComponent', () => {
  let component: ForumCommentComponent;
  let fixture: ComponentFixture<ForumCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
