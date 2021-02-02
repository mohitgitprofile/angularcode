import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserManagementExchangeComponent } from './view-user-management-exchange.component';

describe('ViewUserManagementExchangeComponent', () => {
  let component: ViewUserManagementExchangeComponent;
  let fixture: ComponentFixture<ViewUserManagementExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserManagementExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserManagementExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
