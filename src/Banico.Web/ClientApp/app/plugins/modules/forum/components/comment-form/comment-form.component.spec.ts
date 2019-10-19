import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCommentFormComponent } from './comment-form.component';

describe('ForumCommentFormComponent', () => {
  let component: ForumCommentFormComponent;
  let fixture: ComponentFixture<ForumCommentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumCommentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
