import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminprofileComponent } from './edit-adminprofile.component';

describe('EditAdminprofileComponent', () => {
  let component: EditAdminprofileComponent;
  let fixture: ComponentFixture<EditAdminprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdminprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
