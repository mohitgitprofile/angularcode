import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataClubsComponent } from './data-clubs.component';

describe('DataClubsComponent', () => {
  let component: DataClubsComponent;
  let fixture: ComponentFixture<DataClubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataClubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
