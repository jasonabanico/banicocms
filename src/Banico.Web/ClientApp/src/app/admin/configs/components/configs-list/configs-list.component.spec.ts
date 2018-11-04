import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigsListComponent } from './configs-list.component';

describe('ConfigsListComponent', () => {
  let component: ConfigsListComponent;
  let fixture: ComponentFixture<ConfigsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
