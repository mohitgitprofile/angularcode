import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedDconfigureComponent } from './med-dconfigure.component';

describe('MedDconfigureComponent', () => {
  let component: MedDconfigureComponent;
  let fixture: ComponentFixture<MedDconfigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedDconfigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedDconfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
