import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyLimitComponent } from './daily-limit.component';

describe('DailyLimitComponent', () => {
  let component: DailyLimitComponent;
  let fixture: ComponentFixture<DailyLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
