import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfigFormComponent } from './form.component';

describe('AdminConfigFormComponent', () => {
  let component: AdminConfigFormComponent;
  let fixture: ComponentFixture<AdminConfigFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConfigFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
