import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticContentManagementComponent } from './static-content-management.component';

describe('StaticContentManagementComponent', () => {
  let component: StaticContentManagementComponent;
  let fixture: ComponentFixture<StaticContentManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticContentManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticContentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
