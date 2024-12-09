import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradoresCrearComponent } from './colaboradores-crear.component';

describe('ColaboradoresCrearComponent', () => {
  let component: ColaboradoresCrearComponent;
  let fixture: ComponentFixture<ColaboradoresCrearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColaboradoresCrearComponent]
    });
    fixture = TestBed.createComponent(ColaboradoresCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
