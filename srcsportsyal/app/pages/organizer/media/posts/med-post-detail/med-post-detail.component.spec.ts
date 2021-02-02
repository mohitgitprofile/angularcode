import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedPostDetailComponent } from './med-post-detail.component';

describe('MedPostDetailComponent', () => {
  let component: MedPostDetailComponent;
  let fixture: ComponentFixture<MedPostDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedPostDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedPostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
