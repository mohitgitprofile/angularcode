import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotcoldwalletManagementComponent } from './hotcoldwallet-management.component';

describe('HotcoldwalletManagementComponent', () => {
  let component: HotcoldwalletManagementComponent;
  let fixture: ComponentFixture<HotcoldwalletManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotcoldwalletManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotcoldwalletManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
