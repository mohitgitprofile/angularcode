import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedDcustomComponent } from './med-dcustom.component';

describe('MedDcustomComponent', () => {
  let component: MedDcustomComponent;
  let fixture: ComponentFixture<MedDcustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedDcustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedDcustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
