import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcontentpostComponent } from './editcontentpost.component';

describe('EditcontentpostComponent', () => {
  let component: EditcontentpostComponent;
  let fixture: ComponentFixture<EditcontentpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcontentpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcontentpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
