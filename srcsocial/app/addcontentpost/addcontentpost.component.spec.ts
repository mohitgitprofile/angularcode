import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcontentpostComponent } from './addcontentpost.component';

describe('AddcontentpostComponent', () => {
  let component: AddcontentpostComponent;
  let fixture: ComponentFixture<AddcontentpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcontentpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcontentpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
