import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawlFeeComponent } from './withdrawl-fee.component';

describe('WithdrawlFeeComponent', () => {
  let component: WithdrawlFeeComponent;
  let fixture: ComponentFixture<WithdrawlFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawlFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawlFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
