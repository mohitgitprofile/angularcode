import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreItemListComponent } from './store-item-list.component';

describe('StoreItemListComponent', () => {
  let component: StoreItemListComponent;
  let fixture: ComponentFixture<StoreItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
