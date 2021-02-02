import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiatManagementComponent } from './fiat-management.component';

describe('FiatManagementComponent', () => {
  let component: FiatManagementComponent;
  let fixture: ComponentFixture<FiatManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiatManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiatManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
