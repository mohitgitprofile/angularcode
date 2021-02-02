import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchReportGenericComponent } from './match-report-generic.component';

describe('MatchReportGenericComponent', () => {
  let component: MatchReportGenericComponent;
  let fixture: ComponentFixture<MatchReportGenericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchReportGenericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchReportGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
