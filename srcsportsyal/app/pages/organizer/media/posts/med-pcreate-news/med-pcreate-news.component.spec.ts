import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedPcreateNewsComponent } from './med-pcreate-news.component';

describe('MedPcreateNewsComponent', () => {
  let component: MedPcreateNewsComponent;
  let fixture: ComponentFixture<MedPcreateNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedPcreateNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedPcreateNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
