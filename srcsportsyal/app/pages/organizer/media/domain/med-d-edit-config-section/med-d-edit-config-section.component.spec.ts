import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedDEditConfigSectionComponent } from './med-d-edit-config-section.component';

describe('MedDEditConfigSectionComponent', () => {
  let component: MedDEditConfigSectionComponent;
  let fixture: ComponentFixture<MedDEditConfigSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedDEditConfigSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedDEditConfigSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
