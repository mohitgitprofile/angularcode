import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawLimitComponent } from './withdraw-limit.component';

describe('WithdrawLimitComponent', () => {
  let component: WithdrawLimitComponent;
  let fixture: ComponentFixture<WithdrawLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
