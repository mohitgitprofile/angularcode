import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembRegistrationComponent } from './memb-registration.component';

describe('MembRegistrationComponent', () => {
  let component: MembRegistrationComponent;
  let fixture: ComponentFixture<MembRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
