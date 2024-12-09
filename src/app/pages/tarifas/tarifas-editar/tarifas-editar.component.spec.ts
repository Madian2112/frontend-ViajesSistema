import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifasEditarComponent } from './tarifas-editar.component';

describe('TarifasEditarComponent', () => {
  let component: TarifasEditarComponent;
  let fixture: ComponentFixture<TarifasEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarifasEditarComponent]
    });
    fixture = TestBed.createComponent(TarifasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
