import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksListComponent } from './list.component';

describe('LinksListComponent', () => {
  let component: LinksListComponent;
  let fixture: ComponentFixture<LinksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
