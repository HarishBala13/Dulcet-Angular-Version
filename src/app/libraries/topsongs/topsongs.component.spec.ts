import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopsongsComponent } from './topsongs.component';

describe('TopsongsComponent', () => {
  let component: TopsongsComponent;
  let fixture: ComponentFixture<TopsongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopsongsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopsongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
