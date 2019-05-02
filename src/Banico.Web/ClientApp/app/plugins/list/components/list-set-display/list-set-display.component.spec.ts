import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSetDisplayComponent } from './list-set-display.component';

describe('ListSetDisplayComponent', () => {
  let component: ListSetDisplayComponent;
  let fixture: ComponentFixture<ListSetDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSetDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSetDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
