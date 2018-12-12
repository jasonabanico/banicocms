import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDisplayComponent } from './topic-display.component';

describe('TopicDisplayComponent', () => {
  let component: TopicDisplayComponent;
  let fixture: ComponentFixture<TopicDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
