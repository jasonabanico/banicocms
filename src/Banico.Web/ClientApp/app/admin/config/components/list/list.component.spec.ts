import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfigListComponent } from './list.component';

describe('AdminConfigListComponent', () => {
  let component: AdminConfigListComponent;
  let fixture: ComponentFixture<AdminConfigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConfigListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
