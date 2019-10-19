import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumSubforumFormComponent } from './subforum-form.component';

describe('ForumSubforumFormComponent', () => {
  let component: ForumSubforumFormComponent;
  let fixture: ComponentFixture<ForumSubforumFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumSubforumFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumSubforumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
