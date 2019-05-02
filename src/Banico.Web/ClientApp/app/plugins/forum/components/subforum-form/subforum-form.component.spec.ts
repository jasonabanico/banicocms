import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubforumFormComponent } from './subforum-form.component';

describe('SubforumFormComponent', () => {
  let component: SubforumFormComponent;
  let fixture: ComponentFixture<SubforumFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubforumFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubforumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
