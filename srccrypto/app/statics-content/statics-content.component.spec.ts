import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticsContentComponent } from './statics-content.component';

describe('StaticsContentComponent', () => {
  let component: StaticsContentComponent;
  let fixture: ComponentFixture<StaticsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
