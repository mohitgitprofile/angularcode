import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankManagementComponent } from './bank-management.component';

describe('BankManagementComponent', () => {
  let component: BankManagementComponent;
  let fixture: ComponentFixture<BankManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
