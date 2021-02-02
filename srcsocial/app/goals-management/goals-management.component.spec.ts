import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsManagementComponent } from './goals-management.component';

describe('GoalsManagementComponent', () => {
  let component: GoalsManagementComponent;
  let fixture: ComponentFixture<GoalsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
