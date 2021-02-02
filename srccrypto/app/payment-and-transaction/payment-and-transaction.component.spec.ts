import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAndTransactionComponent } from './payment-and-transaction.component';

describe('PaymentAndTransactionComponent', () => {
  let component: PaymentAndTransactionComponent;
  let fixture: ComponentFixture<PaymentAndTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentAndTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAndTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
