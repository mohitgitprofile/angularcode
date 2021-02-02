import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawlLimitComponent } from './withdrawl-limit.component';

describe('WithdrawlLimitComponent', () => {
  let component: WithdrawlLimitComponent;
  let fixture: ComponentFixture<WithdrawlLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawlLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawlLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
