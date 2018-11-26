import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSetFormComponent } from './list-set-form.component';

describe('ListSetFormComponent', () => {
  let component: ListSetFormComponent;
  let fixture: ComponentFixture<ListSetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
