import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtermsComponent } from './newterms.component';

describe('NewtermsComponent', () => {
  let component: NewtermsComponent;
  let fixture: ComponentFixture<NewtermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewtermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewtermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
