import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewprivacyComponent } from './newprivacy.component';

describe('NewprivacyComponent', () => {
  let component: NewprivacyComponent;
  let fixture: ComponentFixture<NewprivacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewprivacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewprivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
