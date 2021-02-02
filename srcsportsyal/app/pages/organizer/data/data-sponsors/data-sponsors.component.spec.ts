import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSponsorsComponent } from './data-sponsors.component';

describe('DataSponsorsComponent', () => {
  let component: DataSponsorsComponent;
  let fixture: ComponentFixture<DataSponsorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSponsorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
