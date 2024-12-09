import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesIndexComponent } from './viajes-index.component';

describe('ViajesIndexComponent', () => {
  let component: ViajesIndexComponent;
  let fixture: ComponentFixture<ViajesIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViajesIndexComponent]
    });
    fixture = TestBed.createComponent(ViajesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
