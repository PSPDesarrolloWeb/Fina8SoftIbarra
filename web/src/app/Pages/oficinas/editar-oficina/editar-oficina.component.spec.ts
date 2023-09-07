import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarOficinaComponent } from './editar-oficina.component';

describe('EditarOficinaComponent', () => {
  let component: EditarOficinaComponent;
  let fixture: ComponentFixture<EditarOficinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarOficinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarOficinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
