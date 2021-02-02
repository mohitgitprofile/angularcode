import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementExchangeComponent } from './user-management-exchange.component';

describe('UserManagementExchangeComponent', () => {
  let component: UserManagementExchangeComponent;
  let fixture: ComponentFixture<UserManagementExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
