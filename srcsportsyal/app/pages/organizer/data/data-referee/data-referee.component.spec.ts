import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRefereeComponent } from './data-referee.component';

describe('DataRefereeComponent', () => {
  let component: DataRefereeComponent;
  let fixture: ComponentFixture<DataRefereeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataRefereeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRefereeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
