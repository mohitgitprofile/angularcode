import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoragefeaturesComponent } from './add-storagefeatures.component';

describe('AddStoragefeaturesComponent', () => {
  let component: AddStoragefeaturesComponent;
  let fixture: ComponentFixture<AddStoragefeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStoragefeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStoragefeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
