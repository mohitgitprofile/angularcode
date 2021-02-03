import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageFeatureComponent } from './storage-feature.component';

describe('StorageFeatureComponent', () => {
  let component: StorageFeatureComponent;
  let fixture: ComponentFixture<StorageFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
