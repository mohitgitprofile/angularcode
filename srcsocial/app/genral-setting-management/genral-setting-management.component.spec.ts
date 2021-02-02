import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenralSettingManagementComponent } from './genral-setting-management.component';

describe('GenralSettingManagementComponent', () => {
  let component: GenralSettingManagementComponent;
  let fixture: ComponentFixture<GenralSettingManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenralSettingManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenralSettingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
