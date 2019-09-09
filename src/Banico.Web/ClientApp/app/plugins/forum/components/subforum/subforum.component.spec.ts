import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumSubforumComponent } from './subforum.component';

describe('ForumSubforumComponent', () => {
  let component: ForumSubforumComponent;
  let fixture: ComponentFixture<ForumSubforumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumSubforumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumSubforumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
