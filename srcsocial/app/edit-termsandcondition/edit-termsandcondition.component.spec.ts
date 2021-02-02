import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTermsandconditionComponent } from './edit-termsandcondition.component';

describe('EditTermsandconditionComponent', () => {
  let component: EditTermsandconditionComponent;
  let fixture: ComponentFixture<EditTermsandconditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTermsandconditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTermsandconditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
