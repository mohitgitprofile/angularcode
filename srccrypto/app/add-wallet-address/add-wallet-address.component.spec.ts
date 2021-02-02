import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWalletAddressComponent } from './add-wallet-address.component';

describe('AddWalletAddressComponent', () => {
  let component: AddWalletAddressComponent;
  let fixture: ComponentFixture<AddWalletAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWalletAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWalletAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
