import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifasIndexComponent } from './tarifas-index.component';

describe('TarifasIndexComponent', () => {
  let component: TarifasIndexComponent;
  let fixture: ComponentFixture<TarifasIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarifasIndexComponent]
    });
    fixture = TestBed.createComponent(TarifasIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
