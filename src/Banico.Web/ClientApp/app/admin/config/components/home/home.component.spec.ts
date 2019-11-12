import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminConfigHomeComponent } from "./home.component";

describe("AdminConfigHomeComponent", () => {
  let component: AdminConfigHomeComponent;
  let fixture: ComponentFixture<AdminConfigHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminConfigHomeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConfigHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
