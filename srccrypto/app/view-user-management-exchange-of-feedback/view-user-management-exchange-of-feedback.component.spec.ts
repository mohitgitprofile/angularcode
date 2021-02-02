import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserManagementExchangeOfFeedbackComponent } from './view-user-management-exchange-of-feedback.component';

describe('ViewUserManagementExchangeOfFeedbackComponent', () => {
  let component: ViewUserManagementExchangeOfFeedbackComponent;
  let fixture: ComponentFixture<ViewUserManagementExchangeOfFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserManagementExchangeOfFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserManagementExchangeOfFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
