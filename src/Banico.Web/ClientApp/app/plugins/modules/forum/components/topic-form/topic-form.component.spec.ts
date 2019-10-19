import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumTopicFormComponent } from './topic-form.component';

describe('ForumTopicFormComponent', () => {
  let component: ForumTopicFormComponent;
  let fixture: ComponentFixture<ForumTopicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumTopicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumTopicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
