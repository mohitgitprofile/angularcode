import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStaticContentComponent } from './edit-static-content.component';

describe('EditStaticContentComponent', () => {
  let component: EditStaticContentComponent;
  let fixture: ComponentFixture<EditStaticContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStaticContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStaticContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
