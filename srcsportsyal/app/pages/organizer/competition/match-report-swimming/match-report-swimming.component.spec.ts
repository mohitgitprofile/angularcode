import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchReportSwimmingComponent } from './match-report-swimming.component';

describe('MatchReportSwimmingComponent', () => {
  let component: MatchReportSwimmingComponent;
  let fixture: ComponentFixture<MatchReportSwimmingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchReportSwimmingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchReportSwimmingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
