import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserManagementComponent } from './new-user-management.component';

describe('NewUserManagementComponent', () => {
  let component: NewUserManagementComponent;
  let fixture: ComponentFixture<NewUserManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

