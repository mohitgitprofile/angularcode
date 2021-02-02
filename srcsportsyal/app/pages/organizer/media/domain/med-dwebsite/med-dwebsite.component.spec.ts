import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedDwebsiteComponent } from './med-dwebsite.component';

describe('MedDwebsiteComponent', () => {
  let component: MedDwebsiteComponent;
  let fixture: ComponentFixture<MedDwebsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedDwebsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedDwebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
