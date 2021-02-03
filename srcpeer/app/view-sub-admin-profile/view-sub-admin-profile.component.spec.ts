import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubAdminProfileComponent } from './view-sub-admin-profile.component';

describe('ViewSubAdminProfileComponent', () => {
  let component: ViewSubAdminProfileComponent;
  let fixture: ComponentFixture<ViewSubAdminProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSubAdminProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubAdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
