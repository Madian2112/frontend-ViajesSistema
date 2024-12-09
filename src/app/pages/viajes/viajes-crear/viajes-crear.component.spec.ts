import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesCrearComponent } from './viajes-crear.component';

describe('ViajesCrearComponent', () => {
  let component: ViajesCrearComponent;
  let fixture: ComponentFixture<ViajesCrearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViajesCrearComponent]
    });
    fixture = TestBed.createComponent(ViajesCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
