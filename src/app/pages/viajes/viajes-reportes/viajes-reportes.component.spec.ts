import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesReportesComponent } from './viajes-reportes.component';

describe('ViajesReportesComponent', () => {
  let component: ViajesReportesComponent;
  let fixture: ComponentFixture<ViajesReportesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViajesReportesComponent]
    });
    fixture = TestBed.createComponent(ViajesReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
