import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminManagementComponent } from './sub-admin-management.component';

describe('SubAdminManagementComponent', () => {
  let component: SubAdminManagementComponent;
  let fixture: ComponentFixture<SubAdminManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAdminManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAdminManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
