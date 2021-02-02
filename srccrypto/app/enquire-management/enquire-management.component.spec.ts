import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquireManagementComponent } from './enquire-management.component';

describe('EnquireManagementComponent', () => {
  let component: EnquireManagementComponent;
  let fixture: ComponentFixture<EnquireManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquireManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquireManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
