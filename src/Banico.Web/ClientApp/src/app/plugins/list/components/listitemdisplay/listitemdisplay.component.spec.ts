import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemDisplayComponent } from './listitemdisplay.component';

describe('ListItemDisplayComponent', () => {
  let component: ListItemDisplayComponent;
  let fixture: ComponentFixture<ListItemDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
