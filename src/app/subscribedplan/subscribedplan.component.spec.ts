import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedplanComponent } from './subscribedplan.component';

describe('SubscribedplanComponent', () => {
  let component: SubscribedplanComponent;
  let fixture: ComponentFixture<SubscribedplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribedplanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribedplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
