import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedPcreateVideoComponent } from './med-pcreate-video.component';

describe('MedPcreateVideoComponent', () => {
  let component: MedPcreateVideoComponent;
  let fixture: ComponentFixture<MedPcreateVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedPcreateVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedPcreateVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
