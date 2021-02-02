import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedDConfigSectionComponent } from './med-d-config-section.component';

describe('MedDConfigSectionComponent', () => {
  let component: MedDConfigSectionComponent;
  let fixture: ComponentFixture<MedDConfigSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedDConfigSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedDConfigSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
