import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuemediaDetailComponent } from './venuemedia-detail.component';

describe('VenuemediaDetailComponent', () => {
  let component: VenuemediaDetailComponent;
  let fixture: ComponentFixture<VenuemediaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenuemediaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuemediaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
