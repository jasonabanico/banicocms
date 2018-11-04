import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFrontComponent } from './list-front.component';

describe('ListFrontComponent', () => {
  let component: ListFrontComponent;
  let fixture: ComponentFixture<ListFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
