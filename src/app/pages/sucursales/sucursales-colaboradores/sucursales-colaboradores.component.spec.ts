import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalesColaboradoresComponent } from './sucursales-colaboradores.component';

describe('SucursalesColaboradoresComponent', () => {
  let component: SucursalesColaboradoresComponent;
  let fixture: ComponentFixture<SucursalesColaboradoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SucursalesColaboradoresComponent]
    });
    fixture = TestBed.createComponent(SucursalesColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
