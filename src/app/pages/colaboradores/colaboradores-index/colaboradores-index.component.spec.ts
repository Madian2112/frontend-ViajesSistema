import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradoresIndexComponent } from './colaboradores-index.component';

describe('ColaboradoresIndexComponent', () => {
  let component: ColaboradoresIndexComponent;
  let fixture: ComponentFixture<ColaboradoresIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColaboradoresIndexComponent]
    });
    fixture = TestBed.createComponent(ColaboradoresIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
