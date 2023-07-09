import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedsongsComponent } from './mixedsongs.component';

describe('MixedsongsComponent', () => {
  let component: MixedsongsComponent;
  let fixture: ComponentFixture<MixedsongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixedsongsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixedsongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
