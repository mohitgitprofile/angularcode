import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccessiblityComponent } from './add-accessiblity.component';

describe('AddAccessiblityComponent', () => {
  let component: AddAccessiblityComponent;
  let fixture: ComponentFixture<AddAccessiblityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccessiblityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccessiblityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
