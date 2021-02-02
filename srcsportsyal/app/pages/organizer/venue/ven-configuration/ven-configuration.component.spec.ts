import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenConfigurationComponent } from './ven-configuration.component';

describe('VenConfigurationComponent', () => {
  let component: VenConfigurationComponent;
  let fixture: ComponentFixture<VenConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
