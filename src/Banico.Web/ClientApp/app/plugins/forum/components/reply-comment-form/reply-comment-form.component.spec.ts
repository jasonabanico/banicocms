import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyCommentFormComponent } from './reply-comment-form.component';

describe('ReplyCommentComponent', () => {
  let component: ReplyCommentFormComponent;
  let fixture: ComponentFixture<ReplyCommentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyCommentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
