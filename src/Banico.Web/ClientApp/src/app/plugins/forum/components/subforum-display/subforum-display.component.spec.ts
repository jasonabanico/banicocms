import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubforumDisplayComponent } from './subforum-display.component';

describe('SubforumDisplayComponent', () => {
  let component: SubforumDisplayComponent;
  let fixture: ComponentFixture<SubforumDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubforumDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubforumDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
