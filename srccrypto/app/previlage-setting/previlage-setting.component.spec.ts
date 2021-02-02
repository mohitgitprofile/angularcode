import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevilageSettingComponent } from './previlage-setting.component';

describe('PrevilageSettingComponent', () => {
  let component: PrevilageSettingComponent;
  let fixture: ComponentFixture<PrevilageSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevilageSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevilageSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
