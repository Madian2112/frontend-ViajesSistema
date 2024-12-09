import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalesCrearComponent } from './sucursales-crear.component';

describe('SucursalesCrearComponent', () => {
  let component: SucursalesCrearComponent;
  let fixture: ComponentFixture<SucursalesCrearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SucursalesCrearComponent]
    });
    fixture = TestBed.createComponent(SucursalesCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
