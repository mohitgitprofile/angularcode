import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeManagementComponent } from './exchange-management.component';

describe('ExchangeManagementComponent', () => {
  let component: ExchangeManagementComponent;
  let fixture: ComponentFixture<ExchangeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
