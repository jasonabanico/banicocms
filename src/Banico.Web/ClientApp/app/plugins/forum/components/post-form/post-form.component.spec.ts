import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPostFormComponent } from './post-form.component';

describe('ForumPostFormComponent', () => {
  let component: ForumPostFormComponent;
  let fixture: ComponentFixture<ForumPostFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumPostFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumPostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
