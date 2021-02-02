import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedPcreateAlbumComponent } from './med-pcreate-album.component';

describe('MedPcreateAlbumComponent', () => {
  let component: MedPcreateAlbumComponent;
  let fixture: ComponentFixture<MedPcreateAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedPcreateAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedPcreateAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
