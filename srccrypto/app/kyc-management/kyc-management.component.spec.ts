import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycManagementComponent } from './kyc-management.component';

describe('KycManagementComponent', () => {
  let component: KycManagementComponent;
  let fixture: ComponentFixture<KycManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
