import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataActivityLogComponent } from './data-activity-log.component';

describe('DataActivityLogComponent', () => {
  let component: DataActivityLogComponent;
  let fixture: ComponentFixture<DataActivityLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataActivityLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataActivityLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
